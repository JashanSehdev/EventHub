import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enum/roles.enum.js';
import { Status } from '../enum/status.enum.js';
import { Event } from '../../event/entities/event.entity.js';
import { Notification } from '../../notifcations/entities/notifcation.entity.js';
import { Registration } from '../../registrations/entities/registration.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  username: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ATTENDEE })
  role: UserRole;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  googleId: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Event, (event) => event.Organizer)
  OrganizedEvents: Relation<Event[]>;

  @OneToMany(() => Notification, (notification) => notification.User)
  Notifications: Relation<Notification[]>;

  @OneToMany(() => Registration, (registration) => registration.Attendee)
  RegisteredEvents: Relation<Registration[]>;
}
