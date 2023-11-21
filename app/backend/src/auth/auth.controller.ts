import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { VerificationGuard } from './guards/verification.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login successful.' })
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
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'User is created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Request body lacks some required fields.',
  })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, contact with backend team.',
  })
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
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
  verify(@Body() verifyUserDto: VerifyUserDto) {
    return this.authService.verifyUser(verifyUserDto);
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
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
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
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() request: any) {
    return this.authService.getMe(request.user.id);
  }

  @UseGuards(AuthGuard, VerificationGuard)
  @Get('verified-me')
  getVerifiedMe(@Req() request: any) {
    return this.authService.getMe(request.user.id);
  }
}
