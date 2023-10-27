import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const users = await this.userService.searchUser({ email });
    if (!users) {
      throw new NotFoundException('User not found');
    }
    if (!users[0].compareEncryptedPassword(pass)) {
      throw new BadRequestException('Wrong password');
    }
    const payload = { sub: users[0].id, email: users[0].email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const users = await this.userService.searchUser({
      email: createUserDto.email,
    });
    if (users.length > 0) {
      throw new UnauthorizedException('User already exists');
    }
    await this.userService.createUser(createUserDto);
    const newUser = await this.userService.searchUser({
      email: createUserDto.email,
    });
    this.mailerService
      .sendMail({
        to: createUserDto.email, // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Verification Code', // Subject line
        text: newUser[0].verification_code.toString(), // plaintext body
        html: `<b>${newUser[0].verification_code}</b>`, // HTML body content      
      })
      .then(() => console.log('Verification code is sent'))
      .catch(() => console.log('Verification code is not sent'));
    const payload = { sub: newUser[0].id, email: newUser[0].email };
    return {
      user: newUser[0],
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<any> {
    const user = await this.userService.searchUser({
      email: verifyUserDto.email,
    });

    if (!user[0]) {
      throw new NotFoundException('User not found');
    }
    if (user[0].verification_code !== verifyUserDto.verificationCode) {
      throw new BadRequestException('Wrong verification Code');
    }

    await this.userService.verifyUser(verifyUserDto.email);
    return 'User is verified';
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const user = await this.userService.searchUser({ 
      email: forgotPasswordDto.email,
    });
    if (!user[0]) {
      throw new NotFoundException('User not found');
    }
    const reset_password_token = this.userService.generateCode();
    await this.userService.updateById(user[0].id, { reset_password_token });
    this.mailerService
      .sendMail({
        to: forgotPasswordDto.email, // list of receivers
        from: 'esbatuhanes@gmail.com', // sender address
        subject: 'Reset Password', // Subject line
        text: reset_password_token.toString(), // plaintext body
        html: `<b>${reset_password_token}</b>`, // HTML body content
      })
      .then(() => {})
      .catch(() => {});
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<any> {
    const user = await this.userService.findUserById(resetPasswordDto.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.reset_password_token !== resetPasswordDto.resetPasswordToken) {
      throw new BadRequestException('Wrong reset password token');
    }
    await this.userService.updatePassword(user, resetPasswordDto.password);
    await this.userService.updateById(user.id, { reset_password_token: null });
    return 'Password is reset';
  }

  async getMe(id: string): Promise<any> {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}
