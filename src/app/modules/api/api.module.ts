import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthRepository } from '../infrastructure/repositories/auth/auth.repository';
import { NotificationCommunicatorModule } from '../infrastructure/communicator/communicator.module';
import { NotificationCommunicator } from '../infrastructure/communicator/notification.communicator';
import { SocialLoginModule } from './social-auth/social-login.module';
import { AuthController } from './auth/controller/auth.controller';
import { GithubController } from './social-auth/controller/github.controller';
import { GmailController } from './social-auth/controller/gmail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../infrastructure/entities/general/user.entity';
import { DatabaseModule } from '../database/database.module';
import { ConfigService } from 'src/app/shared/module/config-module/config.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AuthService } from '../application/auth/services/auth.service';
import { TokenService } from '../strategies/jwt/jwt.service';
import { JwtService } from '@nestjs/jwt';
import { LinkedInController } from './social-auth/controller/linkedin.controller';
import { XController } from './social-auth/controller/x.controller';

@Module({
  imports: [
    NotificationCommunicatorModule,
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity]),
    HttpModule,
  ],
  controllers: [
    AuthController,
    GithubController,
    GmailController,
    LinkedInController,
    XController
  ],
  providers: [
    AuthModule,
    AuthRepository,
    SocialLoginModule,
    NotificationCommunicator,
    SocialLoginModule,
    ConfigService,
    AuthService,
    TokenService,
    JwtService,
  ],
  exports: [],
})
export class ApiModule {}
