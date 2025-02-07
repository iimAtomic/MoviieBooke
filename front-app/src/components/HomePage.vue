<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4">
    <h1 class="text-3xl font-bold text-gray-700 mb-4">Liste des Films</h1>
    <div class="flex w-full max-w-lg gap-2 mb-4">
      <input
          v-model="searchQuery"
          @input="fetchMovies"
          placeholder="Rechercher un film..."
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
          v-model="pageSize"
          @change="fetchMovies"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
    <ul class="w-full max-w-lg bg-white p-4 rounded-lg shadow-md">
      <li v-for="movie in movies" :key="movie.id" class="py-2 border-b last:border-b-0">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      searchQuery: '',
      pageSize: 10
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get('http://localhost:3000/movies', {
          params: {
            search: this.searchQuery,
            page: 1,
            sort: 'popularity.desc',
            pageSize: this.pageSize
          }
        });
        this.movies = response.data.movies.results;
      } catch (err) {
        console.error('Erreur lors de la récupération des films', err);
      }
    }
  },
  mounted() {
    this.fetchMovies();
  }
};
</script>
