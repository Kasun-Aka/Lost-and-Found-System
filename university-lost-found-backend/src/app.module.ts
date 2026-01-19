import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LostItemsModule } from './lost-items/lost-items.module';

@Module({
  imports: [LostItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
