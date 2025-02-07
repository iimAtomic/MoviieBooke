/* eslint-disable */
import { BadRequestException, Controller, Get, Query, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    @ApiOperation({ summary: 'Récupérer la liste des films' })
    @ApiResponse({ status: 200, description: 'Films récupérés avec succès' })
    @ApiResponse({ status: 400, description: 'Échec de la récupération des films' })
    async getMovies(
        @Query('page') page: number = 1,
        @Query('search') search?: string,
        @Query('sort : \n\npopularity.desc\n' + 'release_date.desc\n' + 'vote_average.desc') sort?: string,
    ) {
        try {
            const movies = await this.moviesService.getMovies({ page, search, sort });
            return { message: 'Films récupérés avec succès', movies };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Rechercher un film par ID' })
    @ApiResponse({ status: 200, description: 'Film récupéré avec succès' })
    @ApiResponse({ status: 400, description: 'Échec de la récupération du film' })
    async getMovieById(@Param('id') id: string) {
        try {
            const movie = await this.moviesService.getMovieById(id);
            return { message: 'Succès !', movie };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('/genres')
    @ApiOperation({ summary: 'Récupérer les genres de films' })
    @ApiResponse({ status: 200, description: 'Genres récupérés avec succès' })
    @ApiResponse({ status: 400, description: 'Échec de la récupération des genres' })
    async getMovieGenres() {
        try {
            const genres = await this.moviesService.getMovieGenres();
            return { message: 'Réussite !', genres };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
