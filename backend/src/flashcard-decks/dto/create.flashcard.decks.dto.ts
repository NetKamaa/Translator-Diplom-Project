import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFlashcardDeckDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsHexColor()
  @IsOptional()
  color?: string;
}
