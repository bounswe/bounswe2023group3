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
} from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerificationGuard } from '../auth/guards/verification.guard';
import { CreatePollResponseDto } from './dto/responses/create-poll-response.dto';
import { GetPollResponseDto } from './dto/responses/get-poll-response.dto';

@ApiBearerAuth()
@Controller('poll')
@ApiTags('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @UseGuards(AuthGuard, VerificationGuard)
  @Post()
  @ApiResponse({ status: 201, description: 'Poll is created successfully.', type: CreatePollResponseDto })
  @ApiResponse({ status: 409, description: 'Poll already exists.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async create(@Body() createPollDto: CreatePollDto, @Req() request: any): Promise<CreatePollResponseDto> {
    return await this.pollService.createPoll({
      ...createPollDto,
      creator: request.user,
    });
  }

  @ApiQuery({ name: 'minLikeCount', required: false })
  @ApiQuery({ name: 'creatorId', required: false })
  @ApiResponse({ status: 200, description: 'Polls are fetched successfully.', type: [GetPollResponseDto] })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get()
  public async findAll(
    @Query('creatorId', new ParseUUIDPipe({ optional: true }))
    creatorId?: string,
    @Query('minLikeCount', new ParseIntPipe({ optional: true }))
    minLikeCount?: number,
  ): Promise<GetPollResponseDto[]> {
    return await this.pollService.findAll({ creatorId, minLikeCount });
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Poll is fetched successfully.', type: GetPollResponseDto })
  @ApiResponse({ status: 404, description: 'Poll not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<GetPollResponseDto> {
    return await this.pollService.findPollById(id);
  }

  @ApiResponse({ status: 200, description: 'Poll deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Poll not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Delete(':id')
  public async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.pollService.removeById(id);
  }
}
