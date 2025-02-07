/* eslint-disable */

import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../src/movies/movies.controller';
import { MoviesService } from '../src/movies/movies.service';
import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('MoviesController - Integration Tests', () => {
    let app: INestApplication;
    let service: MoviesService; // Déclarez la variable pour le service

    beforeAll(async () => {
        // Créez un module de test
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MoviesController],
            providers: [MoviesService],
        }).compile();

        // Instanciez l'application NestJS
        app = module.createNestApplication();
        await app.init();

        // Récupérez explicitement l'instance du service
        service = module.get<MoviesService>(MoviesService);
    });

    afterAll(async () => {
        // Fermez l'application après les tests
        await app.close();
    });

    describe('GET /movies', () => {
        it('should return a list of movies successfully', async () => {
            const mockMovies = {
                results: [{ id: 1, title: 'Movie 1' }],
            };

            // Simuler l'appel au service
            jest.spyOn(service, 'getMovies').mockResolvedValue(mockMovies);

            // Test d'intégration réel avec Supertest
            const response = await request(app.getHttpServer())
                .get('/movies?page=1&search=action&sort=popularity.desc')
                .expect(200);

            expect(response.body.message).toBe('Films récupérés avec succès');
            expect(response.body.movies).toEqual(mockMovies);
        });

        it('should throw BadRequestException if getMovies fails', async () => {
            // Simuler l'échec du service
            jest.spyOn(service, 'getMovies').mockRejectedValue(new Error('API error'));

            const response = await request(app.getHttpServer())
                .get('/movies?page=1&search=action&sort=popularity.desc')
                .expect(400);

            expect(response.body.message).toBe('Échec de la récupération des films');
        });
    });

    describe('GET /movies/:id', () => {
        it('should return a movie by ID', async () => {
            const mockMovie = { id: 1, title: 'Movie 1' };

            // Simuler l'appel au service
            jest.spyOn(service, 'getMovieById').mockResolvedValue(mockMovie);

            const response = await request(app.getHttpServer())
                .get('/movies/1')
                .expect(200);

            expect(response.body.message).toBe('Succès !');
            expect(response.body.movie).toEqual(mockMovie);
        });

        it('should throw BadRequestException if getMovieById fails', async () => {
            // Simuler une erreur dans le service
            jest.spyOn(service, 'getMovieById').mockRejectedValue(new Error('API error'));

            const response = await request(app.getHttpServer())
                .get('/movies/1')
                .expect(400);

            expect(response.body.message).toBe('Échec de la récupération du film');
        });
    });
});
