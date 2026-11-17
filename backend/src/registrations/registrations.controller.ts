import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RegistrationsService } from './registrations.service.js';
import { CreateRegistrationDto } from './dto/create-registration.dto.js';
import { UpdateRegistrationDto } from './dto/update-registration.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { FilterDto } from '../common/dto/filter-dto.js';
import { FilterAttendeeDto } from './dto/filter-attendee.dto.js';

@Controller('event/:eventId/registration')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  create(@CurrentUser('id') userId : number,  @Param('eventId') eventId: string, ) {
    return this.registrationsService.createAttendee( +eventId,  userId );
  }

  @Get()
  findAll(@Query() filterAttendee :FilterAttendeeDto, @Param('eventId') eventId: string) {
    return this.registrationsService.findAttendees(filterAttendee, +eventId) 

    
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.registrationsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrationDto: UpdateRegistrationDto) {
    return this.registrationsService.update(+id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationsService.remove(+id);
  }
}
