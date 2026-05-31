import { IsOptional, IsString } from 'class-validator';

export class UpdateTranslationDto {
  @IsOptional()
  @IsString()
  sourceText?: string;

  @IsOptional()
  @IsString()
  translatedText?: string;

  @IsOptional()
  @IsString()
  sourceLanguage?: string;

  @IsOptional()
  @IsString()
  targetLanguage?: string;
}
