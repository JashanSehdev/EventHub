import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  Unique,
  UpdateDateColumn,
  VirtualColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity.js';
import { Registration } from '../../registrations/entities/registration.entity.js';

@Entity('events')
@Unique(['title', 'organizerId'])
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: false })
  publish: boolean;

  @Column({ type: 'integer' })
  organizerId: number;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({type : 'varchar'})
  location : string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.OrganizedEvents)
  @JoinColumn({ name: 'organizerId' })
  Organizer: Relation<User>;

  @OneToMany(() => Registration, (registration) => registration.Event)
  Attendees: Relation<Registration[]>;

  @VirtualColumn({
    query: (alias) =>
      `select count(*) from registrations where "eventId" = ${alias}.id and status = 'active'    `,
  })
  activeRegistrations: number;
}
