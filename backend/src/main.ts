import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import type {
  CorsConfig,
  HelmetConfig,
  NestConfig,
  SwaggerConfig,
} from 'src/settings/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const helmetConfig = configService.get<HelmetConfig>('helmet');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

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

  await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
