import { Module } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ModeratorController } from './moderator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moderator } from './entities/moderator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Moderator])],
  controllers: [ModeratorController],
  providers: [ModeratorService],
})
export class ModeratorModule {}


