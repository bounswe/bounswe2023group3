import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { TagService } from '../tag/tag.service';
import { Like } from '../like/entities/like.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Report } from '../user/entities/report.entity';
import { TagModule } from '../tag/tag.module';
import { TokenDecoderMiddleware } from '../auth/middlewares/tokenDecoder.middleware';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { RankingService } from '../ranking/ranking.service';
import { Ranking } from '../ranking/entities/ranking.entity';
import { Vote } from '../vote/entities/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Poll,
      Option,
      Tag,
      User,
      Badge,
      Moderator,
      Like,
      Comment,
      Report,
      Ranking,
      Vote
    ]),
    TagModule,
  ],
  controllers: [PollController],
  providers: [
    PollService,
    UserService,
    PollRepository,
    BadgeService,
    ModeratorService,
    TagService,
    Pinecone,
    GoogleGenerativeAIEmbeddings,
    RankingService
  ],
  exports: [PollService],
})
export class PollModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenDecoderMiddleware)
      .forRoutes(
        { path: '/poll', method: RequestMethod.GET },
        { path: '/poll/:param', method: RequestMethod.GET },
      );
  }
}
