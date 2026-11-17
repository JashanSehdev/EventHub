import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventService } from './event.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { FilterEventDto } from './dto/filter-event.dto.js';
import { Roles } from '../auth/decorator/roles.decorator.js';
import { UserRole } from '../users/enum/roles.enum.js';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Roles([UserRole.ORGANIZER])
  @Post()
  create(@Body() createEventDto: CreateEventDto, @CurrentUser('id') userId : number) {
    return this.eventService.createEvent(createEventDto, userId);
  }

  @Get()
  findAll(@Query() query : FilterEventDto) {
    return this.eventService.findEvents(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findEvent(+id);
  }

  @Roles([UserRole.ORGANIZER])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @CurrentUser() userId : number) {
    return this.eventService.updateEvent(+id, updateEventDto, userId);
  }
  
  @Roles([UserRole.ORGANIZER])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
