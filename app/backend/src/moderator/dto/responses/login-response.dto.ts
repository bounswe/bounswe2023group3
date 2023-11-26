import { ApiProperty } from "@nestjs/swagger";
import { Moderator } from "../../../moderator/entities/moderator.entity";

export class LoginResponseDto {
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
    moderator: Moderator;


    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    })
    access_token: string;
}