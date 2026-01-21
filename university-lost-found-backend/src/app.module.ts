import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LostItemsModule } from './lost-items/lost-items.module';
import { FoundItemsController } from './found-items/found-items.controller';
import { FoundItemsService } from './found-items/found-items.service';
import { FoundItemsModule } from './found-items/found-items.module';

@Module({
  imports: [LostItemsModule, FoundItemsModule],
  controllers: [AppController, FoundItemsController],
  providers: [AppService, FoundItemsService],
})
export class AppModule {}
