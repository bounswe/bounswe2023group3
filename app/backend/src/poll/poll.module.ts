import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { Poll } from './entities/poll.entity';
import { Option } from '../option/entities/option.entity'; // Import Option entity
import { Tag } from '../tag/entities/tag.entity'; // Import Tag entity
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { PollRepository } from './repository/poll.repository';
import { Badge } from '../badge/entities/badge.entity';
import { BadgeService } from '../badge/badge.service';
import { Moderator } from '../moderator/entities/moderator.entity';
import { ModeratorService } from '../moderator/moderator.service';
import { Like } from '../like/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Poll, Option, Tag, User, Badge, Moderator, Like]),
  ],
  controllers: [PollController],
  providers: [
    PollService,
    UserService,
    PollRepository,
    BadgeService,
    ModeratorService,
  ],
  exports: [PollService],
})
export class PollModule {}
