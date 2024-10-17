import { Module } from '@nestjs/common';
import { AuthModule } from './app/modules/api/auth/auth.module';
import { NotificationCommunicatorModule } from './app/modules/infrastructure/communicator/communicator.module';
import { ApplicationModule } from './app/modules/application/application.module';

@Module({
  imports: [ApplicationModule, NotificationCommunicatorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
