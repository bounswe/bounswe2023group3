import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerificationGuard } from '../auth/guards/verification.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get(':pollID')
  // @ApiResponse({ status: 201, description: 'Moderator is created successfully.', type: RegisterResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({ status: 409, description: 'Moderator already exists.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  fetchLikes(@Param('pollID') id: string) {
    return this.likeService.fetchLikes(id);
  }

  @Post(':pollID')
  @UseGuards(AuthGuard, VerificationGuard)
  // @ApiResponse({ status: 201, description: 'Moderator is created successfully.', type: RegisterResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({ status: 409, description: 'Moderator already exists.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  create(@Param('pollID') id: string, @Req() request: any) {
    return this.likeService.create(id, request.user.id);
  }

  @Delete(':pollID')
  @UseGuards(AuthGuard, VerificationGuard)
  remove(@Param('pollID') id: string, @Req() request: any) {
    return this.likeService.remove(id, request.user.id);
  }
}
