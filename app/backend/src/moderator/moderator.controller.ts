import { Controller } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('moderator')
@ApiTags('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}
}
