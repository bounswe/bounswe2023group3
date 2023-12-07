import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class ApproveDTO {
    @ApiProperty({
      example: 'false',
    })
    @IsBoolean()
    @IsNotEmpty()
    approveStatus: boolean;

    @ApiProperty({
      example: 'not a precise poll',
    })
    poll_request_rejection_feedback: string;

  }