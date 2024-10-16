import { Module } from '@nestjs/common';
import { ConfigService } from 'src/app/shared/module/config-module/config.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config'
import { NotificationCommunicator } from './notification.communicator';
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    // // MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],

  controllers: [],

  providers: [NotificationCommunicator, ConfigService, ],
})
export class NotificationCommunicatorModule {}
