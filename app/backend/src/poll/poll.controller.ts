import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollService.createPoll(createPollDto);
  }

  @Get()
  findAll() {
    return this.pollService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pollService.findPollById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pollService.removeById(id);
  }
}
