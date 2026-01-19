import { IsString, IsNotEmpty, IsOptional, IsISO8601 } from 'class-validator';

export class CreateLostItemDto {
    @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  ownerStudentId: string;

  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  locationDescription: string;

  @IsISO8601()
  lostAt: string;

  @IsOptional()
  @IsString()
  description?: string;
}
