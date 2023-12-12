import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('annotation')
@ApiTags('annotation')
@ApiBearerAuth()
export class AnnotationController {
  constructor(private readonly annotationService: AnnotationService) {}

  @Post()
  public async create(@Body() createAnnotationDto: CreateAnnotationDto) {
    return this.annotationService.create(createAnnotationDto);
  }

  @Get()
  public async findAll() {
    return this.annotationService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.annotationService.findOne(id);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.annotationService.remove(id);
  }
}
