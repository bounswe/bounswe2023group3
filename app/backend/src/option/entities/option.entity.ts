import { Vote } from '../../vote/entities/vote.entity';
import { Poll } from '../../poll/entities/poll.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Relation,
  OneToMany,
} from 'typeorm';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  answer: string;

  @ManyToOne(() => Poll, (poll) => poll.options, { onDelete: 'CASCADE' }) // Establishing the many-to-one relationship
  @JoinColumn() // Specifying the foreign key column
  poll: Relation<Poll>;

  @OneToMany(() => Vote, (vote) => vote.user, { cascade: true })
  votes : Relation<Vote[]>;
}
