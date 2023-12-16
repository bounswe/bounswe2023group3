import { Tag } from '../../tag/entities/tag.entity';
import { User } from '../../user/entities/user.entity';
import { Option } from '../../option/entities/option.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Relation,
  OneToOne,
} from 'typeorm';
import { Settle } from '../enums/settle.enum';
import { Like } from '../../like/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Vote } from '../../vote/entities/vote.entity';
import { Annotation } from '../../annotation/entities/annotation.entity';

// @Todo Some entities are not ready, therefore this is not the finalized version.
@Entity('polls')
export class Poll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  question: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.polls, { onDelete: 'SET NULL' }) // Establishing the many-to-one relationship
  @JoinColumn() // Specifying the foreign key column
  creator: Relation<User>;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Relation<Tag[]>;

  @OneToMany(() => Option, (option) => option.poll, { cascade: true })
  options: Relation<Option[]>;

  @OneToOne(() => Option, { nullable: true })
  @JoinColumn()
  outcome: Option;

  @Column({ nullable: true })
  outcome_source: string;

  @Column()
  @CreateDateColumn()
  creation_date: Date;

  @Column({ nullable: true })
  due_date: Date;

  @OneToMany(() => Like, (like) => like.poll)
  likes: Relation<Like[]>;

  @OneToMany(() => Comment, (comment) => comment.poll)
  comments: Relation<Comment[]>;

  @OneToMany(() => Vote, (vote) => vote.poll)
  votes: Relation<Vote[]>;

  @Column({ default: 0 })
  vote_count: number;

  @OneToMany(() => Annotation, (annotation) => annotation.poll)
  annotations: Relation<Annotation[]>;

  // @Todo Replace with report entity
  //@Column({ nullable: true })
  //report_list: Array<any>;

  @Column({ nullable: true })
  approveStatus: boolean;

  @Column('int', { default: Settle.ACTIVE })
  is_settled: Settle;

  @Column({ nullable: true })
  settle_poll_request_feedback: string;

  @Column({ nullable: true })
  poll_request_rejection_feedback: string;

  @Column("simple-array",{ nullable: true })
  image_urls: string[];
}
