import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';

// import { CreateBookingRequestDTO } from 'src/car-booking/dto/create-booking-request.dto';

import { ConfigService } from 'src/app/shared/module/config-module/config.service';

@Injectable()
export class NotificationCommunicator {
  private logger: Logger = new Logger(NotificationCommunicator.name);

  constructor(
    private readonly configService: ConfigService,

    private readonly httpService: HttpService,
  ) {}

//   public async bookingDetails(
//     bookingId: string,
//   ): Promise<CreateBookingRequestDTO> {
//     const url = `${this.configService.getString('BOOKING_ENGINE')}/booking/${bookingId}`;

//     this.logger.log(`Calling Booking Engine: ${url}`);

//     return await firstValueFrom(
//       this.httpService

//         .get(url)

//         .pipe(
//           map((res) => {
//             return res.data;
//           }),

//           catchError((error) => {
//             this.logger.error(
//               `Error from Booking Engine: ${JSON.stringify(error.response?.data)}`,
//             );

//             throw new UnauthorizedException(error.response?.data);
//           }),
//         ),
//     );
//   }
}
