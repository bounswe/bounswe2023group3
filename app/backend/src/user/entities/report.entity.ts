import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Relation,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';


@Entity('reports')
export class Report {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn()
    reporter: Relation<User>;

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn()
    reported: Relation<User>;

    @Column({ nullable: false })
    reason: string;

    @Column()
    @CreateDateColumn()
    creation_date: Date;
    
    @Column({ nullable: true, default: null })
    resolved_date: Date;

    @Column({ nullable: true, default: null })
    resolution: boolean;
}
