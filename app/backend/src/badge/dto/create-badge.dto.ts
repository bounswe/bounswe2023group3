import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBadgeDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'Freshman',
  })
  @IsNotEmpty()
  name: string;
}
