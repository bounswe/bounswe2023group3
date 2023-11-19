import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;
}
