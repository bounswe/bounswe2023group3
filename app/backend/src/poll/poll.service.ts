import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { Poll } from './entities/poll.entity';
import { Tag } from './entities/tag.entity';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll) private readonly pollRepository: Repository<Poll>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}
  public async createPoll(poll: CreatePollDto) {
    const tags = poll.tags;
    const options = poll.options;
    const createdPoll = await this.pollRepository.save({
      question: poll.question,
      creator: poll.creator,
    });
    console.log(createdPoll);

    const tagPromises = tags.map(async (tagName) => {
      const tag = this.tagRepository.create({
        name: tagName,
        poll: createdPoll,
      });
      return this.tagRepository.save(tag);
    });

    console.log('Created Poll: ', createdPoll);

    const optionPromises = options.map(async (optionText) => {
      const option = this.optionRepository.create({
        answer: optionText,
        poll: createdPoll,
      });
      return this.optionRepository.save(option);
    });

    // Use Promise.all to wait for all tag and option creations
    await Promise.all([Promise.all(tagPromises), Promise.all(optionPromises)]);

    return await this.pollRepository.save(createdPoll);
  }

  public async findAll(): Promise<Poll[]> {
    return await this.pollRepository.find();
  }

  public async findPollById(id: string): Promise<Poll> {
    return await this.pollRepository.findOneBy({ id });
  }

  public async removeById(id: string): Promise<void> {
    await this.pollRepository.delete(id);
  }
}
