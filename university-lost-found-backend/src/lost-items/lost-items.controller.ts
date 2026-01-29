import { Controller, Post, Body, Get, Param, Put, UseGuards, Req } from '@nestjs/common';
import { LostItemsService } from './lost-items.service';
import { CreateLostItemDto } from './dto/create-lost-item.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('lost-items')
export class LostItemsController {
  constructor(private readonly lostItemsService: LostItemsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateLostItemDto, @Req() req) {
    return this.lostItemsService.createLostItem(body);
  }

  @Get()
  findAll() {
    return this.lostItemsService.getAllLostItems();
  }

  @Get('/list')
  getAllLostItemsList() {
    return this.lostItemsService.getAllLostItemsList();
  }

  @UseGuards(AuthGuard)
  @Get('/mine')
  findMine(@Req() req) {
    const studentId = req.user.user_metadata?.student_id;

    return this.lostItemsService.getLostItemsByUserId(studentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lostItemsService.getLostItemById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateFound(@Param('id') id: string, @Body() body: any, @Req() req) {
    return this.lostItemsService.updateLostItemStatus(id, body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateClaim(@Param('id') id: string, @Req() req, @Body() body: any) {
    const studentId = req.user.user_metadata?.student_id;
    return this.lostItemsService.updateLostItemStatus(id, body);
  }

}