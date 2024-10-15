import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType , Logger } from '@nestjs/common';
import { config } from './app/shared/module/config-module/config-module.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(config.getNumber('PORT'));
  Logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
