import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as yaml from 'js-yaml';
import * as fs from 'fs/promises';

async function bootstrap() {
  const port = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const file = await fs.readFile('./doc/api.yaml', 'utf8');
  const document = yaml.load(file) as OpenAPIObject;
  document.servers[0].url = `${document.servers[0].url}:${port}`;
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
