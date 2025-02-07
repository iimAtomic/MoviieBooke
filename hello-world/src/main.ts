/* eslint-disable */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('📢 Endpoints disponibles :');
  const server = app.getHttpServer();
  const router = server._events.request._router;


  // ✅ Active CORS pour toutes les requêtes
  app.enableCors({
    origin: '*', // Remplace par le port de ton frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Autorise l'envoi de cookies si nécessaire
  });

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Votre API')
    .setDescription("Documentation de l'API")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `🚀 Serveur démarré sur http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
