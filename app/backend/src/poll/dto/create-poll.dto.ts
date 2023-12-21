import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsLowercase, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePollDto {
  @ApiProperty({
    example:
      'Who will be the champion of the Turkish Football Super League in the 2023-2024 Season?',
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    example: 'Some description',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: ['soccer', 'champions league'],
  })
  @IsArray()
  @IsLowercase({ each: true })
  @ArrayNotEmpty()
  tags: Array<string>;

  @ApiProperty({
    example: ['Fenerbahçe', 'Galatasaray', 'Beşiktaş', 'Another Team'],
  })
  @IsArray()
  @ArrayNotEmpty()
  options: Array<string>;

  @ApiProperty({
    example: '2023-05-19T15:23:46.789Z',
  })
  @IsNotEmpty()
  due_date: Date;

  @ApiProperty({
    example: '[url-of-picture.com]',
  })
  image_urls: string[];
}
