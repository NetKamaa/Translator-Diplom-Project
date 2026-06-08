import { InferenceClient } from '@huggingface/inference';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TranslateDto } from '../dto/translate.dto.js';

const MODEL_BY_LANGUAGE_PAIR: Record<string, string> = {
  'en-ru': 'Helsinki-NLP/opus-mt-en-ru',
  'ru-en': 'Helsinki-NLP/opus-mt-ru-en',
  'en-de': 'Helsinki-NLP/opus-mt-en-de',
  'de-en': 'Helsinki-NLP/opus-mt-de-en',
  'en-fr': 'Helsinki-NLP/opus-mt-en-fr',
  'fr-en': 'Helsinki-NLP/opus-mt-fr-en',
  'en-es': 'Helsinki-NLP/opus-mt-en-es',
  'es-en': 'Helsinki-NLP/opus-mt-es-en',
};

@Injectable()
export class HuggingFaceTranslationProvider {
  private readonly client: InferenceClient;

  constructor(private readonly configService: ConfigService) {
    const accessToken = this.configService.get<string>('HF_ACCESS_TOKEN');

    if (!accessToken) {
      throw new ServiceUnavailableException(
        'HF_ACCESS_TOKEN is not configured',
      );
    }

    this.client = new InferenceClient(accessToken);
  }

  async translate(dto: TranslateDto): Promise<{
    translatedText: string;
    modelName: string;
  }> {
    const modelName = this.getModelName(dto.sourceLanguage, dto.targetLanguage);

    try {
      const result = await this.client.translation({
        model: modelName,
        inputs: dto.sourceText,
      });

      const translatedText = this.extractTranslatedText(result);

      if (!translatedText) {
        throw new ServiceUnavailableException(
          'Hugging Face translation failed',
        );
      }

      return {
        translatedText,
        modelName,
      };
    } catch {
      throw new ServiceUnavailableException('Hugging Face translation failed');
    }
  }

  private getModelName(sourceLanguage: string, targetLanguage: string): string {
    const languagePair = `${sourceLanguage}-${targetLanguage}`;
    const modelName = MODEL_BY_LANGUAGE_PAIR[languagePair];

    if (!modelName) {
      throw new ServiceUnavailableException(
        `Translation model for ${languagePair} is not configured`,
      );
    }

    return modelName;
  }

  private extractTranslatedText(result: unknown): string {
    if (this.hasTranslationText(result)) {
      return result.translation_text.trim();
    }

    if (this.isUnknownArray(result)) {
      const firstItem = result[0];

      if (this.hasTranslationText(firstItem)) {
        return firstItem.translation_text.trim();
      }
    }

    return '';
  }

  private isUnknownArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  private hasTranslationText(
    value: unknown,
  ): value is { translation_text: string } {
    return (
      typeof value === 'object' &&
      value !== null &&
      'translation_text' in value &&
      typeof value.translation_text === 'string'
    );
  }
}
