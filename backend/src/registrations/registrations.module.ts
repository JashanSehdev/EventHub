import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service.js';
import { RegistrationsController } from './registrations.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity.js';
import { UserModule } from '../users/user.module.js';
import { EventModule } from '../event/event.module.js';

@Module({
  imports : [TypeOrmModule.forFeature([Registration]), UserModule, EventModule],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
