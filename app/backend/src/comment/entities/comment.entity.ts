import { User } from '../../user/entities/user.entity';
import { Poll } from '../../poll/entities/poll.entity';
import {
  Column,
  CreateDateColumn,
  Entity,ManyToOne, PrimaryGeneratedColumn, Relation
} from 'typeorm';


@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({nullable:false,onUpdate:"CASCADE"})
    description: string;

    @CreateDateColumn()
    created_date: Date

    @ManyToOne(type => User, (user)=>user.comments,{ nullable: false, onDelete: "CASCADE"})
    user: Relation<User>;

    @ManyToOne(type => Poll, (poll)=>poll.comments, { nullable: false, onDelete: "CASCADE"} )
    poll: Relation<Poll>;

}