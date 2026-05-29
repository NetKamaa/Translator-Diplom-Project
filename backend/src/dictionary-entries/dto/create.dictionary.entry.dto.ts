import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDictionaryEntry {
  @IsString()
  sourceText!: string;

  @IsString()
  translatedText!: string;

  @IsString()
  sourceLanguage!: string;

  @IsString()
  targetLanguage!: string;

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
