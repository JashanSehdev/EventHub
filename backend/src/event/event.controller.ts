import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EventService } from './event.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { FilterEventDto } from './dto/filter-event.dto.js';
import { Roles } from '../auth/decorator/roles.decorator.js';
import { UserRole } from '../users/enum/roles.enum.js';
import { RoleGuard } from '../auth/guard/auth.guard.js';

@Controller('event')
@UseGuards(RoleGuard)

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

  @Roles([UserRole.ORGANIZER])
  @Get(`created`)
  getCreatedEvent (@Param() query : FilterEventDto,@CurrentUser('id') userId : number ) {
    return this.eventService.findCreatedEvents(query, userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string,  @CurrentUser('id') userId : number) {
    return this.eventService.findEvent(+id, userId);
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
