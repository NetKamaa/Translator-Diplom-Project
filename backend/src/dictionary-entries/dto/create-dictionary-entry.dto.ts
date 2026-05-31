import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDictionaryEntryDto {
  @IsString()
  @IsNotEmpty()
  sourceText!: string;

  @IsNotEmpty()
  @IsString()
  translatedText!: string;

  @IsNotEmpty()
  @IsString()
  sourceLanguage!: string;

  @IsNotEmpty()
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
