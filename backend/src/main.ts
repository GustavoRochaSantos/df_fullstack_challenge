import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { json } from 'express';
import helmet from 'helmet';
import { ResponseAddHeaderInterceptor } from 'src/settings/interceptors/cors.interceptor';

import type {
  CorsConfig,
  HelmetConfig,
  NestConfig,
  SwaggerConfig,
} from 'src/settings/configs';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { NestJSLogMiddleware } from './settings/middleware/nestjs.log.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const helmetConfig = configService.get<HelmetConfig>('helmet');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  app.use(json());
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.useGlobalInterceptors(new ResponseAddHeaderInterceptor());
  app.use(NestJSLogMiddleware);

  if (swaggerConfig.enabled) {
    const config = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'NestJs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  if (corsConfig.enabled) {
    app.enableCors({
      origin: corsConfig.origin,
    });
  }

  if (helmetConfig.enabled) {
    app.use(helmet());
  }

  await app.listen(process.env.PORT || nestConfig.port || 3001);
}
bootstrap();
