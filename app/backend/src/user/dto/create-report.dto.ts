import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReportDto {
    @ApiProperty({
      example:
        'abuse',
    })
    @IsString()
    @IsNotEmpty()
    reason: string;
  }
  