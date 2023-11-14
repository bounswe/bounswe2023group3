import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Option } from '../../option/entities/option.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { User } from '../../user/entities/user.entity';

export class CreatePollDto {
  @ApiProperty({
    example: '3dac5059-03bf-45a2-b0ed-273c75aafedc',
  })
  @IsNotEmpty()
  @IsUUID()
  creator: User;

  @ApiProperty({
    example:
      'Who will be the champion of the Turkish Football Super League in the 2023-2024 Season?',
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    example: ['soccer', 'champions league'],
  })
  @IsArray()
  tags: Array<string>;

  @ApiProperty({
    example: ['Fenerbahçe', 'Galatasaray', 'Beşiktaş', 'Another Team'],
  })
  @IsArray()
  options: Array<string>;

  @ApiProperty({
    example: '2023-05-19T15:23:46.789Z',
  })
  @IsNotEmpty()
  due_date: Date;
}
