import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../../user/entities/user.entity";

export class RegisterResponseDto {
    @ApiProperty({
        example: {
            "id": "1a1b47e8-5c4e-4c93-a63a-5f7c9843b03d",
            "email": "test1@denrox.com",
            "username": "johnDoe",
            "isVerified": false,
            "password": "$2b$10$hbg.ZAuho9Q.Pi8WE5ZqUONGoS.F8MJaSx2J.0vpit/PEVlWE.B6W",
            "verification_code": 3668,
            "reset_password_token": null
        }
    })
    user: User;

    @ApiProperty({
        example: {
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        }
    })
    access_token: string;
}