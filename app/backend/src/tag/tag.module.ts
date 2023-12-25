import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { ModeratorService } from '../moderator/moderator.service';
import { Moderator } from '../moderator/entities/moderator.entity';
import { Poll } from '../poll/entities/poll.entity';
import { Report } from '../user/entities/report.entity';
import { User } from '../user/entities/user.entity';
import { Option } from '../option/entities/option.entity';
import { PollService } from '../poll/poll.service';
import { PollRepository } from '../poll/repository/poll.repository';
import { Like } from '../like/entities/like.entity';
import { Comment } from '../comment/entities/comment.entity';
import { UserService } from '../user/user.service';
import { Pinecone } from '@pinecone-database/pinecone';
import { RankingService } from '../ranking/ranking.service';
import { VoteService } from '../vote/vote.service';
import { BadgeService } from '../badge/badge.service';
import { Ranking } from '../ranking/entities/ranking.entity';
import { Vote } from '../vote/entities/vote.entity';
import { OptionService } from '../option/option.service';
import { Badge } from '../badge/entities/badge.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Tag, Moderator, Poll, Report, User, Option, Like, Comment, Ranking, Vote, Badge])],
  controllers: [TagController],
  providers: [TagService, ModeratorService, PollService, PollRepository, UserService, Pinecone, RankingService, VoteService, BadgeService, OptionService],
  exports: [TagService],
})
export class TagModule {}
