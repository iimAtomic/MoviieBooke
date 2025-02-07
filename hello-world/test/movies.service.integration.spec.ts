/* eslint-disable */

import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../src/movies/movies.service';
import fetch from 'node-fetch';

// Mocker la fonction fetch
jest.mock('node-fetch');
const { Response } = jest.requireActual('node-fetch'); // Pour éviter une erreur de mock

describe('MoviesService', () => {
    let service: MoviesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesService],
        }).compile();

        service = module.get<MoviesService>(MoviesService);
    });

    describe('getMovies', () => {
        it('should return a list of movies successfully', async () => {
            const mockMovies = { results: [{ id: 1, title: 'Movie 1' }] };

            // Mocker la réponse de fetch
            (fetch as jest.Mock).mockResolvedValueOnce(
                new Response(JSON.stringify(mockMovies), {
                    status: 200,
                }),
            );

            const result = await service.getMovies({ page: 1, search: 'action', sort: 'popularity.desc' });

            expect(result).toEqual(mockMovies);
            expect(fetch).toHaveBeenCalledWith(
                'https://api.themoviedb.org/3/search/movie?query=action&language=en-US&page=1',
                expect.any(Object),
            );
        });

        it('should throw an error if fetch fails', async () => {
            // Simuler une erreur de fetch
            (fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

            await expect(service.getMovies({ page: 1, search: 'action', sort: 'popularity.desc' }))
                .rejects
                .toThrowError('Échec de la récupération des données');
        });
    });

    describe('getMovieById', () => {
        it('should return a movie successfully by ID', async () => {
            const mockMovie = { id: 1, title: 'Movie 1' };

            // Mocker la réponse de fetch
            (fetch as jest.Mock).mockResolvedValueOnce(
                new Response(JSON.stringify(mockMovie), {
                    status: 200,
                }),
            );

            const result = await service.getMovieById('1');

            expect(result).toEqual(mockMovie);
            expect(fetch).toHaveBeenCalledWith(
                'https://api.themoviedb.org/3/movie/1?language=en-US',
                expect.any(Object),
            );
        });

        it('should throw an error if fetch fails', async () => {
            (fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

            await expect(service.getMovieById('1')).rejects.toThrowError('Échec de la récupération des données');
        });
    });



});
