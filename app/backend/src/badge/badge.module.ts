import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './entities/badge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  controllers: [BadgeController],
  providers: [BadgeService],
})
export class BadgeModule {}
