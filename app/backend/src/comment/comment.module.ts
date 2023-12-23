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
import { Report } from '../user/entities/report.entity';
import { TagModule } from '../tag/tag.module';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { RankingService } from '../ranking/ranking.service';
import { Ranking } from '../ranking/entities/ranking.entity';
import { Vote } from '../vote/entities/vote.entity';
import { VoteService } from '../vote/vote.service';
import { OptionService } from '../option/option.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Poll, Tag, User, Badge, Option, Comment, Report,Ranking,Vote]),
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
    Pinecone,
    GoogleGenerativeAIEmbeddings,
    RankingService,
    VoteService,
    OptionService
  ],
})
export class CommentModule {}
