import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({
        example: 1234,
    })
    @IsNotEmpty()
    resetPasswordToken: number;

    @ApiProperty({
        example: 'id',
    })
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        example: '123456',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
