import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from '../../application/auth/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategies/jwt/jwt.strategy';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { TokenService } from '../../strategies/jwt/jwt.service';
import { NotificationCommunicator } from '../../infrastructure/communicator/notification.communicator';
import { ConfigService } from 'src/app/shared/module/config-module/config.service';
import { HttpModule } from '@nestjs/axios';
import { NotificationCommunicatorModule } from '../../infrastructure/communicator/communicator.module';

@Module({
  imports: [
    JwtModule.register({}),
    InfrastructureModule,
    NotificationCommunicatorModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    TokenService,
    ConfigService,
    NotificationCommunicator,
  ],
})
export class AuthModule {}
