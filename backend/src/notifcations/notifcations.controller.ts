import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotifcationsService } from './notifcations.service.js';
import { CreateNotifcationDto } from './dto/create-notifcation.dto.js';
import { UpdateNotifcationDto } from './dto/update-notifcation.dto.js';

@Controller('notifcations')
export class NotifcationsController {
  constructor(private readonly notifcationsService: NotifcationsService) {}

  @Post()
  create(@Body() createNotifcationDto: CreateNotifcationDto) {
    return this.notifcationsService.create(createNotifcationDto);
  }

  @Get()
  findAll() {
    return this.notifcationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notifcationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotifcationDto: UpdateNotifcationDto) {
    return this.notifcationsService.update(+id, updateNotifcationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notifcationsService.remove(+id);
  }
}
