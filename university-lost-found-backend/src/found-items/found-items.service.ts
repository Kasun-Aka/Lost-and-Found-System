import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js/dist/index.mjs';

@Injectable()
export class FoundItemsService {
    private supabase;

    constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
  }

    async createFoundItem(id: string, data: any) {
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
    
}
