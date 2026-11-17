import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistrationDto } from './create-registration.dto.js';
import { RegistrationStatus } from '../enum/registration.enum.js';
import { IsEnum } from 'class-validator';

export class UpdateRegistrationDto extends PartialType(CreateRegistrationDto) {
  @IsEnum(RegistrationStatus)
  status: RegistrationStatus;
}
