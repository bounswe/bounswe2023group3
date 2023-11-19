import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerificationGuard } from '../auth/guards/verification.guard';

@ApiBearerAuth()
@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @UseGuards(AuthGuard, VerificationGuard)
  @Post()
  create(@Body() createPollDto: CreatePollDto, @Req() request: any) {
    return this.pollService.createPoll({
      ...createPollDto,
      creator: request.user.id,
    });
  }

  @Get()
  findAll() {
    return this.pollService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pollService.findPollById(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pollService.removeById(id);
  }
}
