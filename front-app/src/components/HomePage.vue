<!-- src/components/HomePage.vue -->
/* eslint-disable */
<template>
  <div>
    <h1>Liste des Films</h1>
    <input v-model="searchQuery" @input="fetchMovies" placeholder="Rechercher un film" />
    <select v-model="pageSize" @change="fetchMovies">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </select>
    <ul>
      <li v-for="movie in movies" :key="movie.id">{{ movie.title }}</li>
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
            sort: 'popularity.desc'
          }
        });
        this.movies = response.data.movies;
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
