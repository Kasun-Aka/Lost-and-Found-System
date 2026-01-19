import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class LostItemsService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
  }

  async createLostItem(data: any) {
    const { data: inserted, error } = await this.supabase
      .from('lost_items')
      .insert({
        owner_name: data.ownerName,
        owner_student_id: data.ownerStudentId,
        item_name: data.itemName,
        category: data.category,
        location_description: data.locationDescription,
        lost_at: data.lostAt,
        description: data.description,
      })
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return inserted;
  }
}
