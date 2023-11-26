import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddBadgeDto {
  @ApiProperty({
    example: 'Freshman',
  })
  @IsString()
  name: string;
}