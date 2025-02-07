import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
    @ApiProperty({ example: 634649, description: "ID du film à réserver" })
    @IsInt({ message: "L'ID du film doit être un nombre" })
    movieId: number;

    @ApiProperty({ example: "2025-02-05T16:00:00Z", description: "Date et heure de la réservation (ISO 8601)" })
    @IsNotEmpty({ message: "La date de réservation est requise" })
    @IsDateString({}, { message: "Format de date invalide (ISO 8601 requis)" })
    reservationSlot: string;
}
