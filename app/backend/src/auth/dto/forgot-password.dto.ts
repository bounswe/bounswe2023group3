import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'test1@denrox.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
