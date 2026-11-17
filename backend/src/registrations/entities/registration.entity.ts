import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { RegistrationStatus } from '../enum/registration.enum.js';
import { User } from '../../users/entities/users.entity.js';
import { Event } from '../../event/entities/event.entity.js';

@Entity('registrations')
@Unique(['userId', 'eventId'])
export class Registration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  userId: number;

  @Column({ type: 'integer' })
  eventId: number;

  @Column({ type: 'enum', enum : RegistrationStatus})
  status: RegistrationStatus; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.RegisteredEvents)
  @JoinColumn({name: 'userId'})
  Attendee : Relation<User>

  @ManyToOne(() => Event, (event) => event.Attendees)
  @JoinColumn({name: 'eventId'})
  Event : Relation<Event[]>
}
