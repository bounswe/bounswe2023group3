import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../user/entities/user.entity';

export class GetReportResponseDto {
  @ApiProperty({
    format: 'uuid',
    example: 'f9b9a7d1-8e5a-4e3e-8f0a-7f0a8e5a4e3e',
  })
  id: string;

  @ApiProperty({
    example: 'abuse'
  })
  reason: string;

  @ApiProperty({
    example: {
        id: 'f9b9a7d1-8e5a-4e3e-8f0a-7f0a8e5a4e3e',
        email: 'test@example.com',
        username: 'test',
        isVerified: false,
        password: '$2b$1gldfkglşfd',
        verification_code: 1234,
        reset_password_token: 1234
        }
    })
  reporter: User;

  @ApiProperty({
    example: {
        id: 'f9b9a7d1-8e5a-4e3e-8f0a-7f0a8e5a4e3e',
        email: 'test@example.com',
        username: 'test',
        isVerified: false,
        password: '$2b$1gldfkglşfd',
        verification_code: 1234,
        reset_password_token: 1234
        }
    })
  reported: User;

    @ApiProperty({
        example: '2021-04-24T18:25:43.511Z'
    })
    creation_date: Date;

    @ApiProperty({
        example: '2021-04-24T18:25:43.511Z'
    })
    resolved_date: Date;

    @ApiProperty({
        example: true
    })
    resolution: boolean;
}
