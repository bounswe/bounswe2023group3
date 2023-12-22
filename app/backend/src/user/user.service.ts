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
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly badgeService: BadgeService,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}
  public async searchUser(params: { email: string }): Promise<User[]> {
    return await this.userRepository.findBy(params);
  }

  public async searchUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username: username },
      relations: ['polls', 'badges', 'followings', 'followers','rankings'],
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
        'profile_picture',
        'isBanned',
        'rankings'
      ],
    });
  }

  public async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ['polls', 'badges', 'followings', 'followers','rankings'],
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
        'profile_picture',
        'isBanned'
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
      relations: ['polls', 'badges', 'followings', 'followers','rankings'],
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
        'profile_picture',
        'isBanned',
        'rankings'
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

  public async reportUser(reportedId: string, reportDto: CreateReportDto, reporterId: string) {
    const reportedUser = await this.userRepository.findOne({
      where: { id: reportedId },
    });
    const reporterUser = await this.userRepository.findOne({
      where: { id: reporterId },
    });
    if (!reportedUser || !reporterUser) {
      throw new NotFoundException('User not found');
    }
    const report = this.reportRepository.create({
      reporter: reporterUser,
      reported: reportedUser,
      reason: reportDto.reason,
    });

    return await this.reportRepository.save(report);

  }

  public async changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if(!await user.compareEncryptedPassword(changePasswordDto.oldPassword)) {
      throw new ConflictException('Old password is wrong');
    }
    if(changePasswordDto.oldPassword === changePasswordDto.password) {
      throw new ConflictException('New password cannot be same with old password');
    }
    if(changePasswordDto.password !== changePasswordDto.passwordConfirm) {
      throw new ConflictException('Passwords do not match');
    }
    user.password = changePasswordDto.password;
    await this.userRepository.save(user);
  }

  public async searchUsernames(query: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.username ILIKE :query', { query: `%${query}%` })
      .getMany();
  }

  public generateCode(): number {
    return Math.floor(Math.random() * 9000 + 1000);
  }
}
