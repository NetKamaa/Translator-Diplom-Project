import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateFlashCardDeckDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsHexColor()
  @IsOptional()
  color?: string;
}
