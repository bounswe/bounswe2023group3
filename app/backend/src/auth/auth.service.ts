import { Injectable, UnauthorizedException, NotFoundException  } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Not } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const users = await this.userService.searchUser({email});
    if (!users) {
      throw new NotFoundException('User not found');
    }
    if (users[0].password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: users[0].id, username: users[0].username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const users = await this.userService.searchUser({email: createUserDto.email});
    if (users.length > 0) {
      throw new UnauthorizedException('User already exists');
    }
    await this.userService.createUser(createUserDto);
    const newUser = await this.userService.searchUser({email: createUserDto.email});
    const payload = { sub: newUser[0].id, username: newUser[0].username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}