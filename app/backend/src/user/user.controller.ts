import {
  Controller,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FollowUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerificationGuard } from '../auth/guards/verification.guard';
import { AddBadgeDto } from './dto/add-badge.dto';

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

  @Get('username/:username')
  async findOneByUsername(@Param('username') username: string) {
    const user = await this.userService.searchUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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
  @UseGuards(AuthGuard, VerificationGuard)
  @Post('/follow')
  followUser(@Body() followUserDto: FollowUserDto,@Req() request: any) {
    return this.userService.followUser(followUserDto,request.user.id);
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
  @UseGuards(AuthGuard, VerificationGuard)
  @Post('/unfollow')
  unfollowUser(@Body() followUserDto: FollowUserDto,@Req() request: any) {
    return this.userService.unfollowUser(followUserDto,request.user.id);
  }

  @Put('badge/:id')
  addBadge(@Param('id', ParseUUIDPipe) id: string, @Body() addBadgeDto: AddBadgeDto ) {
    return this.userService.addBadge(id, addBadgeDto.name);
  }


}
