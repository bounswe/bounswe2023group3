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

import { ApiBearerAuth } from '@nestjs/swagger';
import { FollowUserDto } from './dto/create-user.dto';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findUserById(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.removeById(id);
  }

  @Post('/follow')
  followUser(@Body() followUserDto: FollowUserDto) {
    return this.userService.followUser(followUserDto);
  }

  @Post('/unfollow')
  unfollowUser(@Body() followUserDto: FollowUserDto) {
    return this.userService.unfollowUser(followUserDto);
  }
}
