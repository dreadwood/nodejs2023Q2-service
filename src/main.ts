import * as dotenv from 'dotenv';
import * as yaml from 'js-yaml';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DEFAULT_OPEN_API_FILE, DEFAULT_PORT } from './const';

dotenv.config();
const port = process.env.PORT ?? DEFAULT_PORT;
const openApiFile = process.env.OPEN_API_FILE ?? DEFAULT_OPEN_API_FILE;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  try {
    const resolvedPath = join('doc', openApiFile);
    const apiDoc = await readFile(resolvedPath, { encoding: 'utf8' });
    const apiDocObj = yaml.load(apiDoc);

    SwaggerModule.setup('api', app, apiDocObj as OpenAPIObject);
  } catch (error) {
    console.error(error.message);
  }

  await app.listen(port, () => {
    console.log(`Server listen port: ${port}`);
    console.log('OpenAPI documentation is available at: /api');
  });
}

bootstrap();
