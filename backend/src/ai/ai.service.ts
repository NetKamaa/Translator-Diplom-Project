import { Injectable } from '@nestjs/common';
import { TranslationsService } from '../translations/translations.service.js';
import { TranslateDto } from './dto/translate.dto.js';
import { HuggingFaceTranslationProvider } from './providers/hugging-face-translation.provider.js';

@Injectable()
export class AiService {
  constructor(
    private readonly translationsService: TranslationsService,
    private readonly huggingFaceTranslationProvider: HuggingFaceTranslationProvider,
  ) {}

  async translate(userId: string, dto: TranslateDto) {
    const { translatedText, modelName } =
      await this.huggingFaceTranslationProvider.translate(dto);

    return this.translationsService.createTranslation(userId, {
      sourceText: dto.sourceText,
      translatedText,
      sourceLanguage: dto.sourceLanguage,
      targetLanguage: dto.targetLanguage,
      provider: 'huggingface',
      modelName,
    });
  }
}
