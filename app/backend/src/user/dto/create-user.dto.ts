import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
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

  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;
}

export class FollowUserDto {
  @ApiProperty({
    example: '3dac5059-03bf-45a2-b0ed-273c75aafedc',
  })
  @IsNotEmpty()
  @IsUUID()
  followerUserID: string;
}
