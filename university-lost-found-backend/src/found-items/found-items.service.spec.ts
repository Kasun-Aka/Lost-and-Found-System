import { Test, TestingModule } from '@nestjs/testing';
import { FoundItemsService } from './found-items.service';

describe('FoundItemsService', () => {
  let service: FoundItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoundItemsService],
    }).compile();

    service = module.get<FoundItemsService>(FoundItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
