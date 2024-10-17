import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthRepository } from '../infrastructure/repositories/auth/auth.repository';
import { NotificationCommunicatorModule } from '../infrastructure/communicator/communicator.module';
import { NotificationCommunicator } from '../infrastructure/communicator/notification.communicator';

@Module({
  imports: [NotificationCommunicatorModule],
  controllers: [],
  providers: [AuthModule, AuthRepository, NotificationCommunicator],
  exports: [],
})
export class ApiModule {}
