import { Module } from '@nestjs/common';
import { DictionaryFoldersModule } from '../dictionary-folders/dictionary-folders.module.js';
import { TranslationsModule } from '../translations/translations.module.js';
import { DictionaryEntriesController } from './dictionary-entries.controller.js';
import { DictionaryEntriesService } from './dictionary-entries.service.js';

@Module({
  controllers: [DictionaryEntriesController],
  providers: [DictionaryEntriesService],
  imports: [TranslationsModule, DictionaryFoldersModule],
})
export class DictionaryEntriesModule {}
