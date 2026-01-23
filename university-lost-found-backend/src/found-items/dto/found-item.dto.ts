import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateFoundItemDto {
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
  itemCategory: string;

  @IsString()
  @IsNotEmpty()
  founderName: string;

  @IsString()
  @IsNotEmpty()
  founderStudentId: string;

  @IsString()
  @IsNotEmpty()
  itemPickUpLocation: string;

  @IsOptional()
  @IsString()
  details?: string;
}