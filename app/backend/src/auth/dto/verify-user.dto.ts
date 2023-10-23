import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyUserDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'test1@denrox.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 1234,
  })
  @IsNumber()
  verificationCode: number;
}
