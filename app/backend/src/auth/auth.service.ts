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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const users = await this.userService.searchUser({ email });
    if (!users.length) {
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
}
