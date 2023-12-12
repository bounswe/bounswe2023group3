import { Injectable } from '@nestjs/common';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annotation } from './entities/annotation.entity';

@Injectable()
export class AnnotationService {
  constructor(
    @InjectRepository(Annotation)
    private readonly annotationRepository: Repository<Annotation>,
  ) {}
  public async create(createAnnotationDto: CreateAnnotationDto) {
    const createdAnnotation =
      this.annotationRepository.create(createAnnotationDto);
    return await this.annotationRepository.save(createdAnnotation);
  }

  public async findAll() {
    return await this.annotationRepository.find({
      relations: ['poll'],
    });
  }

  public async findOne(id: string) {
    return await this.annotationRepository.findOne({
      where: { id },
      relations: ['poll'],
    });
  }

  public async remove(id: string) {
    await this.annotationRepository.delete(id);
  }
}
