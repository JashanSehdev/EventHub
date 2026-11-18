import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto.js';
import { BaseService } from '../common/service/base.service.js';
import { Event } from './entities/event.entity.js';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UsersService } from '../users/user.service.js';
import { UserRole } from '../users/enum/roles.enum.js';
import { ResponseType } from '../common/interfaces/response.interface.js';
import { IEvent } from './interface/event.interface.js';
import { successResponse } from '../common/utlis/response.js';
import { FilterEventDto } from './dto/filter-event.dto.js';
import { applyFilters } from '../common/utlis/filter.js';
import { paginationResponse } from '../common/utlis/pagination.js';
import { PaginationResult } from '../common/interfaces/pagination.interface.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEventDto } from './dto/update-event.dto.js';
import { Registration } from '../registrations/entities/registration.entity.js';

@Injectable()
export class EventService extends BaseService<Event> {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly userService: UsersService,

    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
  ) {
    super(eventRepository);
  }
  async createEvent(
    createEventDto: CreateEventDto,
    userId: number,
  ): Promise<ResponseType<IEvent>> {
    const user = await this.userService.getUser(userId);

    if (!user || user.role !== UserRole.ORGANIZER)
      throw new BadRequestException('Not a valid User');

    const event = this.eventRepository.create({
      ...createEventDto,
      organizerId: userId,
    });

    const { id } = await this.eventRepository.save(event);

    const dispatchEvent = await this.getEvent(id);

    if (!dispatchEvent)
      throw new InternalServerErrorException('failed to create Event');

    return successResponse('event Created successfully', dispatchEvent);
  }

  async getEvent(eventId: number, userId?: number): Promise<IEvent | null> {
    const event = await this.eventRepository.findOne({
      where: {
        id: eventId,
      },
      relations: {
        Organizer: true,
      },
      select: {
        Organizer: {
          id: true,
          username: true,
          email: true,
          avatar: true,
        },
      },
    });

    let isRegistered: boolean = false;

    if (typeof userId === "number") {
      isRegistered = await this.registrationRepository.exists({
        relations: {Attendee : true},
        where : {
          userId,
          eventId
        }
      
      });
    }


    if (!event) return null;
    const dispatchEvent: IEvent = {
      id: event.id,
      title: event.title,
      description: event.description,
      organizerId: event.organizerId,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      publish: event.publish,
      registeredUsers: event.activeRegistrations,
      organizer: {
        id: event.Organizer.id,
        username: event.Organizer.username,
        email: event.Organizer.email,
        avatar: event.Organizer.avatar,
      },
      isRegistered
    };

    return dispatchEvent;
  }

  async findCreatedEvents(
    filterEvents: FilterEventDto,
    userId: number,
  ): Promise<PaginationResult<IEvent>> {
    const baseWhere: FindOptionsWhere<Event> = {};
    const page = filterEvents.page;
    const limit = filterEvents.limit;
    const skip = (page - 1) * limit;

    baseWhere.organizerId = userId;

    const [where, order] = applyFilters(
      filterEvents,
      { where: baseWhere },
      { searchOn: ['title', 'description'] },
    );

    const [events, total] = await this.eventRepository.findAndCount({
      where,
      relations: {
        Organizer: true,
      },
      select: {
        Organizer: {
          id: true,
          username: true,
          email: true,
          avatar: true,
        },
      },

      order,
      skip,
      take: limit,
    });

    const mappedEvents: IEvent[] = events.map((event) => {
      return {
        id: event.id,
        title: event.title,
        description: event.description,
        organizerId: event.organizerId,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        publish: event.publish,
        registeredUsers: event.activeRegistrations,
        organizer: {
          id: event.Organizer.id,
          username: event.Organizer.username,
          email: event.Organizer.email,
          avatar: event.Organizer.avatar,
        },
      };
    });

    return paginationResponse(mappedEvents, page, limit, total);
  }

  async findEvents(
    filterEvents: FilterEventDto,
  ): Promise<PaginationResult<IEvent>> {
    const baseWhere: FindOptionsWhere<Event> = {};
    const page = filterEvents.page;
    const limit = filterEvents.limit;
    const skip = (page - 1) * limit;

    baseWhere.publish = true;
    const [where, order] = applyFilters(
      filterEvents,
      { where: baseWhere },
      { searchOn: ['title', 'description'] },
    );

    const [events, total] = await Promise.all([
      this.eventRepository.find({
        where,
        relations: {
          Organizer: true,
        },
        select: {
          Organizer: {
            id: true,
            username: true,
            email: true,
            avatar: true,
          },
        },
        order,
        skip,
        take: limit,
      }),

      this.eventRepository.count({
        where,
      }),
    ]);

    console.log('Events returned:', events.length);
    console.log('Total from count():', total);

    console.log('Events returned:', events.length);
    console.log('Total from count():', total);

    const mappedEvents: IEvent[] = events.map((event) => {
      return {
        id: event.id,
        title: event.title,
        description: event.description,
        organizerId: event.organizerId,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        publish: event.publish,
        registeredUsers: event.activeRegistrations,
        organizer: {
          id: event.Organizer.id,
          username: event.Organizer.username,
          email: event.Organizer.email,
          avatar: event.Organizer.avatar,
        },
      };
    });

    return paginationResponse(mappedEvents, page, limit, total);
  }

  async findEvent(id: number, userId ?: number): Promise<ResponseType<IEvent>> {
    const event = await this.getEvent(id, userId);
    if (!event) throw new NotFoundException('Event not found');

    return successResponse('event fetched successfully', event);
  }

  async updateEvent(
    eventId: number,
    updateEventDto: UpdateEventDto,
    userId: number,
  ): Promise<IEvent> {
    const event = await this.findById(eventId);

    if (event.organizerId !== userId)
      throw new ForbiddenException('you cannot access this resource');

    await this.update(eventId, updateEventDto);

    const updatedEvent = await this.getEvent(eventId);

    if (!updatedEvent) throw new NotFoundException('not found');

    return updatedEvent;
  }
}
