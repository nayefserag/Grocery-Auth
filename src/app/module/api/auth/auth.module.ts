import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from '../../application/auth/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategies/strategies';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { TokenService } from '../../strategies/jwt.service';
@Module({
  imports: [JwtModule.register({}), InfrastructureModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokenService],
})
export class AuthModule {}
