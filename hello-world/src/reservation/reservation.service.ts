/* eslint-disable */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDto } from './dtos/reservation.dto';
import fetch from 'node-fetch';
import { ReservationDocument } from './schemas/reservation.schema';

@Injectable()
export class ReservationsService {
    constructor(@InjectModel(ReservationDto.name) private reservationModel: Model<ReservationDocument>) {}

    async createReservation(userId: string, reservationDto: ReservationDto) {
        const { movieId, reservationSlot } = reservationDto;
        const startTime = new Date(reservationSlot);
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // Ajoute 2 heures

        const movie = await this.getMovieDetails(movieId);
        if (!movie) throw new BadRequestException("Le film n'existe pas");

        const conflict = await this.reservationModel.exists({
            userId,
            $or: [
                { reservationSlot: { $lt: endTime }, endSlot: { $gt: startTime } },
            ]
        });

        if (conflict) {
            throw new BadRequestException("Conflit de créneau, vous avez déjà une réservation pendant cette période.");
        }

        const reservation = new this.reservationModel({
            userId,
            movieId,
            movieTitle: movie.title, // Ajout du titre du film
            reservationSlot: startTime,
            endSlot: endTime
        });

        await reservation.save();

        return {
            message: "Réservation confirmée",
            reservationId: reservation._id,
            movieTitle: movie.title,
            reservationSlot: startTime,
            endSlot: endTime
        };
    }

    private async getMovieDetails(movieId: number): Promise<{ title: string } | null> {
        const apiKey = process.env.TMDB_API_KEY; // Utiliser une variable d'environnement pour la clé API
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Error fetching movie details: ${response.statusText}`);
                return null;
            }

            const data = await response.json();
            return { title: data.title };
        } catch (error) {
            console.error(`Error in getMovieDetails: ${error.message}`);
            return null;
        }
    }

    async getUserReservations(userId: string) {
        return this.reservationModel.find({ userId }).exec();
    }

    async cancelReservation(userId: string, reservationId: string) {
        const reservation = await this.reservationModel.findOneAndDelete({ _id: reservationId, userId }).exec();
        if (!reservation) {
            throw new NotFoundException("Réservation introuvable ou déjà annulée");
        }
        return { message: "Réservation annulée avec succès" };
    }
}
