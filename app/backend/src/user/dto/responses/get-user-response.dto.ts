import { ApiProperty } from '@nestjs/swagger';
import { Badge } from '../../../badge/entities/badge.entity';
import { Poll } from '../../../poll/entities/poll.entity';
import { User } from '../../../user/entities/user.entity';

export class GetUserResponseDto {
  @ApiProperty({
    format: 'uuid',
    example: 'f9b9a7d1-8e5a-4e3e-8f0a-7f0a8e5a4e3e',
  })
  id: string;

  @ApiProperty({
    example: 'test@example.com'
  })
  email: string;

  @ApiProperty({
    example: 'test'
  })
  username: string;

  @ApiProperty({
    example: [
      {
        id: 'f9b9a7d1-8e5a-4e3e-8f0a-7f0a8e5a4e3e',
        question: 'Who will win?',
        outcome: 'Besiktas',
        outcome_source: 'https://www.google.com/search?q=besiktas',
        creation_date: '2021-03-07T13:26:14.000Z',
        due_date: '2021-03-07T13:26:14.000Z',
        like_count: 0,
        comment_count: 0,
        vote_count: 0,
        approveStatus: false,
        is_settled: false,
      }
    ]
  })
  polls: Poll[];


  @ApiProperty({
    example: [
      {
        id: 'f9b9a7d1-8e5a-4e3e-8f0a-7f0a8e5a4e3e',
        name: 'Freshman',
      }
    ]
  })
  badges: Badge[];

  @ApiProperty({
    example: []
  })
  followings: User[];

  @ApiProperty({
    example: []
  })
  followers: User[];

}
