import { IsHexColor, IsOptional, IsString } from 'class-validator';

export class UpdateDictionaryFolderDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsHexColor()
  color?: string;
}
