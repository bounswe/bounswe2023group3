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
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
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

  @ApiQuery({ name: 'minLikeCount', required: false })
  @ApiQuery({ name: 'creatorId', required: false })
  @Get()
  findAll(
    @Query('creatorId', new ParseUUIDPipe({ optional: true }))
    creatorId?: string,
    @Query('minLikeCount', new ParseIntPipe({ optional: true }))
    minLikeCount?: number,
  ) {
    return this.pollService.findAll({ creatorId, minLikeCount });
  }

  @ApiQuery({ name: 'minLikeCount', required: false })
  @ApiQuery({ name: 'userId', required: false })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pollService.findPollById(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pollService.removeById(id);
  }
}
