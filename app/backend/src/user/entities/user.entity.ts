import * as bcrypt from 'bcrypt';
import { Poll } from '../../poll/entities/poll.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  Relation,
  JoinTable,
  ManyToMany,
} from 'typeorm';

const SALT_ROUNDS = 10;

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ unique: true, nullable: true, default: null })
  username: string;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  verification_code: number;

  @Column({ nullable: true })
  reset_password_token: number;

  @OneToMany(() => Poll, (poll) => poll.creator)
  polls: Relation<Poll[]>;

  @ManyToMany((type) => User, (user) => user.followings)
  @JoinTable()
  followers: User[];

  @ManyToMany((type) => User, (user) => user.followers)
  followings: User[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password) {
      this.password = await this.getEncryptedPassword(this.password);
    }
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password) {
      this.password = await this.getEncryptedPassword(this.password);
    }
  }

  async getEncryptedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async compareEncryptedPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
