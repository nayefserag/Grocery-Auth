import { Module } from '@nestjs/common';
import { AuthModule } from './app/modules/api/auth/auth.module';
import { NotificationCommunicatorModule } from './app/modules/infrastructure/communicator/communicator.module';

@Module({
  imports: [AuthModule, NotificationCommunicatorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
