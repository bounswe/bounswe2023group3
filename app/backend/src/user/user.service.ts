import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, FollowUserDto } from './dto/create-user.dto';

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
    return await this.userRepository.findOne({ 
      where: {id: id},
      relations: ['polls'],
    });
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
    return await this.userRepository.find({
      relations: ['polls','followings'],
    });
  }

  public async verifyUser(email: string): Promise<void> {
    await this.userRepository.update(
      { email },
      {
        isVerified: true,
      },
    );
  }

  public async followUser(followDto: FollowUserDto): Promise<void>{
    
    if(followDto.followerUserID === followDto.followerUserID){
      throw new ConflictException('Users cannot follow themselves');
    }
    let followingUser : User= await this.userRepository.findOne({ 
      where: {id: followDto.followingUserID},

    });
    let followerUser : User = await this.userRepository.findOne({ 
      where: {id: followDto.followerUserID},
      relations:['polls','followings']
    });

    followerUser.followings = followerUser.followings ?? [];
    followerUser.followings.push(followingUser);
    await this.userRepository.save(followerUser);
  }

  public async unfollowUser(followDto: FollowUserDto): Promise<void>{
    
    let followerUser : User = await this.userRepository.findOne({ 
      where: {id: followDto.followerUserID},
      relations:['polls','followings']
    });
    followerUser.followings = followerUser.followings ?? [];
    const indexToRemove = followerUser.followings.findIndex((user) => user.id === followDto.followingUserID);
    if(indexToRemove===-1){
      throw new ConflictException('Currently not following');
    }
    followerUser.followings.splice(indexToRemove, 1);
    await this.userRepository.save(followerUser);
  }

  public async updateById(id: string, updateUserDto: any): Promise<void> {
    await this.userRepository.update(id, updateUserDto);
  }

  public async updatePassword(user: User, password: string): Promise<void> {
    user.password = password;
    await this.userRepository.save(user);
  }

  public async removeById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  public generateCode(): number {
    return Math.floor(Math.random() * 9000 + 1000);
  }
}
