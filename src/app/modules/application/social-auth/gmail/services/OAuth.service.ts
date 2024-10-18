import {
  Injectable,
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthRepository } from 'src/app/modules/infrastructure/repositories/auth/auth.repository';
import { OAuthDto } from '../../../auth/model/o-auth.dto';
import { TokenService } from 'src/app/modules/strategies/jwt/jwt.service';
import { v4 as uuidv4 } from 'uuid';
import { NotificationCommunicator } from 'src/app/modules/infrastructure/communicator/notification.communicator';

@Injectable()
export class OAuthService {
  private readonly logger = new Logger(OAuthService.name);

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: TokenService,
    private readonly notificationCommunicator: NotificationCommunicator,
  ) {
    this.logger.log('OAuthService initialized');
  }

  async authenticate(user: OAuthDto) {
    this.logger.log(`Attempting authentication for email: ${user.email}`);

    try {
      const userEntity = await this.authRepository.getUserByFelid(
        'email',
        user.email,
      );

      if (!userEntity) {
        return await this.registerNewUser(user);
      }

      this.logger.log(`Existing user found: ${user.email}`);
      return this.generateAuthTokens(
        userEntity,
        'GitHub Authentication Successful. Welcome again!',
      );
    } catch (error) {
      this.logger.error(
        `Error during authentication for email: ${user.email}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Authentication failed. Please try again later.',
      );
    }
  }

  private async registerNewUser(user: OAuthDto) {
    this.logger.log(`Registering new user: ${user.email}`);

    user.isCompleted = false;
    user.id = uuidv4();

    try {
      const newUser = await this.authRepository.createUser(user);

      this.logger.log(`New user created: ${newUser.email} (ID: ${newUser.id})`);

      await this.notificationCommunicator.sendCompleteRegistrationEmail({
        email: newUser.email,
        id: newUser.id,
      });

      this.logger.log(`Registration email sent to: ${newUser.email}`);

      return {
        message:
          'GitHub Authentication Successful. A confirmation email has been sent to complete your registration.',
        user: newUser,
      };
    } catch (error) {
      this.logger.error(
        `Failed to register new user: ${user.email}`,
        error.stack,
      );
      throw new ConflictException(
        'User registration failed. Please try again.',
      );
    }
  }

  private generateAuthTokens(userEntity: any, message: string) {
    const payload = { userId: userEntity.id };

    const access_token = this.jwtService.generateAccessToken(payload);
    const refresh_token = this.jwtService.generateRefreshToken(payload);

    this.logger.log(`Auth tokens generated for user: ${userEntity.email}`);

    return {
      message,
      user: userEntity,
      access_token,
      refresh_token,
    };
  }
}
