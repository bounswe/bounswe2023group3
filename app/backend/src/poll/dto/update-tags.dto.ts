import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdateTagsDto {
  @ApiProperty({
    example: ['soccer', 'movie'],
  })
  @IsArray()
  tags: string[];
}
