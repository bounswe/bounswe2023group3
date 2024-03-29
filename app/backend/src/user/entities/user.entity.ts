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
import { Badge } from '../../badge/entities/badge.entity';
import { Like } from '../../like/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Report } from './report.entity';
import { Vote } from '../../vote/entities/vote.entity';
import { Ranking } from '../../ranking/entities/ranking.entity';

const SALT_ROUNDS = 10;

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ unique: true, nullable: true, default: null })
  username: string;

  @Column({ nullable: true, default: null })
  firstname: string;

  @Column({ nullable: true, default: null })
  lastname: string;

  @Column({ nullable: true, default: null })
  profile_picture: string;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @Column({ nullable: false, default: false })
  isBanned: boolean;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  verification_code: number;

  @Column({ nullable: true })
  reset_password_token: number;

  @OneToMany(() => Poll, (poll) => poll.creator, { cascade: true })
  polls: Relation<Poll[]>;

  @ManyToMany(() => User, (user) => user.followings)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  followings: User[];

  @ManyToMany(() => Badge)
  @JoinTable()
  badges: Relation<Badge[]>;

  @OneToMany(() => Like, (like) => like.user, { cascade: true })
  likes : Relation<Like[]>;

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments : Relation<Comment[]>;

  @OneToMany(() => Report, (report) => report.reporter, { cascade: true })
  reports : Relation<Report[]>;

  @OneToMany(() => Vote, (vote) => vote.user, { cascade: true })
  votes : Relation<Vote[]>;

  @OneToMany(() => Ranking, (ranking) => ranking.user, { cascade: true })
  rankings : Relation<Ranking[]>;

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
