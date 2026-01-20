import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LostItemsService } from './lost-items.service';
import { CreateLostItemDto } from './dto/create-lost-item.dto';

@Controller('lost-items')
export class LostItemsController {
  constructor(private readonly lostItemsService: LostItemsService) {}

  @Post()
  create(@Body() body: CreateLostItemDto) {
    return this.lostItemsService.createLostItem(body);
  }

  @Get()
  findAll() {
    return this.lostItemsService.getAllLostItems();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lostItemsService.getLostItemById(id);
  }
}
