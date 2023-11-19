import { Test, TestingModule } from '@nestjs/testing';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';

describe('ModeratorController', () => {
  let controller: ModeratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModeratorController],
      providers: [ModeratorService],
    }).compile();

    controller = module.get<ModeratorController>(ModeratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
