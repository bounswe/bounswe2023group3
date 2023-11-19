import { Controller } from '@nestjs/common';
import { ModeratorService } from './moderator.service';

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}
}
