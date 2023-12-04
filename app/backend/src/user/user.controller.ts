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

import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FollowUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VerificationGuard } from '../auth/guards/verification.guard';
import { AddBadgeDto } from './dto/add-badge.dto';
import { GetUserResponseDto } from './dto/responses/get-user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, description: 'Users are fetched successfully.', type: [GetUserResponseDto] })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get()
  public async findAll(): Promise<GetUserResponseDto[]> {
    return await this.userService.findAll();
  }

  @ApiResponse({ status: 200, description: 'User is fetched successfully.', type: GetUserResponseDto })
  @ApiResponse({ status: 404, description: 'User is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<GetUserResponseDto> {
    return await this.userService.findUserById(id);
  }

  @ApiResponse({ status: 200, description: 'User is fetched successfully.', type: GetUserResponseDto })
  @ApiResponse({ status: 404, description: 'User is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Get('username/:username')
  public async findOneByUsername(@Param('username') username: string): Promise<GetUserResponseDto> {
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
  public async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.removeById(id);
  }

  @ApiResponse({ status: 201, description: 'User follow request successfull.' })
  @ApiResponse({ status: 404, description: 'User is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @UseGuards(AuthGuard, VerificationGuard)
  @Post('/follow')
  public async followUser(@Body() followUserDto: FollowUserDto,@Req() request: any) {
    return await this.userService.followUser(followUserDto,request.user.id);
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
  public async unfollowUser(@Body() followUserDto: FollowUserDto,@Req() request: any) {
    return await this.userService.unfollowUser(followUserDto,request.user.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Add badge request successful.',
  })
  @ApiResponse({ status: 404, description: 'User is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Put('badge/:id')
  public async addBadge(@Param('id', ParseUUIDPipe) id: string, @Body() addBadgeDto: AddBadgeDto ) {
    return await this.userService.addBadge(id, addBadgeDto.name);
  }

  
  @ApiResponse({
    status: 200,
    description: 'Update user request successful.',
  })
  @ApiResponse({ status: 404, description: 'User is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Put()
  @UseGuards(AuthGuard, VerificationGuard)
  public async update(@Req() request: any, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateById(request.user.id, updateUserDto);
  }


}
