<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useMutation } from '../hooks/query'

const author = ref('')

const fetchData = (author: string) => axios.post('http://localhost:3000/authors', {
    id: new Date().valueOf(),
    author
})

const [addAuthor, { data, error, loading }] = useMutation(fetchData, {
    onSuccess: () => ['authors']
})

</script>
<template>

    <div style="border: 1px solid black">
        Mutation component
        <form @submit.prevent="addAuthor(author)">
            <input type="text" v-model="author" />
            <button type="submit">Submit</button>
        </form>
    </div>
</template>