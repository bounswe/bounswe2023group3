import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({
        example:
          'You cannot refer to Galatasaray as 6saray',
      })
      @IsString()
      @IsNotEmpty()
      description: string;
}
