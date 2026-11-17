import { PartialType } from '@nestjs/mapped-types';
import { CreateNotifcationDto } from './create-notifcation.dto.js';

export class UpdateNotifcationDto extends PartialType(CreateNotifcationDto) {}
