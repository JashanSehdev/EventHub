import { Module } from '@nestjs/common';
import { EventService } from './event.service.js';
import { EventController } from './event.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity.js';
import { UserModule } from '../users/user.module.js';
import { Registration } from '../registrations/entities/registration.entity.js';

@Module({
  imports : [TypeOrmModule.forFeature([Event, Registration]), UserModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService]
})
export class EventModule {}
