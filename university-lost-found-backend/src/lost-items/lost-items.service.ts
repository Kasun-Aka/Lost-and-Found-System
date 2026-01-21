import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { CreateLostItemDto } from './dto/create-lost-item.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class LostItemsService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
  }

  async createLostItem(data: CreateLostItemDto) {
    const { data: inserted, error } = await this.supabase
      .from('lost_items')
      .insert({
        owner_name: data.studentName,
        owner_student_id: data.studentId,
        item_name: data.itemName,
        category: data.itemCategory,
        location_description: data.location,
        lost_at: data.lostDatetime,
        description: data.details,
        status: "LOST",
      })
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return inserted;
  }


  async getAllLostItems() {
    const { data, error } = await this.supabase
      .from('lost_items')
      .select(`
        id,
        item_name,
        category,
        location_description,
        lost_at,
        description,
        owner_name,
        owner_student_id,
        status
      `)
      .order('lost_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }


    async getLostItemById(id: string) {
      const { data, error } = await this.supabase
        .from('lost_items')
        .select(`
          id,
          item_name,
          category,
          location_description,
          lost_at,
          description,
          owner_name,
          owner_student_id,
          status
        `)
        .eq('id', id)
        .single();

      if (error || !data) {
        throw new NotFoundException('Lost item not found');
      }
    
      return data;
    }
}
