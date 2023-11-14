import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(createdTag);
  }

  public async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }

  public async findOne(id: string): Promise<Tag> {
    return await this.tagRepository.findOne({ 
      where: {id: id},
    });
  }

  public async remove(id: string): Promise<void> {
    await this.tagRepository.delete(id);
  }
}
