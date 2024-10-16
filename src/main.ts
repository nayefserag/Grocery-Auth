import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { config } from './app/shared/module/config-module/config.service';
import { NotificationCommunicator } from './app/module/infrastructure/communicator/notification.communicator';
import { Connector } from './app/rabbitMQ/connector';
import { RabbitMQConsumer } from './app/rabbitMQ/rabbit-mq-consumer';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.connectMicroservice({
    strategy: new RabbitMQConsumer(
      {
        url: Connector.getConnectionUrl(),
        prefetchCount: config.getNumber('RABBITMQ_PREFETCH_COUNT'),
        queue: {
          name: config.getString('NOTIFICATION_FORGET_PASSWORD_EMAIL_QUEUE'),
        },
      },
      app.get(NotificationCommunicator),

      // app.get(CarRentalCommunicator),

      // app.get<Model<BookingDocument>>('BookingModel'),
    ),
  });
  await app.listen(config.getNumber('PORT'));
  Logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
