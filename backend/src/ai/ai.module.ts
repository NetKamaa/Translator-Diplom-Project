import { Module } from '@nestjs/common';
import { TranslationsModule } from '../translations/translations.module.js';
import { AiController } from './ai.controller.js';
import { AiService } from './ai.service.js';

@Module({
  imports: [TranslationsModule],
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule {}
