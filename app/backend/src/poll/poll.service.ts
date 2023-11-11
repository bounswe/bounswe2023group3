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
    @InjectRepository(Option) private readonly optionRepository: Repository<Option>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}


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
