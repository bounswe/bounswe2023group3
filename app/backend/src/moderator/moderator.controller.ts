import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateModeratorDto } from './dto/create_moderator.dto';
import { VerifyModeratorDto } from './dto/verify_moderator.dto';
import { ModeratorGuard } from './guards/moderator.guard';
import { VerificationModeratorGuard } from './guards/verification-moderator.guard';
import { ApproveDTO } from './dto/approve.dto';
import { LoginModeratorDto } from './dto/login-moderator.dto';
import { RegisterResponseDto } from './dto/responses/register-response.dto';
import { LoginResponseDto } from './dto/responses/login-response.dto';
import { GetModeratorResponseDto } from './dto/responses/get-moderator-response.dto';
import { GetPollResponseDto } from '../poll/dto/responses/get-poll-response.dto';
import { GetReportResponseDto } from '../user/dto/responses/get-report.response.dto';
import { Settle } from '../poll/enums/settle.enum';

@ApiBearerAuth()
@Controller('moderator')
@ApiTags('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Moderator is created successfully.', type: RegisterResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({ status: 409, description: 'Moderator already exists.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async createModerator(@Body() createModeratorDto: CreateModeratorDto): Promise<RegisterResponseDto> {
    return await this.moderatorService.createModerator(createModeratorDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login successful.', type: LoginResponseDto })
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
  public async loginModerator(@Body() loginModeratorDto: LoginModeratorDto): Promise<LoginResponseDto> {
    return await this.moderatorService.loginModerator(loginModeratorDto);
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
  public async verifyModerator(@Body() verifyModeratorDto: VerifyModeratorDto) {
    return await this.moderatorService.verifyModerator(verifyModeratorDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Moderators are fetched successfully.', type: [GetModeratorResponseDto] })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })

  public async findAll(): Promise<GetModeratorResponseDto[]> {
    return await this.moderatorService.findAll();
  }

  @UseGuards(ModeratorGuard, VerificationModeratorGuard)
  @Get('polls')
  @ApiResponse({ status: 200, description: 'Polls are fetched successfully.', type: [GetPollResponseDto] })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async fetchUnapprovedPolls(): Promise<GetPollResponseDto[]> {
    return await this.moderatorService.fetchUnapprovedPolls();
  }
  
  @ApiQuery({ name: 'is_settled', required: false, description: '0: ACTIVE, 1: PENDING, 2: SETTLED, 3: CANCELLED' })
  @UseGuards(ModeratorGuard, VerificationModeratorGuard)
  @Get('polls/query')
  public async fetchQueryPolls(
    @Query('is_settled', new ParseIntPipe({ optional: true }))
    is_settled?: Settle,
  ): Promise<GetPollResponseDto[]> {
    return await this.moderatorService.fetchQueryPolls(is_settled);
  }

  @UseGuards(ModeratorGuard, VerificationModeratorGuard)
  @Get('reports')
  @ApiResponse({ status: 200, description: 'Reports are fetched successfully.', type: [GetReportResponseDto] })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async fetchReports(): Promise<GetReportResponseDto[]> {
    return await this.moderatorService.fetchReports();
  }

  @UseGuards(ModeratorGuard, VerificationModeratorGuard)
  @Put('reports/:reportId')
  @ApiResponse({ status: 200, description: 'User is banned successfully.' })
  @ApiResponse({ status: 404, description: 'User is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async banUser(@Param('reportId') reportId: string) {
    return await this.moderatorService.banUser(reportId);
  }


  @Get(':id')
  @ApiResponse({ status: 200, description: 'Moderator is fetched successfully.', type: GetModeratorResponseDto })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async findOne(@Param('id') id: string): Promise<GetModeratorResponseDto> {
    return await this.moderatorService.findOneById(id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Moderator is deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Moderator is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async remove(@Param('id') id: string) {
    return await this.moderatorService.removeById(id);
  }

  @UseGuards(ModeratorGuard, VerificationModeratorGuard)
  @Post('approve/:id')
  @ApiResponse({ status: 200, description: 'Poll is approved successfully.' })
  @ApiResponse({ status: 404, description: 'Poll is not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async approve(@Param('id') id : string, @Body() approveDto: ApproveDTO){
    return await this.moderatorService.approve_disapprove(id,approveDto);
  }


}
