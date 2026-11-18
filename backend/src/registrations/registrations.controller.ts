import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RegistrationsService } from './registrations.service.js';
import { UpdateRegistrationDto } from './dto/update-registration.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { FilterAttendeeDto } from './dto/filter-attendee.dto.js';
import { RoleGuard } from '../auth/guard/auth.guard.js';
import { Roles } from '../auth/decorator/roles.decorator.js';
import { UserRole } from '../users/enum/roles.enum.js';

@Controller('event/:eventId/registration')
@UseGuards(RoleGuard)
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  create(@CurrentUser('id') userId : number,  @Param('eventId') eventId: string, ) {
    return this.registrationsService.createAttendee( +eventId,  userId );
  }

  @Roles([UserRole.ORGANIZER])
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
