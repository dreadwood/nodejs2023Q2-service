import * as dotenv from 'dotenv';
import * as yaml from 'js-yaml';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DEFAULT_PORT } from './const';

dotenv.config();
const port = process.env.PORT ?? DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const resolvedPath = join('doc', 'api.yaml');
  const apiDoc = await readFile(resolvedPath, { encoding: 'utf8' });
  const apiDocObj = yaml.load(apiDoc);

  SwaggerModule.setup('api', app, apiDocObj as OpenAPIObject);

  await app.listen(port, () => console.log(`Listen port: ${port}`));
}

bootstrap();
