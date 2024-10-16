import { Module } from '@nestjs/common';
import { AuthModule } from './app/module/api/auth/auth.module';
import { NotificationCommunicatorModule } from './app/module/infrastructure/communicator/communicator.module';

@Module({
  imports: [AuthModule, NotificationCommunicatorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
