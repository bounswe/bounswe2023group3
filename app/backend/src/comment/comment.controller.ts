import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerificationGuard } from '../auth/guards/verification.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FetchCommentResponseDto } from './dto/responses/fetchComment.dto';

@Controller('comment')
@ApiTags("comment")
@ApiBearerAuth()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}


  @Get(':pollID')
  @ApiResponse({ status: 201, description: 'Fetched succesfully', type: FetchCommentResponseDto})
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  fetchComments(@Param('pollID') id: string) {
    return this.commentService.fetchLikes(id);
  }
  
  @Post(':pollID')
  @UseGuards(AuthGuard, VerificationGuard)
  @ApiResponse({ status: 201, description: 'Commented on posted successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({ status: 409, description: 'There is no poll with this id' })
  @ApiResponse({ status: 409, description: 'User has already commented on this poll' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  create(@Body() createCommentDto : CreateCommentDto ,@Param('pollID') id: string , @Req() request : any) {
    return this.commentService.create(createCommentDto,id,request.user.id);
  }

  @Delete(':pollID')
  @UseGuards(AuthGuard, VerificationGuard)
  @ApiResponse({ status: 201, description: 'Comment removed successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({ status: 409, description: 'There is no poll with this id' })
  @ApiResponse({ status: 409, description: 'User has not commented on this post' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  remove(@Param('pollID') id: string , @Req() request : any) {
    return this.commentService.remove(id,request.user.id);
  }
}

