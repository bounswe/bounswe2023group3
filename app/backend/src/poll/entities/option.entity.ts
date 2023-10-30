import { Poll } from '../../poll/entities/poll.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  answer: string;

  /*
  @ManyToOne(() => Poll) // Establishing the many-to-one relationship
  @JoinColumn({ name: 'id' }) // Specifying the foreign key column
  */
  poll: Poll;
}
