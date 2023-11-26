import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../user/entities/user.entity';

export class FetchLikeResponseDto {
    @ApiProperty({
        example: '1a1b47e8-5c4e-4c93-a63a-5f7c9843b03d',
    })
    id: string;

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
    creator: User;
}
