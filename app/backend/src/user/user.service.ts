import { ConflictException, Injectable } from '@nestjs/common';
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

  public async searchUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  public async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async createUser(user: CreateUserDto): Promise<User> {
    const username = await this.searchUserByUsername(user.username);

    if (username) {
      throw new ConflictException('Username is already being used');
    }
    const code = this.generateCode();

    const createdUser = this.userRepository.create({
      verification_code: code,
      ...user,
    });
    return await this.userRepository.save(createdUser);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async verifyUser(email: string): Promise<void> {
    await this.userRepository.update(
      { email },
      {
        isVerified: true,
      },
    );
  }

  public async removeById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  public generateCode(): number {
    return Math.floor(Math.random() * 9000 + 1000);
  }
}