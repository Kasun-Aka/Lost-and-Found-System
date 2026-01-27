import { Controller, Post, Body, Get, Param, Put, UseGuards, Req } from '@nestjs/common';
import { LostItemsService } from './lost-items.service';
import { CreateLostItemDto } from './dto/create-lost-item.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('lost-items')
export class LostItemsController {
  constructor(private readonly lostItemsService: LostItemsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateLostItemDto, @Req() req: any,) {
    const user = req.user;
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

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.lostItemsService.updateLostItemStatus(id, body);
  }

}
