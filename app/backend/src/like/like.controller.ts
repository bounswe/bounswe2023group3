import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerificationGuard } from '../auth/guards/verification.guard';
import { FetchLikeResponseDto } from './dto/responses/fetchLike.dto';

@Controller('like')
@ApiTags("like")
@ApiBearerAuth()
export class LikeController {
  constructor(private readonly likeService: LikeService) {}


  @Get(':pollID')
  @ApiResponse({ status: 201, description: 'Fetched succesfully', type: FetchLikeResponseDto})
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  fetchLikes(@Param('pollID') id: string) {
    return this.likeService.fetchLikes(id);
  }
  
  @Post(':pollID')
  @UseGuards(AuthGuard, VerificationGuard)
  @ApiResponse({ status: 201, description: 'Posted liked successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({ status: 409, description: 'There is no poll with this id' })
  @ApiResponse({ status: 409, description: 'User has already liked this poll' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  create(@Param('pollID') id: string , @Req() request : any) {
    return this.likeService.create(id,request.user.id);
  }

  @Delete(':pollID')
  @UseGuards(AuthGuard, VerificationGuard)
  @ApiResponse({ status: 201, description: 'Removed liked successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({ status: 409, description: 'There is no poll with this id' })
  @ApiResponse({ status: 409, description: 'User has not liked this post' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  remove(@Param('pollID') id: string , @Req() request : any) {
    return this.likeService.remove(id,request.user.id);
  }
}
