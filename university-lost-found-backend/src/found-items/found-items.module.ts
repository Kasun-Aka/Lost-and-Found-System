import { Module } from '@nestjs/common';
import { FoundItemsService } from './found-items.service';
import { FoundItemsController } from './found-items.controller';

@Module({
  controllers: [FoundItemsController],
  providers: [FoundItemsService]
})
export class FoundItemsModule {}
