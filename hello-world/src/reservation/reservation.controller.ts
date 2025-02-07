/* eslint-disable */
import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReservationsService } from './reservation.service';
import { ReservationDto } from './dtos/reservation.dto';

@ApiTags('Reservations')
@ApiBearerAuth()
@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Créer une réservation de film' })
    @ApiResponse({ status: 201, description: 'Réservation confirmée' })
    @ApiResponse({ status: 400, description: 'Conflit de créneau ou film introuvable' })
    async createReservation(@Request() req, @Body() reservationDto: ReservationDto) {
        const userId = req.user.userId; // Accès uniforme à userId
        return this.reservationsService.createReservation(userId, reservationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Récupérer les réservations de l’utilisateur connecté' })
    @ApiResponse({ status: 200, description: 'Liste des réservations' })
    async getUserReservations(@Request() req) {
        const userId = req.user.userId; // Accès uniforme à userId
        return this.reservationsService.getUserReservations(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Annuler une réservation' })
    @ApiResponse({ status: 200, description: 'Réservation annulée avec succès' })
    @ApiResponse({ status: 404, description: 'Réservation introuvable' })
    async cancelReservation(@Request() req, @Param('id') reservationId: string) {
        const userId = req.user.userId; // Assurez-vous d'utiliser la même clé partout
        return this.reservationsService.cancelReservation(userId, reservationId);
    }
}
