import { ApiProperty } from '@nestjs/swagger';

export class GetModeratorResponseDto {
  @ApiProperty({
    format: 'uuid',
    example: 'f9b9a7d1-8e5a-4e3e-8f0a-7f0a8e5a4e3e',
  })
  id: string;

  @ApiProperty({
    example: 'test@example.com'
  })
  email: string;

  @ApiProperty({
    example: 'test'
  })
  username: string;
}
