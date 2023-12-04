import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { IsNull, Repository } from 'typeorm';
import { Option } from '../option/entities/option.entity';
import { Tag } from '../tag/entities/tag.entity';
import { PollRepository } from './repository/poll.repository';
import { User } from '../user/entities/user.entity';
import { Settle } from './enums/settle.enum';
import { SettlePollRequestDto } from './dto/settle-poll-request.dto';
import { Like } from '../like/entities/like.entity';

@Injectable()
export class PollService {
  constructor(
    private readonly pollRepository: PollRepository,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  public async createPoll(createPollDto: any): Promise<Poll> {
    const poll = new Poll();
    poll.question = createPollDto.question;
    poll.description = createPollDto.description;
    poll.creator = createPollDto.creator;
    poll.due_date = createPollDto.due_date;
    const savedPoll = await this.pollRepository.save(poll);

    const options = createPollDto.options.map((option) => {
      const newOption = new Option();
      newOption.answer = option;
      newOption.poll = savedPoll;
      return newOption;
    });

    await this.optionRepository.save(options);

    const tags = await Promise.all(
      createPollDto.tags.map(async (tagName) => {
        let tag = await this.tagRepository.findOneBy({ name: tagName });

        if (!tag) {
          tag = new Tag();
          tag.name = tagName;
          await this.tagRepository.save(tag);
        }

        return tag;
      }),
    );

    savedPoll.tags = tags;

    return await this.pollRepository.save(savedPoll);
  }

  public async settleRequest(
    user: User,
    id: string,
    settlePollDto: SettlePollRequestDto,
  ): Promise<void> {
    const poll = await this.pollRepository.findOne({
      where: { id, creator: { id: user.id } },
      relations: ['options', 'outcome'],
    });

    if (!poll) {
      throw new NotFoundException('Poll not found.');
    }

    if (poll.is_settled !== Settle.ACTIVE) {
      throw new BadRequestException('Poll is not eligible to be settled.');
    }

    if (poll.due_date < new Date()) {
      throw new BadRequestException('Due date is passed.');
    }
    const option = await this.optionRepository.findOne({
      where: { answer: settlePollDto.outcome },
    });

    if (!option) {
      throw new BadRequestException('Outcome option not found.');
    }

    poll.outcome = option;
    poll.outcome_source = settlePollDto.outcome_source;
    poll.is_settled = Settle.PENDING;
    await this.pollRepository.save(poll);
  }

  public async settlePoll(id: string, decision: boolean): Promise<void> {
    const poll = await this.pollRepository.findOne({
      where: { id },
      relations: ['options', 'outcome'],
    });

    if (!poll) {
      throw new NotFoundException('Poll not found.');
    }

    if (poll.is_settled !== Settle.PENDING) {
      throw new BadRequestException('Poll is not eligible to be settled.');
    }

    const option = poll.options.find((option) => option.id === poll.outcome.id);

    if (!option) {
      throw new BadRequestException('Outcome option not found.');
    }

    if (decision) {
      poll.is_settled = Settle.SETTLED;
    } else {
      poll.is_settled = Settle.CANCELLED;
    }

    await this.pollRepository.save(poll);
  }

  public async findAll({
    creatorId,
    approveStatus,
    likedById,
    followedById,
  }): Promise<Poll[]> {
    return await this.pollRepository.findAll({
      creatorId,
      approveStatus,
      likedById,
      followedById,
    });
  }

  public async findPolls(creatorId : string, approveStatus: boolean){
    return await this.pollRepository.find({
      where:{
        approveStatus: approveStatus ?? IsNull(),
        creator : {
          id : creatorId
        }
      },
      relations: ['options', 'tags', 'creator', 'outcome'],
    })
  }

  public async findPollById(id) {
    return await this.pollRepository.findOne({
      where: { id },
      relations: ['options', 'tags', 'creator', 'outcome'],
    });
  }

  async findLikeCount(pollID: string): Promise<number> {
    return await this.likeRepository.count({
      where: { poll: { id: pollID } },
      relations: ['user'],
    });
  }

  public async removeById(id: string): Promise<void> {
    await this.pollRepository.delete(id);
  }
}
