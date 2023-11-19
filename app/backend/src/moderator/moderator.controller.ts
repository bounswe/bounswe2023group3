import { Controller, Get } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Get()
  fetchUnapprovedPolls() {
    return this.moderatorService.fetchUnapprovedPolls();
  }
}
