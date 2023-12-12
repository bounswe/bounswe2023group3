import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SettlePollRequestDto {
    @ApiProperty({
        example: 'Besiktas',
    })
    @IsString()
    @IsNotEmpty()
    outcome: string;

    @ApiProperty({
        format: 'url',
        example: 'https://www.google.com',
    })
    @IsString()
    @IsNotEmpty()
    outcome_source: string;
}

export class SettlePollDto {
    @ApiProperty({
        example: true,
    })
    @IsNotEmpty()
    decision: boolean;

    @ApiProperty({
        example: "not a good to time to settle it",
    })
    settle_poll_request_feedback: string;
}
