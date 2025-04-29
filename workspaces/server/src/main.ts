import { AppModule } from '@app/app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  let origins: string[] = [];

  if (process.env.CORS_ALLOW_ORIGIN_NQBRAL_GAMES != undefined) {
    origins.push(process.env.CORS_ALLOW_ORIGIN_NQBRAL_GAMES);
  }

  if (process.env.CORS_ALLOW_ORIGIN_LAST_HOPE != undefined) {
    origins.push(process.env.CORS_ALLOW_ORIGIN_LAST_HOPE);
  }

  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
