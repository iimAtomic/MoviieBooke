import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/movies.module';
import { ReservationModule } from './reservation/reservation.module';
import {AuthModule} from "./auth/auth.module";


@Module({
  imports: [
    ConfigModule.forRoot(
        {isGlobal: true}
    ),
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
    UserModule,
    MoviesModule,
    ReservationModule,
  ],
})
export class AppModule {}
