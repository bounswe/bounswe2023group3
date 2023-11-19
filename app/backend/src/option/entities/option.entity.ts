import { Poll } from '../../poll/entities/poll.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  answer: string;

  @ManyToOne(() => Poll, (poll) => poll.options) // Establishing the many-to-one relationship
  @JoinColumn() // Specifying the foreign key column
  poll: Relation<Poll>;
}
