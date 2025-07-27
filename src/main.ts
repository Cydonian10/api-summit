import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import 'fastify';
import cors from '@fastify/cors';

declare module 'fastify' {
  interface FastifyRequest {
    user?: any; // aquí puedes reemplazar `any` por un tipo más preciso
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true, // colores bonitos
            translateTime: 'HH:MM:ss Z', // formato de hora
            ignore: 'pid,hostname', // campos que no quieres ver
          },
        },
      },
    }),
  );

  await app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
