import { Body, Controller, Post, Param } from '@nestjs/common';
import { FoundItemsService } from './found-items.service';

@Controller('found-items')
export class FoundItemsController {
    constructor(private readonly foundItemsService: FoundItemsService) {}

    @Post(':id')
    createFoundItem(@Param('id') id: string, @Body() body:any) {
      return this.foundItemsService.createFoundItem(id, body);
    }

}


