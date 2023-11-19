import {
  Controller,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FollowUserDto } from './dto/create-user.dto';

@ApiBearerAuth()
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, description: 'Users are fetched successfully.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiResponse({ status: 200, description: 'User is fetched successfully.' })
  @ApiResponse({ status: 404, description: 'User is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findUserById(id);
  }
  @ApiResponse({ status: 200, description: 'User is deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.removeById(id);
  }

  @ApiResponse({ status: 201, description: 'User follow request successfull.' })
  @ApiResponse({ status: 404, description: 'User is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Post('/follow')
  followUser(@Body() followUserDto: FollowUserDto) {
    return this.userService.followUser(followUserDto);
  }


  @ApiResponse({
    status: 201,
    description: 'User unfollow request successfull.',
  })
  @ApiResponse({ status: 404, description: 'User is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Post('/unfollow')
  unfollowUser(@Body() followUserDto: FollowUserDto) {
    return this.userService.unfollowUser(followUserDto);
  }
}
