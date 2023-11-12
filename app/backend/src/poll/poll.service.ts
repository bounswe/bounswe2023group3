import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Repository } from 'typeorm';
import { Option } from '../option/entities/option.entity';
import { Tag } from '../tag/entities/tag.entity';
import { CreatePollDto } from './dto/create-poll.dto';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll) private readonly pollRepository: Repository<Poll>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  public async createPoll(createPollDto: CreatePollDto): Promise<Poll> {
    const poll = new Poll();
    poll.question = createPollDto.question;
    poll.creator = createPollDto.creator;
    poll.moderator = 'moderator';

    // Save the poll first to generate the ID
    const savedPoll = await this.pollRepository.save(poll);

    // Create and associate options with the saved poll
    const options = createPollDto.options.map((option) => {
      const newOption = new Option();
      newOption.answer = option;
      newOption.poll = savedPoll;
      return newOption;
    });

    // Save the options
    await this.optionRepository.save(options);

    // If you want to associate tags with the poll, you can do it here
    // Assuming createPollDto.tags is an array of tag names
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

    // Associate tags with the poll
    savedPoll.tags = tags;

    // Save the poll again to update the associations
    return await this.pollRepository.save(savedPoll);
  }

  public async findAll(): Promise<Poll[]> {
    return await this.pollRepository.find({
      relations: ['options', 'tags', 'creator'],
    });
  }

  public async findPollById(id: string): Promise<Poll> {
    return await this.pollRepository.findOne({
      where: { id },
      relations: ['options', 'tags', 'creator'],
    });
  }

  public async removeById(id: string): Promise<void> {
    await this.pollRepository.delete(id);
  }
}
