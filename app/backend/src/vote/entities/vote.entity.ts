import { User } from '../../user/entities/user.entity';
import { Poll } from '../../poll/entities/poll.entity';
import {
  Entity,ManyToOne, PrimaryGeneratedColumn, Relation
} from 'typeorm';
import { Option } from '../../option/entities/option.entity';


@Entity('vote')
export class Vote {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => User, (user)=>user.votes,{ nullable: false, onDelete: "CASCADE"})
    user: Relation<User>;

    @ManyToOne(type => Poll, (poll)=>poll.votes, { nullable: false, onDelete: "CASCADE"} )
    poll: Relation<Poll>;

    @ManyToOne(type => Option, (option)=>option.votes, { nullable: false, onDelete: "CASCADE"} )
    option: Relation<Option>;
    

}