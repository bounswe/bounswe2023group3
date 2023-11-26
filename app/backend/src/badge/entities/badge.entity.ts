import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('badges')
export class Badge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;
}
