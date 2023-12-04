import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeService } from '../badge/badge.service';
import { Badge } from '../badge/entities/badge.entity';
import { Report } from './entities/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Badge, Report])],
  controllers: [UserController],
  providers: [UserService, BadgeService],
  exports: [UserService],
})
export class UserModule {}
