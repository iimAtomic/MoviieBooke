import { Module } from '@nestjs/common';
import { ReservationsService } from './reservation.service';
import { ReservationsController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationDto } from './dtos/reservation.dto';
import { ReservationSchema } from './schemas/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReservationDto.name, schema: ReservationSchema },
    ]),
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController],
  exports: [ReservationsService, MongooseModule],
})
export class ReservationModule {}
