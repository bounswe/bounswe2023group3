import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { VerificationGuard } from './guards/verification.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/responses/login-response.dto';
import { RegisterResponseDto } from './dto/responses/register-response.dto';
import { GetUserResponseDto } from '../user/dto/responses/get-user-response.dto';

@ApiBearerAuth()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login successful.', type: LoginResponseDto })
  @ApiResponse({
    status: 400,
    description:
      'Wrong credentials or request body lacks some required fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async signIn(@Body() signInDto: LoginDto): Promise<LoginResponseDto>  {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'User is created successfully.', type: RegisterResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async signUp(@Body() signUpDto: CreateUserDto): Promise<RegisterResponseDto> {
    return await this.authService.signUp(signUpDto);
  }

  @Post('verify')
  @ApiResponse({ status: 200, description: 'User is verified successfully.' })
  @ApiResponse({
    status: 400,
    description:
      'Wrong verification code or request body lacks some required fields.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  public async verify(@Body() verifyUserDto: VerifyUserDto) {
    return await this.authService.verifyUser(verifyUserDto);
  }

  @ApiResponse({ status: 200, description: 'User is verified successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Post('forgot-password')
  public async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @ApiResponse({ status: 200, description: 'User is verified successfully.' })
  @ApiResponse({
    status: 400,
    description:
      'Wrong reset password token or request body lacks some required fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  @Post('reset-password')
  public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: GetUserResponseDto,
  })
  @Get('me')
  public async getMe(@Req() request: any): Promise<GetUserResponseDto> {
    return await this.authService.getMe(request.user.id);
  }

  @UseGuards(AuthGuard, VerificationGuard)
  @ApiOkResponse({
    type: GetUserResponseDto,
  })
  @Get('verified-me')
  public async getVerifiedMe(@Req() request: any): Promise<GetUserResponseDto> {
    return await this.authService.getMe(request.user.id);
  }
}
