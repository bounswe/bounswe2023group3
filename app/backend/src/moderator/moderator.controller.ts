import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateModeratorDto } from './dto/create_moderator.dto';
import { VerifyModeratorDto } from './dto/verify_moderator.dto';
import { ModeratorGuard } from './guards/moderator.guard';
import { VerificationGuard } from './guards/verification.guard';
import { ApproveDTO } from './dto/approve.dto';

@ApiBearerAuth()
@Controller('moderator')
@ApiTags('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Post('register')
  createModerator(@Body() createModeratorDto: CreateModeratorDto) {
    return this.moderatorService.createModerator(createModeratorDto);
  }

  @Post('register/verify')
  verifyModerator(@Body() verifyModeratorDto: VerifyModeratorDto) {
    return this.moderatorService.verifyModerator(verifyModeratorDto);
  }

  @Get()
  findAll() {
    return this.moderatorService.findAll();
  }

  @UseGuards(ModeratorGuard, VerificationGuard)
  @Get('polls')
  fetchUnapprovedPolls() {
    return this.moderatorService.fetchUnapprovedPolls();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moderatorService.findOneById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moderatorService.removeById(id);
  }

  @UseGuards(ModeratorGuard, VerificationGuard)
  @Post('approve/:id')
  approve(@Param('id') id : string, @Body() approveDto: ApproveDTO){
    return this.moderatorService.approve_disapprove(id,approveDto);
  }
}
