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

@Module({
  imports: [TypeOrmModule.forFeature([Poll, Option, Tag, User])],
  controllers: [PollController],
  providers: [PollService, UserService, PollRepository],
  exports: [PollService],
})
export class PollModule {}
