import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateModeratorDto } from './dto/create_moderator.dto';
import { Verify } from 'crypto';
import { VerifyModeratorDto } from './dto/verify_moderator.dto';

@ApiBearerAuth()
@Controller('moderator')
@ApiTags('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Get()
  fetchUnapprovedPolls() {
    return this.moderatorService.fetchUnapprovedPolls();
  @Post("register")
  createModerator (@Body() createModeratorDto: CreateModeratorDto){
    return this.moderatorService.createModerator(createModeratorDto)
  }

  @Post("register/verify")
  verifyModerator (@Body() verifyModeratorDto: VerifyModeratorDto){
    return this.moderatorService.verifyModerator(verifyModeratorDto)
  }
}
