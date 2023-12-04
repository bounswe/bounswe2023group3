import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { JwtModule } from '@nestjs/jwt';
import { PollService } from '../poll/poll.service';
import { PollRepository } from '../poll/repository/poll.repository';
import { UserService } from '../user/user.service';
import { Option } from '../option/entities/option.entity';
import { Tag } from '../tag/entities/tag.entity';
import { Like } from '../like/entities/like.entity';
import { User } from '../user/entities/user.entity';
import { Badge } from '../badge/entities/badge.entity';
import { Poll } from '../poll/entities/poll.entity';
import { BadgeService } from '../badge/badge.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Poll, Tag, User, Badge, Option, Comment]),
    TagModule,
    JwtModule.register({
      global: true,
      secret: 'very-secret-key',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    PollService,
    PollRepository,
    UserService,
    BadgeService,
  ],
})
export class CommentModule {}
