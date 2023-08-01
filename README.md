## Vue Query: Effortless Data Fetching and Mutations

Introducing Vue Query, a powerful set of hooks inspired by React Query, simplifying data fetching and mutations in Vue.js projects. Quickly get started by cloning the repository and running the development server. Use the `useQuery` hook to effortlessly fetch data and the `useMutation` hook to perform data mutations with ease.

### Fetch Data with `useQuery`

```typescript
const fetchData = () => {
  return axios.get("http://localhost:3000/authors");
};

const { data, error, loading } = useQuery<{
  id: string | number;
  author: string;
}>("author", fetchData);
```

### Mutate Data with `useMutation`

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

**Important:** Use `v-if` in your template to prevent unexpected errors from the fetch.

Now, with Vue Query, you can easily handle data fetching and mutations in your Vue.js applications, making data management a breeze. Empower your projects with the flexibility and efficiency of Vue Query. Happy coding!
