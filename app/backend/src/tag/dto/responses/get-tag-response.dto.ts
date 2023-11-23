import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetTagResponseDto {
    @ApiProperty({
        uniqueItems: true,
        example: 'Football',
    })
    @IsNotEmpty()
    name: string;
    @ApiProperty({
        example: '1a1b47e8-5c4e-4c93-a63a-5f7c9843b03d',
    })
    id: string;
}
