import { Module } from '@nestjs/common';
import { TranslationsModule } from '../translations/translations.module.js';
import { AiController } from './ai.controller.js';
import { AiService } from './ai.service.js';
import { HuggingFaceTranslationProvider } from './providers/hugging-face-translation.provider.js';

@Module({
  imports: [TranslationsModule],
  providers: [AiService, HuggingFaceTranslationProvider],
  controllers: [AiController],
})
export class AiModule {}
