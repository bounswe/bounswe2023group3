import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";



export class CreateModeratorDto {
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
  }