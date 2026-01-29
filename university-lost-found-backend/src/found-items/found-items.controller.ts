import { Body, Controller, Post, Param, Get, UseGuards, Req } from '@nestjs/common';
import { FoundItemsService } from './found-items.service';
import { CreateFoundItemDto } from './dto/found-item.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('found-items')
export class FoundItemsController {
    constructor(private readonly foundItemsService: FoundItemsService) {}

    @UseGuards(AuthGuard, AdminGuard)
    @Get()
    getAllFoundItems(@Req() req) {
      return this.foundItemsService.getAllFoundItems();
    }

    @Get('/list')
    getAllFoundItemsList() {
      return this.foundItemsService.getAllFoundItemsList();
    }

    @UseGuards(AuthGuard)
    @Get('/mine')
    getAllFoundItemsByUserID(@Req() req) {
      const studentId = req.user.user_metadata?.student_id;
      return this.foundItemsService.getAllFoundItemsByUserID(studentId);
    }

    @UseGuards(AuthGuard)
    @Post(':id')
    createFoundItem(@Param('id') id: string, @Body() body:CreateFoundItemDto, @Req() req) {
      return this.foundItemsService.createFoundItem(id, body);
    }

    @Get('/found/:id')
    getFoundItemById(@Param('id') id: string) {
        return this.foundItemsService.getFoundItemById(id);
    }
}


