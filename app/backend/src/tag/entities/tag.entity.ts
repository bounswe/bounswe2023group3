import { Ranking } from '../../ranking/entities/ranking.entity';
import { Entity, Column, PrimaryGeneratedColumn, Relation, OneToMany } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Ranking, (ranking) => ranking.user, { cascade: true })
  rankings : Relation<Ranking[]>;
}
