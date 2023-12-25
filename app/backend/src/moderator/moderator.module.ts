import { Module } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ModeratorController } from './moderator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moderator } from './entities/moderator.entity';
import { Poll } from '../poll/entities/poll.entity';
import { JwtModule } from '@nestjs/jwt';
import { Report } from '../user/entities/report.entity';
import { User } from '../user/entities/user.entity';
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
import { Option } from '../option/entities/option.entity';
import { Tag } from '../tag/entities/tag.entity';
import { TagService } from '../tag/tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Moderator, Poll, Report, User, Like, Option, Badge, Vote, Ranking, Comment, Tag]),
    JwtModule.register({
      global: true,
      secret: 'very-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ModeratorController],
  providers: [ModeratorService, PollService, PollRepository, OptionService, UserService, Pinecone, RankingService, VoteService, BadgeService, TagService],
})
export class ModeratorModule {}
