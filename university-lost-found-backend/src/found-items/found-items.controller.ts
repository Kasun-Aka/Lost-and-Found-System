import { Body, Controller, Post, Param, Get, UseGuards, Req } from '@nestjs/common';
import { FoundItemsService } from './found-items.service';
import { CreateFoundItemDto } from './dto/found-item.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('found-items')
export class FoundItemsController {
    constructor(private readonly foundItemsService: FoundItemsService) {}

    
    @Get()
    getAllFoundItems() {
      return this.foundItemsService.getAllFoundItems();
    }

    @UseGuards(AuthGuard)
    @Get('/mine')
    getAllFoundItemsByUserID(@Req() req) {
      const studentId = req.user.user_metadata?.student_id;
      return this.foundItemsService.getAllFoundItemsByUserID(studentId);
    }

    @UseGuards(AuthGuard)
    @Post(':id')
    createFoundItem(@Param('id') id: string, @Body() body:CreateFoundItemDto) {
      return this.foundItemsService.createFoundItem(id, body);
    }

    @Get('/found/:id')
    getFoundItemById(@Param('id') id: string) {
        return this.foundItemsService.getFoundItemById(id);
    }
}


