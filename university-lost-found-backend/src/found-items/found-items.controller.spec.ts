import { Test, TestingModule } from '@nestjs/testing';
import { FoundItemsController } from './found-items.controller';

describe('FoundItemsController', () => {
  let controller: FoundItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoundItemsController],
    }).compile();

    controller = module.get<FoundItemsController>(FoundItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
