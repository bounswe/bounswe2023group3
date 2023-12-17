import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../../../tag/entities/tag.entity';
import { Option } from '../../../option/entities/option.entity';
import { User } from '../../../user/entities/user.entity';

export class SemanticSearchResponseDto {
  @ApiProperty({
    example: 'Who will be the champion?'
  })
  pageContent: string;
  
  @ApiProperty({
    example: {
        id: 'f9b9a7d1-8e5a-4e3e-8f0a-7f0a8e5a4e3e',
    },
  })
  metaData: {
    id: string;
  };
}
