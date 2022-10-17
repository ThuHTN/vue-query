<script setup lang="ts">
import axios from 'axios'
import { useQuery } from '../hooks/query'

const fetchData = () => {
    return axios.get('http://localhost:3000/authors')
}

const { data, error, loading } = useQuery<any>('authors', fetchData)

</script>
<template>
    <div style="border: 1px solid black">
        Query Component
        <div v-if="data">
            <ul>
                <li v-for="value of data">{{value.author}}</li>
            </ul>
        </div>
        <div v-else-if="loading">
            ...loading
        </div>
        <div v-else-if="error">
            {{error}}
        </div>
    </div>
</template>