import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDictionaryFolder {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsHexColor()
  color?: string;
}
