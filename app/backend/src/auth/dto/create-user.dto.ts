import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'test1@denrox.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    minLength: 6,
    example: 'test11',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    minLength: 6,
    example: 'johnDoe',
  })
  @IsString()
  @MinLength(6)
  username: string;

  @ApiProperty({
    example: 'John',
  })
  @IsString()
  @IsOptional()
  firstname: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastname?: string;
}
