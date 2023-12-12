import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({
      minLength: 6,
      example: 'johnDoe',
      uniqueItems: true,
    })
    @IsString()
    @MinLength(6)
    @IsOptional()
    username?: string;
  
    @ApiProperty({
        minLength: 2,
        example: 'John',
    })
    @IsString()
    @IsOptional()
    firstname?: string;
  
    @ApiProperty({
        minLength: 2,
        example: 'Doe',
    })
    @IsString()
    @IsOptional()
    lastname?: string;

    @ApiProperty({
        example: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    })
    @IsString()
    @IsOptional()
    profile_picture?: string;
  }