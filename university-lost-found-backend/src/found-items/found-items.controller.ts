import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { FoundItemsService } from './found-items.service';
import { CreateFoundItemDto } from './dto/found-item.dto';

@Controller('found-items')
export class FoundItemsController {
    constructor(private readonly foundItemsService: FoundItemsService) {}

    @Post(':id')
    createFoundItem(@Param('id') id: string, @Body() body:CreateFoundItemDto) {
      return this.foundItemsService.createFoundItem(id, body);
    }

    @Get()
    getAllFoundItems() {
      return this.foundItemsService.getAllFoundItems();
    }

    @Get('/found/:id')
    getFoundItemById(@Param('id') id: string) {
        return this.foundItemsService.getFoundItemById(id);
    }
}


