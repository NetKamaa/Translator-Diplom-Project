import { IsHexColor, IsOptional, IsString } from 'class-validator';

export class CreateDictionaryFolder {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsHexColor()
  color?: string;
}
