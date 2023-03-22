import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'typeorm';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true });

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
