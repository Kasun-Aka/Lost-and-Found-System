import { Controller, Post, Body } from '@nestjs/common';
import { LostItemsService } from './lost-items.service';

@Controller('lost-items')
export class LostItemsController {
  constructor(private readonly lostItemsService: LostItemsService) {}

  @Post()
  create(@Body() body: any) {
    return this.lostItemsService.createLostItem(body);
  }
}
