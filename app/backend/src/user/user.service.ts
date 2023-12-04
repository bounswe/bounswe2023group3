import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, FollowUserDto } from './dto/create-user.dto';
import { BadgeService } from '../badge/badge.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly badgeService: BadgeService,
  ) {}
  public async searchUser(params: { email: string }): Promise<User[]> {
    return await this.userRepository.findBy(params);
  }

  public async searchUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username: username },
      relations: ['polls', 'badges', 'followings', 'followers'],
      select: [
        'id',
        'email',
        'username',
        'firstname',
        'lastname',
        'polls',
        'badges',
        'followers',
        'followings',
        'profile_picture'
      ],
    });
  }

  public async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ['polls', 'badges', 'followings', 'followers'],
      select: [
        'id',
        'email',
        'username',
        'firstname',
        'lastname',
        'polls',
        'badges',
        'followers',
        'followings',
        'profile_picture'
      ],
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
      relations: ['polls', 'badges', 'followings', 'followers'],
      select: [
        'id',
        'email',
        'username',
        'polls',
        'badges',
        'followers',
        'followings',
        'firstname',
        'lastname',
        'profile_picture'
      ],
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

  public async followUser(followDto: FollowUserDto, id: string): Promise<void> {
    if (followDto.followerUserID === id) {
      throw new ConflictException('Users cannot follow themselves');
    }
    const authUser: User = await this.userRepository.findOne({
      where: { id: id },
      relations: ['followings'],
    });
    const userToBeFollowed: User = await this.userRepository.findOne({
      where: { id: followDto.followerUserID },
    });
    if (!userToBeFollowed) {
      throw new ConflictException('There is no such user');
    }
    authUser.followings = authUser.followings ?? [];
    const exist = authUser.followings.findIndex(
      (user) => user.id === followDto.followerUserID,
    );

    if (exist !== -1) {
      throw new ConflictException('Already following');
    }
    authUser.followings.push(userToBeFollowed);
    await this.userRepository.save(authUser);
  }

  public async unfollowUser(
    followDto: FollowUserDto,
    id: string,
  ): Promise<void> {
    const authUser: User = await this.userRepository.findOne({
      where: { id: id },
      relations: ['followings'],
    });
    authUser.followings = authUser.followings ?? [];
    const indexToRemove = authUser.followings.findIndex(
      (user) => user.id === followDto.followerUserID,
    );
    if (indexToRemove === -1) {
      throw new ConflictException('Currently not following');
    }
    authUser.followings.splice(indexToRemove, 1);
    await this.userRepository.save(authUser);
  }

  public async updateById(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, updateUserDto);
  }

  public async updatePassword(user: User, password: string): Promise<void> {
    user.password = password;
    await this.userRepository.save(user);
  }

  public async removeById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  public async addBadge(id: string, name: string): Promise<void> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new ConflictException('User not found');
    }
    const badge = await this.badgeService.findOneBy(name);
    if (!badge) {
      throw new ConflictException('Badge not found');
    }
    user.badges = user.badges ?? [];
    if (user.badges.find((badge) => badge.name === name)) {
      throw new ConflictException('User already has this badge');
    }
    user.badges.push(badge);
    await this.userRepository.save(user);
  }

  public generateCode(): number {
    return Math.floor(Math.random() * 9000 + 1000);
  }
}
