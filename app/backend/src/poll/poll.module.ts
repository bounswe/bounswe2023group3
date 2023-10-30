import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { Poll } from './entities/poll.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, Tag, Option])],
  controllers: [PollController],
  providers: [PollService],
  exports: [PollService],
})
export class PollModule {}
