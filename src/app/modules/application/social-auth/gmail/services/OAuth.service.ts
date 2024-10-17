import { Injectable, Logger } from '@nestjs/common';
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
    private readonly notificationCommunicator: NotificationCommunicator

  ) {
    this.logger.log('OAuthService created', OAuthService.name);
  }

  async authenticate(user: OAuthDto) {
    this.logger.log('User authenticated successfully', OAuthService.name);
    const userEntity = await this.authRepository.getUserByFelid('email', user.email);
    if (!userEntity) {
      this.logger.log('Creating new user', OAuthService.name);
      user.isCompleted = false;
      user.id = uuidv4();
      let newUser = await this.authRepository.createUser(user);
      await this.notificationCommunicator.sendCompleteRegistrationEmail({ email:newUser.email, id: newUser.id });

      // here we will send email to complete registration throw notification service
      // the link which will send its the to this service that called complete data
      return {
        message: 'GitHub Authentication Successful And we have sent you a mail to complete your registration',
        user: newUser,
      };
    }
    let payload = {userId: userEntity.id };
    const access_token = this.jwtService.generateAccessToken(payload);
    const refresh_token = this.jwtService.generateRefreshToken(payload);

    return {
      message: 'GitHub Authentication Successful Welcome again',
      user: userEntity,
      access_token: access_token,
      refresh_token:refresh_token,
    }
    

  }

}
