import { IsHexColor, IsOptional, IsString } from 'class-validator';

export class UpdateDictionaryFolder {
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
