
import * as APP_CONFIG from '@app/app.config';
import { NestFactory } from '@nestjs/core';
import { environment } from './app.environment';
import { AppModule } from './app.module';
import logger from './utils/logger';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  });

  return await app.listen(APP_CONFIG.APP.PORT)

}
bootstrap().then(() => {
  logger.info(`Supreme Script Server is running on ${APP_CONFIG.APP.PORT}, env: ${environment}.`)
})