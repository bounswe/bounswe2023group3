import { Injectable } from '@nestjs/common';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Badge } from './entities/badge.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
  ) {}

  public async create(createBadgeDto: CreateBadgeDto): Promise<Badge> {
    const createdBadge = this.badgeRepository.create(createBadgeDto);
    return await this.badgeRepository.save(createdBadge);
  }

  public async findAll(): Promise<Badge[]> {
    return await this.badgeRepository.find();
  }

  public async findOne(id: string): Promise<Badge> {
    return await this.badgeRepository.findOne({
      where: { id: id },
    });
  }

  public async findOneBy(name: string): Promise<Badge> {
    return await this.badgeRepository.findOne({
      where: { name: name },
    });
  }

  public async remove(id: string): Promise<void> {
    await this.badgeRepository.delete(id);
  }
}
