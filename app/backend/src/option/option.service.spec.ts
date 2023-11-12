import { Test, TestingModule } from '@nestjs/testing';
import { OptionService } from './option.service';

describe('OptionService', () => {
  let service: OptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionService],
    }).compile();

    service = module.get<OptionService>(OptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
