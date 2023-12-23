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
import { Tag } from '../tag/entities/tag.entity';
import { Report } from '../user/entities/report.entity';
import { UserService } from '../user/user.service';
import { BadgeService } from '../badge/badge.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ranking,Vote,
      Option,
      User,
      Badge,Poll,Tag,Report])
  ],
  controllers: [RankingController],
  providers: [RankingService,VoteService,OptionService,UserService,BadgeService],
})
export class RankingModule {}
