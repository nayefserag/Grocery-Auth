import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import { ConfigService } from 'src/app/shared/module/config-module/config.service';
import { CompleteUserDto } from '../../application/social-auth/gmail/model/complete-user.dto';
import { ForgotPasswordDto } from '../../application/auth/model/forget-password.dto';

@Injectable()
export class NotificationCommunicator {
  private logger: Logger = new Logger(NotificationCommunicator.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  public async sendForgotPasswordEmail(forgetPasswordDto: ForgotPasswordDto) {
    const url = `${this.configService.getString('NOTIFICATION_SERVICE_URL')}/user-emails/send-forgot-password-email`;

    this.logger.log(`Calling Notification Service: ${url}`);

    return await firstValueFrom(
      this.httpService
        .post(url, forgetPasswordDto)
        .pipe(
          map((res) => {
            return res.data;
          }),
          catchError((error) => {
            this.logger.error(
              `Error from Notification Service: ${JSON.stringify(error.response?.data)}`,
            );
            throw new UnauthorizedException(error.response?.data);
          }),
        ),
    );
  }

  public async sendCompleteRegistrationEmail(completeUserDto: CompleteUserDto) {
    const url = `${this.configService.getString('NOTIFICATION_SERVICE_URL')}/user-emails/send-complete-registration-email`;

    this.logger.log(`Calling Notification Service: ${url}`);

    return await firstValueFrom(
      this.httpService
        .post(url, completeUserDto)
        .pipe(
          map((res) => {
            return res.data;
          }),
          catchError((error) => {
            this.logger.error(
              `Error from Notification Service: ${JSON.stringify(error.response?.data)}`,
            );
            throw new UnauthorizedException(error.response?.data);
          }),
        ),
    );
  }
}
