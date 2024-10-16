import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import {
  comparePassword,
  hashPassword,
} from 'src/app/shared/utils/hash.helper';
import { SignupDto } from '../model/sginup.dto';
import { v4 as uuidv4 } from 'uuid';
import { AuthRepository } from 'src/app/module/infrastructure/repositories/auth/auth.repository';
import { TokenService } from 'src/app/module/strategies/jwt.service';
import { LoginDto } from '../model/login.dto';
import { config } from 'src/app/shared/module/config-module/config.service';
import { ResetPasswordDto } from '../model/reser-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: TokenService,
    private readonly authRepository: AuthRepository,
  ) {
    let logger = new Logger();
    logger.log('AuthService created', AuthService.name);
  }
  async signup(signUpDto: SignupDto) {
    const user = { id: uuidv4(), ...signUpDto };
    const existedUser = await this.authRepository.getUserByFelid(
      'username',
      user.username,
    );
    if (existedUser) {
      throw new ConflictException('User already exists');
    }
    user.password = await hashPassword(user.password);
    const userEntity = this.authRepository.createUser(user);
    const payload = { username: user.username, userId: user.id };
    const access_token = this.jwtService.generateAccessToken(payload);
    const refresh_token = this.jwtService.generateRefreshToken(payload);

    return {
      user: userEntity,
      access_token,
      refresh_token,
    };
  }

  async login(user: LoginDto) {
    const entity = await this.authRepository.getUserByFelid(
      'username',
      user.username,
    );
    if (!entity || !(await comparePassword(user.password, entity.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: entity.username, userId: entity.id };
    const access_token = this.jwtService.generateAccessToken(payload);
    const refresh_token = this.jwtService.generateRefreshToken(payload);

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.refreshToken(refreshToken);
      const newAccessToken = this.jwtService.generateAccessToken(payload);
      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async forgotPassword(email: string) {
    const user = await this.authRepository.getUserByFelid('email', email);
    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    const resetToken = this.jwtService.resetPasswordToken({
      username: user.username,
      userId: user.id,
    });

    // Compose a reset link and send it via email
    // const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    // await this.mailerService.sendMail({
    //   to: user.email,
    //   subject: 'Password Reset Request',
    //   text: `You can reset your password by clicking the following link: ${resetLink}`,
    // });

    return { message: 'Password reset link has been sent to your email' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const { userId } = this.jwtService.verify(
        resetPasswordDto.token,
        config.getString('RESET_PASSWORD_SECRET'),
      );
      const user = await this.authRepository.getUserByFelid('id', userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.password = await hashPassword(resetPasswordDto.password);
      await this.authRepository.updateUser(user);

      return { message: 'Password has been reset successfully' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
