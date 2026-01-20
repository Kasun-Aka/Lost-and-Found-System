import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateLostItemDto {
  @IsString()
  @IsNotEmpty()
  studentName: string;

  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsString()
  @IsNotEmpty()
  itemCategory: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDateString()
  lostDatetime: string;

  @IsOptional()
  @IsString()
  details?: string;
}
