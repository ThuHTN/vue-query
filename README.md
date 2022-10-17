## Vue Query

vue query hooks like **react-query**

`git clone https://github.com/kritokazuma/vue-query`

`npm run dev` run dev server

`npm run server` run json-server

```typescript
const fetchData = () => {
  return axios.get("http://localhost:3000/authors");
};
const { data, error, loading } = useQuery<{
  id: string | number;
  author: string;
}>("author", fetchData);
```

In **useQuery** hook, first param is a **key**. This key is used to refetch query by using **useMutation** hook.

```typescript
const fetchData = (author: string) =>
  axios.post("http://localhost:3000/authors", {
    id: new Date().valueOf(),
    author,
  });

const [addAuthor, { data, error, loading }] = useMutation(fetchData, {
  onSuccess: () => ["authors"],
});
```

U can see **authors** in **onSuccess** array to refetch **authors** query on mutation.

```html
<form @submit="addAuthor(author)">
  <input type="text" v-model="author" />
  <button type="submit">Submit</button>
</form>
```
**addAuthor** is used to mutate data by simply adding params like on **fetchData** function
