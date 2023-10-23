import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  public async searchUser(params: { email: string }): Promise<User[]> {
    return await this.userRepository.findBy(params);
  }

  public async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async createUser(user: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create(user);
    return await this.userRepository.save(createdUser);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async removeById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
