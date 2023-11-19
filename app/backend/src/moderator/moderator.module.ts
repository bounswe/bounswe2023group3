import { Module } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ModeratorController } from './moderator.controller';

@Module({
  controllers: [ModeratorController],
  providers: [ModeratorService],
})
export class ModeratorModule {}
