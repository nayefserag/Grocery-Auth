import { Module } from '@nestjs/common';
import { ConfigService } from 'src/app/shared/module/config-module/config.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config'
import { NotificationCommunicator } from './notification.communicator';
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    // // MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  exports: [NotificationCommunicator],
  providers: [NotificationCommunicator, ConfigService ],
})
export class NotificationCommunicatorModule {}
