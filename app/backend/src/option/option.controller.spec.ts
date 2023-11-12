import { Test, TestingModule } from '@nestjs/testing';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';

describe('OptionController', () => {
  let controller: OptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionController],
      providers: [OptionService],
    }).compile();

    controller = module.get<OptionController>(OptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
