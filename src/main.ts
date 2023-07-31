import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DEFAULT_PORT } from './const';

dotenv.config();
const port = process.env.PORT ?? DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  console.log(`Listen port: ${port}`);
}
bootstrap();
