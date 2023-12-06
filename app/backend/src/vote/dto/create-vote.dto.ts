import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVoteDto {
    @ApiProperty({
        example: 'option_id',
        description: 'The id the of option that will be voted',
        format: 'uuid',
      })
    option_id: string;
}