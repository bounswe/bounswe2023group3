import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto): Promise<Tag> {
    createTagDto.name = createTagDto.name.toLowerCase();
    if (await this.tagRepository.findOneBy({ name: createTagDto.name })) {
      throw new BadRequestException('Tag must be unique.');
    }
    const createdTag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(createdTag);
  }

  public async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }

  public async findOne(id: string): Promise<Tag> {
    return await this.tagRepository.findOne({
      where: { id: id },
    });
  }

  public async findOneByName(name: string): Promise<Tag> {
    return await this.tagRepository.findOne({
      where: { name: name },
    });
  }

  public async remove(id: string): Promise<void> {
    await this.tagRepository.delete(id);
  }

  public async getTagIdsFromTagNames(tagNames): Promise<string[]> {
    const tags = await this.tagRepository.find({
      where: { name: In(tagNames) },
    });

    // Extract the ids from the tags array
    const tagIds = tags.map((tag) => tag.id);
    return tagIds;
  }

  public async findByNames(tagNames): Promise<Tag[]> {
    console.log(tagNames);
    const promises = tagNames.map((tagName) => this.findOneByName(tagName));
    const tags = await Promise.all(promises);

    return tags;
  }

  public async removeAll(): Promise<void> {
    await this.tagRepository.delete({});
  }

}
