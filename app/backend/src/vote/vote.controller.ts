import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerificationGuard } from '../auth/guards/verification.guard';

@Controller('vote')
@ApiBearerAuth()
@ApiTags('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @ApiResponse({ status: 200, description: 'User has votes succesfully.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @UseGuards(AuthGuard, VerificationGuard)
  @Post()
  create(@Body() createVoteDto: CreateVoteDto,@Req() request: any) {
    return this.voteService.create(createVoteDto,request.user.id);
  }

  @ApiResponse({ status: 200, description: 'Votes are fetched succesfully' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get()
  findAll() {
    return this.voteService.findAll();
  }

  @Get(':pollID')
  getVoteRate(@Param('pollID') id: string) {
    return this.voteService.getVoteRate(id);
  }

}
