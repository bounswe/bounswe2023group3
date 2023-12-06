import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { Vote } from './entities/vote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionService } from '../option/option.service';
import { Option } from '../option/entities/option.entity';
import { UserService } from '../user/user.service';
import { BadgeService } from '../badge/badge.service';
import { Report } from '../user/entities/report.entity';
import { User } from '../user/entities/user.entity';
import { Badge } from '../badge/entities/badge.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vote,
      Option,
      Report,
      User,
      Badge
    ])
  ],
  controllers: [VoteController],
  providers: [VoteService, OptionService,UserService,BadgeService],
  exports: [VoteService],
})
export class VoteModule {}
