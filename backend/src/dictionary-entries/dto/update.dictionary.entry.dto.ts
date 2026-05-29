import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateDictionaryEntry {
  @IsOptional()
  @IsString()
  sourceText?: string;

  @IsOptional()
  @IsString()
  translatedText?: string;

  @IsString()
  @IsOptional()
  sourceLanguage?: string;

  @IsOptional()
  @IsString()
  targetLanguage?: string;

  @IsOptional()
  @IsString()
  context?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsUUID()
  dictionaryFolderId?: string;

  @IsOptional()
  @IsUUID()
  translationId?: string;
}
