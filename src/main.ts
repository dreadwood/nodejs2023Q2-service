import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DEFAULT_PORT } from './const';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();
const port = process.env.PORT ?? DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port, () => console.log(`Listen port: ${port}`));
}

bootstrap();
