import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  movieId: number;

  @Prop({ required: true })
  reservationSlot: Date;

  @Prop({ required: true })
  endSlot: Date;

  // Nouveau champ pour le titre du film
  @Prop({ required: true })
  movieTitle: string;  // On ajoute le champ pour le titre du film
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
