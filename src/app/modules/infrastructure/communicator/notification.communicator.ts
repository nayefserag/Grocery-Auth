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

  private async sendEmail(
    emailType: 'forgotPassword' | 'completeRegistration',
    dto: ForgotPasswordDto | CompleteUserDto,
  ) {
    const url = `${this.configService.getString('NOTIFICATION_SERVICE_URL')}/user-emails/send-email`;

    this.logger.log(
      `Calling Notification Service: ${url} with email type: ${emailType}`,
    );

    return await firstValueFrom(
      this.httpService.post(url, { emailType, dto }).pipe(
        map((res) => res.data),
        catchError((error) => {
          this.logger.error(
            `Error from Notification Service: ${JSON.stringify(error.response?.data)}`,
          );
          throw new UnauthorizedException(error.response?.data);
        }),
      ),
    );
  }

  public async sendForgotPasswordEmail(forgetPasswordDto: ForgotPasswordDto) {
    return this.sendEmail('forgotPassword', forgetPasswordDto);
  }

  public async sendCompleteRegistrationEmail(completeUserDto: CompleteUserDto) {
    return this.sendEmail('completeRegistration', completeUserDto);
  }
}
