import { Poll } from '../../poll/entities/poll.entity';
import { Option } from '../../option/entities/option.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { AnnotationType } from '../enums/annotation_type.enum';

@Entity('annotations')
export class Annotation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: AnnotationType,
  })
  type;

  @Column()
  startIndex: number;

  @Column()
  lastIndex: number;

  @Column()
  description: string;

  @Column()
  imageUrl?: string;

  @ManyToOne(() => Poll, (poll) => poll.annotations, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  poll: Relation<Poll>;

  @ManyToOne(() => Option, (option) => option.annotations, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  option: Relation<Option>;
}
