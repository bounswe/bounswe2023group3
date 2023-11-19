import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { CreateModeratorDto } from './dto/create_moderator.dto';
import { Verify } from 'crypto';
import { VerifyModeratorDto } from './dto/verify_moderator.dto';

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Post("register")
  createModerator (@Body() createModeratorDto: CreateModeratorDto){
    return this.moderatorService.createModerator(createModeratorDto)
  }

  @Post("register/verify")
  verifyModerator (@Body() verifyModeratorDto: VerifyModeratorDto){
    return this.moderatorService.verifyModerator(verifyModeratorDto)
  }
}
