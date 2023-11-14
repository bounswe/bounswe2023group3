import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
    @ApiProperty({
        uniqueItems: true,
        example: 'Football',
    })
    @IsNotEmpty()
    name: string;
}
