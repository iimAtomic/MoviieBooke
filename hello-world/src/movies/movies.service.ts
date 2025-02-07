/* eslint-disable */
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MoviesService {
  private readonly apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTQxN2JkYzI2OTFmNDI4M2JlOWUzMzUwMmQ3OTE2MCIsIm5iZiI6MTczODY3ODU1OS41NzMsInN1YiI6IjY3YTIyMTFmYTc0ZDhlZTIzYjI2YmRjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y5XCbvpRTqyxorsP8HbBS6J2uSOBX-ytXp9PSg4VS7M";

  async getMovies({ page = 1, search, sort }) {
    if (!this.apiKey) {
      console.error('Clé API absente');
      throw new Error('Clé API absente');
    }

    let url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&language=en-US&page=${page}`;
    }

    if (sort) {
      const validSortOptions = [
        'popularity.desc',
        'release_date.desc',
        'vote_average.desc',
      ];
      if (validSortOptions.includes(sort)) {
        url += `&sort_by=${sort}`;
      }
    }

    return this.fetchData(url);
  }

  async getMovieById(id: string) {
    if (!this.apiKey) throw new Error('Clé API absente');

    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    return this.fetchData(url);
  }

  async getMovieGenres() {
    if (!this.apiKey) throw new Error('Clé API absente');

    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;
    return this.fetchData(url);
  }

  private async fetchData(url: string) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`Erreur HTTP ! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw new Error('Échec de la récupération des données');
    }
  }
}
