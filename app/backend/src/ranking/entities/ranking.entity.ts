import { Tag } from '../../tag/entities/tag.entity';
import { User } from '../../user/entities/user.entity';
import {
    Column,
  Entity,ManyToOne, PrimaryGeneratedColumn, Relation
} from 'typeorm';


@Entity('rankings')
export class Ranking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:false})
    rank: number;
    
    @ManyToOne(type => User, (user)=>user.rankings,{ nullable: false, onDelete: "CASCADE"})
    user: Relation<User>;

    @ManyToOne(type => Tag, (tag)=>tag.rankings, { nullable: false, onDelete: "CASCADE"} )
    tag: Relation<Tag>;

}
