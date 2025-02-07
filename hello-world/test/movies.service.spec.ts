/* eslint-disable */


import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../src/movies/movies.service';
import fetch from 'node-fetch';

jest.mock('node-fetch');

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve movies successfully with search and sort', async () => {
    // Arrange: Mock fetch to return a resolved promise with mock data
    const mockData = { results: [{ id: 1, title: 'Movie 1' }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    // Act: Call the method with the correct structure
    const result = await service.getMovies({
      page: 1,
      search: 'action', // Recherche pour le terme 'action'
      sort: 'popularity.desc', // Tri par popularité décroissante
    });

    // Assert: Verify the result
    expect(result).toEqual(mockData);
  });

  it('should throw error if API fetch fails', async () => {
    // Arrange: Mock fetch to throw an error
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    // Act & Assert: Expect the method to throw an error
    await expect(
        service.getMovies({ page: 1, search: 'action', sort: 'popularity.desc' })
    ).rejects.toThrow('Échec de la récupération des données');
  });

  it('should retrieve movie by ID', async () => {
    const mockData = { id: 1, title: 'Movie 1' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await service.getMovieById('1');
    expect(result).toEqual(mockData);
  });
});
