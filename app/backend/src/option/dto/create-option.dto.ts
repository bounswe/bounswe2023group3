import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionDto {
  @ApiProperty({
    example: 'answer',
    description: 'The answer of the option',
    format: 'string',
    minLength: 1,
    maxLength: 255,
  })
  answer: string;
  @ApiProperty({
    example: 'poll_id',
    description: 'The poll id of the option',
    format: 'uuid',
  })
  poll_id: string;
}
