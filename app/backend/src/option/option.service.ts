import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  public async create(createOptionDto: CreateOptionDto): Promise<Option> {
    const createdOption = this.optionRepository.create(createOptionDto);
    return await this.optionRepository.save(createdOption);
  }

  public async findAll(): Promise<Option[]> {
    return await this.optionRepository.find({
      relations: ['poll'],
    });
  }

  public async findOne(id: string): Promise<Option> {
    return await this.optionRepository.findOne({
      where: { id },
      relations: ['poll'],
    });
  }

  public async remove(id: string): Promise<void> {
    await this.optionRepository.delete(id);
  }

  public async removeAll(): Promise<void> {
    await this.optionRepository.clear();
  }
}
