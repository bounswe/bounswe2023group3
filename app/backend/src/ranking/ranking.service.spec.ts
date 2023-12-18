import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';

describe('RankingService', () => {
  let service: RankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RankingService],
    }).compile();

    service = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
