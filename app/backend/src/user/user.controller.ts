import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  /*
  Patch,
  Param,
  Delete,
  */
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeById(id);
  }
}
