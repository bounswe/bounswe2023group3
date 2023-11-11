import { User } from '../../user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// @Todo Some entities are not ready, therefore this is not the finalized version.
@Entity('polls')
export class Poll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  question: string;

  @ManyToOne(() => User, user => user.polls) // Establishing the many-to-one relationship
  @JoinColumn({ name: 'creator_id' }) // Specifying the foreign key column
  @Column({ nullable: false })
  creator: string;

  //@ManyToOne(() => User) // Establishing the many-to-one relationship
  //@JoinColumn({ name: 'id' })
  @Column({ nullable: true })
  moderator: string;

  // @Todo Replace with tag entity
  //@Column({ nullable: false })
  //tag_list: Array<string>;

  //@Column({ nullable: false })
  //options: Array<string>;
  @Column({ nullable: true })
  outcome: string;

  @Column({ nullable: true })
  outcome_source: string;

  @Column()
  @CreateDateColumn()
  creation_date: Date;

  @Column({ nullable: true })
  due_date: Date;

  // @Todo Replace with like entity
  //@Column({ nullable: true })
  //like_list: Array<any>;

  // @Todo Replace with comment entity
  //@Column({ nullable: true })
  //comment_list: Array<string>;

  // @Todo Replace with vote entity
  //@Column({ nullable: true })
  //vote_list: Array<any>;

  @Column({ default: 0 })
  like_count: number;

  @Column({ default: 0 })
  comment_count: number;

  @Column({ default: 0 })
  vote_count: number;

  // @Todo Replace with report entity
  //@Column({ nullable: true })
  //report_list: Array<any>;

  @Column({ default: false })
  is_approved_by_moderator: boolean;

  @Column({ default: false })
  is_settled: boolean;
}
