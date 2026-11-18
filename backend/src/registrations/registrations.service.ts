import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Registration } from './entities/registration.entity.js';
import { UsersService } from '../users/user.service.js';
import { BaseService } from '../common/service/base.service.js';
import { InjectRepository } from '@nestjs/typeorm';
import { IAttendee } from './interfaces/attendee.interface.js';
import { FilterAttendeeDto } from './dto/filter-attendee.dto.js';
import { EventService } from '../event/event.service.js';
import { successResponse } from '../common/utlis/response.js';
import { ResponseType } from '../common/interfaces/response.interface.js';
import { applyFilters } from '../common/utlis/filter.js';
import { paginationResponse } from '../common/utlis/pagination.js';

@Injectable()
export class RegistrationsService extends BaseService<Registration> {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    private readonly userService: UsersService,
    private readonly eventService: EventService,
  ) {
    super(registrationRepository);
  }

  async createAttendee(
    eventId: number,
    userId: number,
  )
  : Promise<ResponseType<IAttendee>>
   {
    const event = await this.eventService.findById(eventId);
    if (!event) throw new BadRequestException('invalid eventId');

    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException('Invalid User');

    if (await this.alreadyExist(userId, eventId)) throw new ConflictException('Registration already initialted')

    const { id } = await this.create({userId, eventId});

    const savedAttendee = await this.getAttendee(id);
    
    if (!savedAttendee)
      throw new InternalServerErrorException('failed to register attendee');
    
    return successResponse('attendee registered successfully', savedAttendee);

  }

  async alreadyExist (userId: number, eventId : number) {
    return !! await this.registrationRepository.findOneBy({
      userId,
      eventId
    })
  }

  async getAttendee(registrationId: number) {
    const attendee = await this.registrationRepository.findOne({
      where: {
        id: registrationId,
      },

      relations: {
        Attendee : true
      },
      select: {
        Attendee: {
          id: true,
          username: true,
          email: true,
          avatar: true,
        },
      },
    });

    if (!attendee) return null;

    const mappedAttendee: IAttendee = {
      registrationId: attendee.id,
      eventId: attendee.eventId,
      userId: attendee.Attendee.id,
      username: attendee.Attendee.username,
      email: attendee.Attendee.email,
      avatar: attendee.Attendee.avatar,
      status: attendee.status,
      createdAt: attendee.createdAt,
      updatedAt: attendee.updatedAt,
    };

    return mappedAttendee;
  }

  async findAttendees(filterAttendee: FilterAttendeeDto, eventId: number) {
    const page = filterAttendee.page;
    const limit = filterAttendee.limit;
    const skip = (page - 1) * limit;

    const baseWhere: FindOptionsWhere<Registration> = {
      eventId: eventId,
    };

    const [where, order] = applyFilters(
      filterAttendee,
      { where: baseWhere },
      { searchOn: ['Attendee.username'] },
    );

    const [attendees, total] = await this.registrationRepository.findAndCount({
      where,

      relations: {
        Attendee: true,
      },
      order,
      skip,
      take: limit,
    });

    const mappedAttendee: IAttendee[] = attendees.map((attendee) => {
      return {
        registrationId: attendee.id,
        eventId: attendee.eventId,
        userId: attendee.Attendee.id,
        username: attendee.Attendee.username,
        email: attendee.Attendee.email,
        avatar: attendee.Attendee.avatar,
        status: attendee.status,
        createdAt: attendee.createdAt,
        updatedAt: attendee.updatedAt,
      };
    });

    return paginationResponse(mappedAttendee, page, limit, total);
  }
}
