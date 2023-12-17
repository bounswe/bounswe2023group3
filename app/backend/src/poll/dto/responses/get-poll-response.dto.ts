import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../../../tag/entities/tag.entity';
import { Option } from '../../../option/entities/option.entity';
import { User } from '../../../user/entities/user.entity';

export class GetPollResponseDto {
  @ApiProperty({
    example: {
      id: 'f9b9a7d1-8e5a-4e3e-8f0a-7f0a8e5a4e3e',
    },
  })
  id: string;
  @ApiProperty({
    example: 'Who will win?',
  })
  question: string;

  @ApiProperty({
    example: 'Some description?',
  })
  description: string;

  @ApiProperty({
    example: null,
  })
  outcome: string;
  @ApiProperty({
    example: 'https://www.google.com/search?q=besiktas',
  })
  outcome_source: string;
  @ApiProperty({
    format: 'date',
    example: '2021-04-24T18:25:43.511Z',
  })
  creation_date: Date;
  @ApiProperty({
    format: 'date',
    example: '2021-04-24T18:25:43.511Z',
  })
  due_date: Date;
  @ApiProperty({
    example: '0',
  })
  like_count: number;
  @ApiProperty({
    example: '0',
  })
  comment_count: number;
  @ApiProperty({
    example: '0',
  })
  vote_count: number;
  @ApiProperty({
    example: false,
  })
  approveStatus: boolean;
  @ApiProperty({
    example: 0,
  })
  is_settled: number;
  @ApiProperty({
    example: [
      {
        id: '1a1b47e8-5c4e-4c93-a63a-5f7c9843b03d',
        name: 'Besiktas',
      },
    ],
  })
  options: Option[];
  @ApiProperty({
    example: [
      {
        id: '1a1b47e8-5c4e-4c93-a63a-5f7c9843b03d',
        name: 'Freshman',
      },
    ],
  })
  tags: Tag[];
  @ApiProperty({
    example: {
      id: 'f9b9a7d1-8e5a-4e3e-8f0a-7f0a8e5a4e3e',
      email: 'test@example.com',
      username: 'test',
      isVerified: false,
      password: '$2b$1gldfkglşfd',
      verification_code: 1234,
      reset_password_token: 1234,
    },
  })
  creator: User;
  @ApiProperty({
    example: true,
  })
  didLike: boolean;
}
