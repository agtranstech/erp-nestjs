import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('API_SWAGGER_TITLE'))
    .setDescription(configService.get('API_SWAGGER_DESCRIPTION'))
    .setVersion(configService.get('API_VERSION'))
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('PORT'));
}
bootstrap();
