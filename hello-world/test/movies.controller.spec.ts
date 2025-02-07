/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../src/movies/movies.controller';
import { MoviesService } from '../src/movies/movies.service';
import { BadRequestException } from '@nestjs/common';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            getMovies: jest.fn(),
            getMovieById: jest.fn(),
            getMovieGenres: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return movies successfully', async () => {
      const mockMovies = {
        results: [{ id: 1, title: 'Movie 1' }],
      };

      // Simuler la réponse du service
      jest.spyOn(service, 'getMovies').mockResolvedValue(mockMovies);

      // Appeler la méthode avec des paramètres individuels
      const result = await controller.getMovies(1, 'action', 'popularity.desc');

      expect(result.message).toBe('Films récupérés avec succès');
      expect(result.movies).toEqual(mockMovies);
    });

    it('should throw BadRequestException if getMovies fails', async () => {
      // Simuler une erreur dans le service
      jest.spyOn(service, 'getMovies').mockRejectedValue(new Error('API error'));

      // Vérifier que l'exception est levée
      await expect(
          controller.getMovies(1, 'action', 'popularity.desc'),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('getMovieById', () => {
    it('should return a movie successfully by ID', async () => {
      const mockMovie = { id: 1, title: 'Movie 1' };

      // Simuler la réponse du service pour un film spécifique
      jest.spyOn(service, 'getMovieById').mockResolvedValue(mockMovie);

      // Appeler la méthode avec l'ID du film
      const result = await controller.getMovieById('1');

      expect(result.message).toBe('Succès !');
      expect(result.movie).toEqual(mockMovie);
    });

    it('should throw BadRequestException if getMovieById fails', async () => {
      // Simuler une erreur dans le service
      jest.spyOn(service, 'getMovieById').mockRejectedValue(new Error('API error'));

      // Vérifier que l'exception est levée
      await expect(controller.getMovieById('1')).rejects.toThrowError(
          BadRequestException,
      );
    });
  });



});
