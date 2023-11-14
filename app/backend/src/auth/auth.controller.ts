import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { VerificationGuard } from './guards/verification.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('verify')
  verify(@Body() verifyUserDto: VerifyUserDto) {
    return this.authService.verifyUser(verifyUserDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

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
