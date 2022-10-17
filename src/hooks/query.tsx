import { Subject, Subscription, BehaviorSubject } from 'rxjs'
import { map, concatMap } from 'rxjs/operators'
import { ref, onMounted, onUnmounted, Ref } from 'vue'
import { AxiosResponse } from 'axios'

interface QueryName {
    name: string;
    renderTimes: number;
}

const arrayOfObservers: BehaviorSubject<QueryName>[] = []

export function useQuery<T>(
    name: string,
    query: () => Promise<AxiosResponse>)
    : { data: Ref<T | undefined>, error: any, loading: Ref<boolean> } {
    const data = ref<T>()
    const error = ref(false)
    const loading = ref(true)

    const source$ = new BehaviorSubject<QueryName>({ name, renderTimes: 0 })

    arrayOfObservers.push(source$)

    const getIndex = arrayOfObservers.length - 1

    const observer$ = arrayOfObservers[getIndex].pipe(concatMap(async () => await query()), map(res => res.data))

    let subscribe: Subscription;

    onMounted(() => {
        subscribe = observer$.subscribe({
            next: (val) => {
                data.value = val;
                loading.value = false
                console.count(val)
            },
            error: (err) => {
                error.value = err;
                loading.value = false;
            }
        })
    })

    onUnmounted(() => {
        subscribe.unsubscribe()
    })

    return { data, error, loading }
}

export function useMutation<T>(
    mutation: (val: any) => Promise<AxiosResponse>,
    feature?: { onSuccess?: () => string[] })
    : [(val: any) => void, { data: Ref<T | undefined>, error: any, loading: Ref<boolean> }] {
    const data = ref<T>()
    const error = ref(false)
    const loading = ref(true)
    const source$ = new Subject<Promise<AxiosResponse>>()

    const mut = source$
        .pipe(concatMap(async (val) => await val), map(res => res.data))


    function Mutate(value: any) {
        source$.next(mutation(value))
    }


    let subscribe: Subscription
    onMounted(() => {
        subscribe = mut.subscribe({
            next: (val) => {
                if (val) {
                    data.value = val;
                    loading.value = false
                    if (feature && feature.onSuccess) {
                        feature.onSuccess().forEach(observerName => {
                            const getIndex = arrayOfObservers.findIndex(obs => obs.value.name === observerName)
                            const observer = arrayOfObservers[getIndex]
                            arrayOfObservers[getIndex].next({ name: observer.value.name, renderTimes: observer.value.renderTimes + 1 })
                        })
                    }
                }
            },
            error: (err) => {
                error.value = err;
                loading.value = false;
            }
        })
    })

    onUnmounted(() => {
        subscribe.unsubscribe()
    })

    return [Mutate, { data, error, loading }]
}
