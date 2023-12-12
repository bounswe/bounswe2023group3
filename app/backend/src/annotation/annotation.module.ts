import { Module } from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { AnnotationController } from './annotation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annotation } from './entities/annotation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Annotation])],
  controllers: [AnnotationController],
  providers: [AnnotationService],
})
export class AnnotationModule {}
