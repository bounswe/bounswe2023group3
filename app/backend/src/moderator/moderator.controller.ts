import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateModeratorDto } from './dto/create_moderator.dto';
import { VerifyModeratorDto } from './dto/verify_moderator.dto';
import { ModeratorGuard } from './guards/moderator.guard';
import { VerificationGuard } from './guards/verification.guard';
import { ApproveDTO } from './dto/approve.dto';
import { LoginModeratorDto } from './dto/login-moderator.dto';

@ApiBearerAuth()
@Controller('moderator')
@ApiTags('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Moderator is created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({ status: 409, description: 'Moderator already exists.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  createModerator(@Body() createModeratorDto: CreateModeratorDto) {
    return this.moderatorService.createModerator(createModeratorDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login successful.' })
  @ApiResponse({
    status: 400,
    description:
      'Wrong credentials or request body lacks some required fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Moderator not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  loginModerator(@Body() loginModeratorDto: LoginModeratorDto) {
    return this.moderatorService.loginModerator(loginModeratorDto);
  }

  @Post('register/verify')
  @ApiResponse({ status: 200, description: 'Moderator is verified successfully.' })
  @ApiResponse({
    status: 400,
    description:
      'Wrong verification code or request body lacks some required fields.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  verifyModerator(@Body() verifyModeratorDto: VerifyModeratorDto) {
    return this.moderatorService.verifyModerator(verifyModeratorDto);
  }

  @Get()
  findAll() {
    return this.moderatorService.findAll();
  }

  @UseGuards(ModeratorGuard, VerificationGuard)
  @Get('polls')
  fetchUnapprovedPolls() {
    return this.moderatorService.fetchUnapprovedPolls();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moderatorService.findOneById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moderatorService.removeById(id);
  }

  @UseGuards(ModeratorGuard, VerificationGuard)
  @Post('approve/:id')
  approve(@Param('id') id : string, @Body() approveDto: ApproveDTO){
    return this.moderatorService.approve_disapprove(id,approveDto);
  }
}
