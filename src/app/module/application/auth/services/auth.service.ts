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
import { v4 as uuidv4 } from 'uuid';
import { AuthRepository } from 'src/app/module/infrastructure/repositories/auth/auth.repository';
import { TokenService } from 'src/app/module/strategies/jwt.service';
import { LoginDto } from '../model/login.dto';
import { config } from 'src/app/shared/module/config-module/config.service';
import { NotificationCommunicator } from 'src/app/module/infrastructure/communicator/notification.communicator';
import { ResetPasswordDto } from '../model/reset-password.dto';
import { SignupDto } from '../model/signup.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: TokenService,
    private readonly authRepository: AuthRepository,
    private readonly notificationCommunicator: NotificationCommunicator,
  ) {
    this.logger.log('AuthService initialized');
  }

  async signup(signUpDto: SignupDto) {
    this.logger.log(`Signup attempt for username: ${signUpDto.username}`);
    const user = { id: uuidv4(), ...signUpDto };

    const existedUser = await this.authRepository.getUserByFelid(
      'username',
      user.username,
    );

    if (existedUser) {
      this.logger.warn(
        `Signup failed: User already exists (username: ${user.username})`,
      );
      throw new ConflictException('User already exists');
    }

    user.password = await hashPassword(user.password);
    const userEntity = await this.authRepository.createUser(user);

    this.logger.log(`User created successfully: ${user.username}`);
    const payload = { username: user.username, userId: user.id };
    const access_token = this.jwtService.generateAccessToken(payload);
    const refresh_token = this.jwtService.generateRefreshToken(payload);

    this.logger.log(`Tokens generated for user: ${user.username}`);
    return {
      user: userEntity,
      access_token,
      refresh_token,
    };
  }

  async login(loginDto: LoginDto) {
    this.logger.log(`Login attempt for username: ${loginDto.username}`);
    const entity = await this.authRepository.getUserByFelid(
      'username',
      loginDto.username,
    );

    if (
      !entity ||
      !(await comparePassword(loginDto.password, entity.password))
    ) {
      this.logger.warn(
        `Login failed: Invalid credentials for username: ${loginDto.username}`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`Login successful for username: ${loginDto.username}`);
    const payload = { username: entity.username, userId: entity.id };
    const access_token = this.jwtService.generateAccessToken(payload);
    const refresh_token = this.jwtService.generateRefreshToken(payload);

    this.logger.log(`Tokens generated for username: ${loginDto.username}`);
    return {
      access_token,
      refresh_token,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    this.logger.log('Refreshing access token');
    try {
      const payload = this.jwtService.refreshToken(refreshToken);
      const newAccessToken = this.jwtService.generateAccessToken(payload);

      this.logger.log(`Access token refreshed for user: ${payload.username}`);
      return { access_token: newAccessToken };
    } catch (error) {
      this.logger.error('Failed to refresh access token', error.stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async forgotPassword(email: string) {
    this.logger.log(`Password reset requested for email: ${email}`);
    const user = await this.authRepository.getUserByFelid('email', email);

    if (!user) {
      this.logger.warn(
        `Password reset failed: No user found with email: ${email}`,
      );
      throw new NotFoundException('User with this email not found');
    }

    const resetToken = this.jwtService.resetPasswordToken({
      username: user.username,
      userId: user.id,
    });

    await this.notificationCommunicator.sendEmail({ email, resetToken });

    this.logger.log(`Password reset link sent to email: ${email}`);
    return { message: 'Password reset link has been sent to your email' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    this.logger.log(
      `Password reset attempt with token for userId: ${resetPasswordDto.token}`,
    );
    try {
      const { userId } = this.jwtService.verify(
        resetPasswordDto.token,
        config.getString('RESET_PASSWORD_SECRET'),
      );

      const user = await this.authRepository.getUserByFelid('id', userId);
      if (!user) {
        this.logger.warn(
          `Password reset failed: User not found for id: ${userId}`,
        );
        throw new NotFoundException('User not found');
      }

      user.password = await hashPassword(resetPasswordDto.password);
      await this.authRepository.updateUser(user);

      this.logger.log(`Password reset successful for user: ${user.username}`);
      return { message: 'Password has been reset successfully' };
    } catch (error) {
      this.logger.error(
        'Password reset failed: Invalid or expired token',
        error.stack,
      );
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
