import { User } from '../../user/entities/user.entity';
import { Poll } from '../../poll/entities/poll.entity';
import {
  Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => User, { nullable: false, onDelete: "SET NULL" })
    @JoinColumn()
    user: User;

    @OneToOne(type => Poll, { nullable: false, onDelete: "CASCADE"})
    @JoinColumn()
    poll: Poll;

}
