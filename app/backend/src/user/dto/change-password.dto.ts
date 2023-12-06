import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty({
      example: 'oldPassword',
    })
    @IsString()
    oldPassword: string;
  
    @ApiProperty({
        example: 'password',
    })
    @IsString()
    password: string;
  
    @ApiProperty({
        example: 'password',
    })
    @IsString()
    passwordConfirm: string;

}