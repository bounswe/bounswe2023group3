import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { Ranking } from './entities/ranking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteService } from '../vote/vote.service';
import { Vote } from '../vote/entities/vote.entity';
import { User } from '../user/entities/user.entity';
import { Badge } from '../badge/entities/badge.entity';
import { Option } from '../option/entities/option.entity';
import { OptionService } from '../option/option.service';
import { Poll } from '../poll/entities/poll.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ranking,Vote,
      Option,
      User,
      Badge,Poll])
  ],
  controllers: [RankingController],
  providers: [RankingService,VoteService,OptionService],
})
export class RankingModule {}
