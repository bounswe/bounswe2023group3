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


@Module({
  imports: [TypeOrmModule.forFeature([Tag, Moderator, Poll, Report, User])],
  controllers: [TagController],
  providers: [TagService, ModeratorService],
  exports: [TagService],
})
export class TagModule {}
