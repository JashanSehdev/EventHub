import { Injectable } from '@nestjs/common';
import { CreateNotifcationDto } from './dto/create-notifcation.dto.js';
import { UpdateNotifcationDto } from './dto/update-notifcation.dto.js';

@Injectable()
export class NotifcationsService {
  create(createNotifcationDto: CreateNotifcationDto) {
    return 'This action adds a new notifcation';
  }

  findAll() {
    return `This action returns all notifcations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notifcation`;
  }

  update(id: number, updateNotifcationDto: UpdateNotifcationDto) {
    return `This action updates a #${id} notifcation`;
  }

  remove(id: number) {
    return `This action removes a #${id} notifcation`;
  }
}
