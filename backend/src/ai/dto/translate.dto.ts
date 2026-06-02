import { IsNotEmpty, IsString } from 'class-validator';

export class TranslateDto {
  @IsString()
  @IsNotEmpty()
  sourceText!: string;

  @IsString()
  @IsNotEmpty()
  sourceLanguage!: string;

  @IsString()
  @IsNotEmpty()
  targetLanguage!: string;
}
