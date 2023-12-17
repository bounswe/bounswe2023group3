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
import { Comment } from '../comment/entities/comment.entity';
import { Badge } from '../badge/entities/badge.entity';
import { Option } from '../option/entities/option.entity';
import { UserService } from '../user/user.service';
import { BadgeService } from '../badge/badge.service';
import { Report } from '../user/entities/report.entity';
import { TagModule } from '../tag/tag.module';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { RankingService } from '../ranking/ranking.service';
import { Ranking } from '../ranking/entities/ranking.entity';
import { Vote } from '../vote/entities/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Like,
      Poll,
      Tag,
      User,
      Badge,
      Option,
      Report,
      Comment,
      Ranking,
      Vote
    ]),
    TagModule,
  ],
  controllers: [LikeController],
  providers: [
    LikeService,
    PollService,
    PollRepository,
    UserService,
    BadgeService,
    Pinecone,
    GoogleGenerativeAIEmbeddings,
    RankingService
  ],
})
export class LikeModule {}
