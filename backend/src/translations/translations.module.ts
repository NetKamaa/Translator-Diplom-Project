import { Module } from '@nestjs/common';
import { TranslationsController } from './translations.controller.js';
import { TranslationsService } from './translations.service.js';

@Module({
  providers: [TranslationsService],
  controllers: [TranslationsController],
})
export class TranslationsModule {}
