import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js/dist/index.mjs';
import { CreateFoundItemDto } from './dto/found-item.dto';

@Injectable()
export class FoundItemsService {
    private supabase;

    constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
  }

    async createFoundItem(id: string, data: CreateFoundItemDto) {
        const { data: inserted, error } = await this.supabase
          .from('found_items')
          .insert({
            owner_name: data.ownerName,
            owner_student_id: data.ownerStudentId,
            item_name: data.itemName,
            category: data.itemCategory,
            lost_item_id: id,
            founder_name: data.founderName,
            founder_student_id: data.founderStudentId,
            pickup_location: data.itemPickUpLocation,
            details: data.details,
          })
          .select()
          .single();
    
        if (error) {
          throw new InternalServerErrorException(error.message);
        }
    
        return inserted;
      }
    
    async getAllFoundItems() {
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
          .eq('status', 'FOUND')
          .order('lost_at', { ascending: false });

        if (error) {
          throw new InternalServerErrorException(error.message);
        }
        return data;
    }

    async getFoundItemById(id: string) {
        const { data, error } = await this.supabase
          .from('found_items')
          .select(`
            owner_name,
            owner_student_id,
            item_name,
            category,
            pickup_location,
            lost_item_id,
            details,
            founder_name,
            founder_student_id
          `) 
          .eq('lost_item_id', id)
          .single();
        if (error || !data) {
          throw new InternalServerErrorException('item not found');
        }
        return data;
    }

    async getAllFoundItemsByUserID(studentId: string) {
      const { data, error } = await this.supabase
        .from('found_items')
        .select(`
          id,
          item_name,
          lost_item_id
        `)
        .eq('owner_student_id', studentId)
        .order('id', { ascending: false });

      if (error) {
        throw new InternalServerErrorException(error.message);
      }

      return data;
    }

    async getAllFoundItemsList() {
      const { data, error } = await this.supabase
        .from('found_items')
        .select('id');
      if (error) {
        throw new InternalServerErrorException(error.message);
      }

      return data;
    }
}
