import { Module } from '@nestjs/common';
import { NotificationCommunicatorModule } from './app/modules/infrastructure/communicator/communicator.module';
import { ApplicationModule } from './app/modules/application/application.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';
@Module({
  imports: [
    SentryModule.forRoot(),
    ApplicationModule,
    NotificationCommunicatorModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: SentryGlobalFilter,
  }],
})
export class AppModule {}
