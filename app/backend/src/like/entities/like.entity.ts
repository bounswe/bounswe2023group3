import { User } from '../../user/entities/user.entity';
import { Poll } from '../../poll/entities/poll.entity';
import {
  Entity,ManyToOne, PrimaryGeneratedColumn, Relation
} from 'typeorm';


@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => User, (user)=>user.likes,{ nullable: false, onDelete: "CASCADE"})
    user: Relation<User>;

    @ManyToOne(type => Poll, (poll)=>poll.likes, { nullable: false, onDelete: "CASCADE"} )
    poll: Relation<Poll>;

}
