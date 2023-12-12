import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AnnotationType } from '../enums/annotation_type.enum';

export class CreateAnnotationDto {
  @ApiProperty({
    enum: AnnotationType,
    description: 'The status of the entity.',
    example: AnnotationType.POLL,
  })
  @IsEnum(AnnotationType, {
    message: 'Invalid type. Must be one of: POLL, OPTION',
  })
  type: AnnotationType;

  @ApiProperty({
    example: '1380f449-fa9b-4340-9851-c5acd7686c59',
  })
  @IsString()
  @IsOptional()
  pollId?: number;

  @ApiProperty({
    example: '268a8f5e-a801-464e-908e-18f74db9d4ba',
  })
  @IsString()
  @IsOptional()
  optionId?: number;

  @ApiProperty({
    example: '12',
  })
  @IsNumber()
  startIndex: number;

  @ApiProperty({
    example: '21',
  })
  @IsNumber()
  lastIndex: number;

  @ApiProperty({
    example:
      "Süleyman Şah Türbesi ile Süleyman Şah Saygı Karakolu ve bulunduğu alan Suriye'nin Halep ilinin Eşme köyü sınırları içerisinde bulunan, Türkiye'nin kendi sınırları dışında sahip olduğu eksklav statüsündeki tek toprak parçasıdır.",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://exampleImageUrl.com/example.jpg',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
