import { Injectable } from '@nestjs/common';
import { TranslationsService } from '../translations/translations.service.js';
import { TranslateDto } from './dto/translate.dto.js';

@Injectable()
export class AiService {
  constructor(private readonly translationsService: TranslationsService) {}

  translate(userId: string, dto: TranslateDto) {
    const translatedText = this.mockTranslate(dto.sourceText);

    return this.translationsService.createTranslation(userId, {
      sourceText: dto.sourceText,
      translatedText,
      sourceLanguage: dto.sourceLanguage,
      targetLanguage: dto.targetLanguage,
      provider: 'mock',
      modelName: 'mock-translator',
    });
  }

  private mockTranslate(text: string): string {
    const dictionary: Record<string, string> = {
      Hello: 'Привет',
      hello: 'привет',
      World: 'Мир',
      world: 'мир',
      airport: 'аэропорт',
      ticket: 'билет',
    };

    return dictionary[text] ?? `[mock translation]: ${text}`;
  }
}
