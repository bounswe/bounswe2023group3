import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetBadgeResponseDto {
    @ApiProperty({
        uniqueItems: true,
        example: 'Freshman',
    })
    @IsNotEmpty()
    name: string;
    @ApiProperty({
        example: '1a1b47e8-5c4e-4c93-a63a-5f7c9843b03d',
    })
    id: string;
}
