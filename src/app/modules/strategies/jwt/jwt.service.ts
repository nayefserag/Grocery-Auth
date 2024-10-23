import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/app/shared/module/config-module/config.service';

@Injectable()
export class TokenService {

  constructor(private readonly jwtService: JwtService) {
  }

  // Generate access token
  generateAccessToken(payload: any) {
    return this.generateToken(payload, config.getString('JWT_SECRET'), '15m');
  }

  // Generate refresh token
  generateRefreshToken(payload: any) {
    return this.generateToken(payload, config.getString('JWT_SECRET_REFRESH'), '7d');
  }

  // Refresh token logic
  refreshToken(refreshToken: string) {
    try {
      this.jwtService.verify(refreshToken, { secret: config.getString('JWT_SECRET_REFRESH') });
      return this.jwtService.decode(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  // Generate reset password token
  resetPasswordToken(payload: any) {
    return this.generateToken(payload, config.getString('JWT_SECRET'), '5m');
  }

  // Verify token with dynamic secret
  verify(token: string, secret: string) {
    try {
      return this.jwtService.verify(token, { secret });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // Helper method to generate JWT tokens
  private generateToken(payload: any, secret: string, expiresIn: string) {
    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
