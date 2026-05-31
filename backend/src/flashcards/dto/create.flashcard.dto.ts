import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateFlashcard {
  @IsString()
  @IsNotEmpty()
  frontText!: string;

  @IsString()
  @IsNotEmpty()
  backText!: string;

  @IsOptional()
  @IsString()
  frontHint?: string;

  @IsOptional()
  @IsString()
  backHint?: string;

  @IsOptional()
  @IsString()
  sourceLanguage?: string;

  @IsOptional()
  @IsString()
  targetLanguage?: string;

  @IsOptional()
  @IsUUID()
  flashcardDeckId?: string;
}
