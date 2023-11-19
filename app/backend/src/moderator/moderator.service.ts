import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateModeratorDto } from './dto/create_moderator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moderator } from './entities/moderator.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { VerifyModeratorDto } from './dto/verify_moderator.dto';
import { Poll } from '../poll/entities/poll.entity';

@Injectable()
export class ModeratorService {
  constructor(
    @InjectRepository(Moderator)
    private readonly moderatorRepository: Repository<Moderator>,
    @InjectRepository(Poll) private readonly pollRepository: Repository<Poll>,
    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  public async searchModerators(
    searchOne: boolean,
    params,
  ): Promise<Moderator | Moderator[]> {
    if (searchOne) {
      return await this.moderatorRepository.findOne(params);
    } else {
      return await this.moderatorRepository.find(params);
    }
  }

  async createModerator(createModeratorDto: CreateModeratorDto): Promise<any> {
    const moderator = await this.searchModerators(true, {
      where: {
        email: createModeratorDto.email,
      },
    });

    if (moderator) {
      throw new ConflictException('Moderator already exists');
    }

    const moderatorUsername = await this.searchModerators(true, {
      where: {
        username: createModeratorDto.username,
      },
    });

    if (moderatorUsername) {
      throw new ConflictException('Username is already being used');
    }
    const code = this.generateCode();

    const createdModerator = this.moderatorRepository.create({
      verification_code: code,
      ...createModeratorDto,
    });

    await this.moderatorRepository.save(createdModerator);

    this.mailerService
      .sendMail({
        to: createModeratorDto.email, // list of receivers
        from: 'esbatuhanes@gmail.com', // sender address
        subject: 'Verification Code', // Subject line
        text:
          'Here is your verification code: ' +
          createdModerator.verification_code.toString(), // plaintext body
        html: `<b>Here is your verification code: ${createdModerator.verification_code.toString()}</b>`, // HTML body content
      })
      .then(() => console.log('Verification code is sent'))
      .catch((err) => console.log(err));

    const payload = {
      sub: createdModerator.id,
      email: createdModerator.email,
      userType: 1,
    };
    return {
      user: createdModerator,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async verifyModerator(
    verifyModeratorDto: VerifyModeratorDto,
  ): Promise<void> {
    const moderator: Moderator = (await this.searchModerators(true, {
      where: {
        email: verifyModeratorDto.email,
      },
    })) as Moderator;

    if (!moderator) {
      throw new NotFoundException('Moderator not found');
    }
    if (moderator.verification_code !== verifyModeratorDto.verificationCode) {
      throw new BadRequestException('Wrong verification Code');
    }
    await this.moderatorRepository.update(
      { email: verifyModeratorDto.email },
      {
        isVerified: true,
      },
    );
  }

  public async fetchUnapprovedPolls(): Promise<Poll[]> {
    return await this.pollRepository.find({
      where: {
        is_approved_by_moderator: false,
      },
      relations: ['options', 'tags', 'creator'],
    });
  }

  public async findOneById(id: string): Promise<Moderator> {
    return await this.moderatorRepository.findOne({
      where: { id },
    });
  }

  public async findAll(): Promise<Moderator[]> {
    return await this.moderatorRepository.find();
  }

  public async updateById(id: string, updateUserDto: any): Promise<void> {
    await this.moderatorRepository.update(id, updateUserDto);
  }

  public async updatePassword(
    moderator: Moderator,
    password: string,
  ): Promise<void> {
    moderator.password = password;
    await this.moderatorRepository.save(moderator);
  }

  public async removeById(id: string): Promise<void> {
    await this.moderatorRepository.delete(id);
  }

  public generateCode(): number {
    return Math.floor(Math.random() * 9000 + 1000);
  }
}
