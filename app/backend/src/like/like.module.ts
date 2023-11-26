import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Poll } from '../poll/entities/poll.entity';
import { PollService } from '../poll/poll.service';
import { PollRepository } from '../poll/repository/poll.repository';
import { Tag } from '../tag/entities/tag.entity';
import { User } from '../user/entities/user.entity';
import { Badge } from '../badge/entities/badge.entity';
import { Option } from '../option/entities/option.entity';
import { UserService } from '../user/user.service';
import { BadgeService } from '../badge/badge.service';
import { Comment } from '../comment/entities/comment.entity';
import { PollModule } from '../poll/poll.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Poll, Tag, User, Badge, Option]),
  ],
  controllers: [LikeController],
  providers: [
    LikeService,
    PollService,
    PollRepository,
    UserService,
    BadgeService,
  ],
})
export class LikeModule {}
