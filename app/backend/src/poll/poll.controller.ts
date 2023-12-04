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
  ParseArrayPipe,
  ConflictException,
  ParseBoolPipe,
} from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerificationGuard } from '../auth/guards/verification.guard';
import { CreatePollResponseDto } from './dto/responses/create-poll-response.dto';
import { GetPollResponseDto } from './dto/responses/get-poll-response.dto';
import {
  SettlePollDto,
  SettlePollRequestDto,
} from './dto/settle-poll-request.dto';
import { ModeratorGuard } from '../moderator/guards/moderator.guard';
import { VerificationModeratorGuard } from '../moderator/guards/verification-moderator.guard';

const statusMap = new Map<string,boolean>();
statusMap.set("pending",null)
statusMap.set("approved",true)
statusMap.set("rejected",false)

@ApiBearerAuth()
@Controller('poll')
@ApiTags('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @UseGuards(AuthGuard, VerificationGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Poll is created successfully.',
    type: CreatePollResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Poll already exists.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async create(
    @Body() createPollDto: CreatePollDto,
    @Req() request: any,
  ): Promise<any> {
    return await this.pollService.createPoll({
      ...createPollDto,
      creator: request.user,
    });
  }

  @UseGuards(AuthGuard, VerificationGuard)
  @Post('settle-request/:id')
  @ApiResponse({
    status: 200,
    description: 'Poll settle request is created successfully.',
  })
  @ApiResponse({ status: 404, description: 'Poll not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async settleRequest(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: any,
    @Body() settlePollDto: SettlePollRequestDto,
  ): Promise<void> {
    return await this.pollService.settleRequest(
      request.user,
      id,
      settlePollDto,
    );
  }

  @UseGuards(ModeratorGuard, VerificationModeratorGuard)
  @Post('settle/:id')
  @ApiResponse({ status: 200, description: 'Poll is settled successfully.' })
  @ApiResponse({ status: 404, description: 'Poll not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async settle(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() settlePollDto: SettlePollDto,
  ): Promise<void> {
    return await this.pollService.settlePoll(id, settlePollDto.decision);
  }

  @ApiQuery({ name: 'creatorId', required: false })
  @ApiQuery({ name: 'approveStatus', required: false })
  @ApiQuery({ name: 'likedById', required: false })
  @ApiQuery({ name: 'followedById', required: false })
  @ApiQuery({ name: 'tags', required: false })
  @ApiResponse({
    status: 200,
    description: 'Polls are fetched successfully.',
    type: [GetPollResponseDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get()
  public async findAll(
    @Query('creatorId', new ParseUUIDPipe({ optional: true }))
    creatorId?: string,
    @Query('approveStatus', new ParseBoolPipe({ optional: true }))
    approveStatus?: string,
    @Query('likedById', new ParseUUIDPipe({ optional: true }))
    likedById?: string,
    @Query('followedById', new ParseUUIDPipe({ optional: true }))
    followedById?: string,
    @Query('tags', new ParseArrayPipe({ optional: true }))
    tags?: Array<string>,
  ): Promise<any> {
    return await this.pollService.findAll({
      creatorId,
      approveStatus,
      likedById,
      followedById,
      tags,
    });
  }

  @UseGuards(AuthGuard, VerificationGuard)
  @ApiQuery({ name: 'likedById', required: false })
  @ApiResponse({
    status: 200,
    description: 'Polls are fetched successfully.',
    type: [GetPollResponseDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get('my-polls')
  public async findMyPolls(@Req() req: any): Promise<any> {
    const creatorId = req.user.id;
    return await this.pollService.findAll({
      creatorId,
      approveStatus: null,
      likedById: null,
      followedById: null,
      tags: null,
    });
  }

  @UseGuards(AuthGuard, VerificationGuard)
  @ApiQuery({ name: 'get poll with filtered status', required: false })
  @ApiResponse({
    status: 200,
    description: 'Polls are fetched successfully.',
    type: [GetPollResponseDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get('my-polls/:status')
  public async findMyPollsWithStatus(@Param('status') status: string, @Req() req: any): Promise<any> {
    if (!statusMap.has(status)) {
      throw new ConflictException( status  + " is not a valid status. Status should be one of these: pending, approved, rejected");
    }
    const creatorId = req.user.id;
    return await this.pollService.findPolls(creatorId,statusMap.get(status));
  }

  @UseGuards(AuthGuard, VerificationGuard)
  @ApiResponse({
    status: 200,
    description: 'Polls are fetched successfully.',
    type: [GetPollResponseDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get('liked-by-me')
  public async findPollsILiked(@Req() req: any): Promise<any> {
    const userId = req.user.id;
    return await this.pollService.findAll({
      creatorId: null,
      approveStatus: null,
      likedById: userId,
      followedById: null,
      tags: null,
    });
  }

  @UseGuards(AuthGuard, VerificationGuard)
  @ApiResponse({
    status: 200,
    description: 'Polls are fetched successfully.',
    type: [GetPollResponseDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get('my-followings')
  public async findPollsOfUsersIFollow(@Req() req: any): Promise<any> {
    const userId = req.user.id;
    return await this.pollService.findAll({
      creatorId: null,
      approveStatus: null,
      likedById: null,
      followedById: userId,
      tags: null,
    });
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Poll is fetched successfully.',
    type: GetPollResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Poll not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
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
