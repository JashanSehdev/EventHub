import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,type Relation } from 'typeorm';
import { User } from '../../users/entities/users.entity.js';

@Entity('notifications')
export class Notification {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type : 'integer'})
  userId : number

  @Column({type : 'text'})
  message : string

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => User, (user) => user.Notifications)
  @JoinColumn({name : 'userId'})
  User: Relation<User>
}
