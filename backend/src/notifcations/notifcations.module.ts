import { Module } from '@nestjs/common';
import { NotifcationsService } from './notifcations.service.js';
import { NotifcationsController } from './notifcations.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notifcation.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotifcationsController],
  providers: [NotifcationsService],
})
export class NotifcationsModule {}
