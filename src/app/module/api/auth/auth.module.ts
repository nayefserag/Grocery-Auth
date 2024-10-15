import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from '../../application/auth/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategies/strategies';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { AuthRepository } from '../../infrastructure/repositories/auth/auth.repository';
import { UserEntity } from '../../infrastructure/entities/general/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    InfrastructureModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
