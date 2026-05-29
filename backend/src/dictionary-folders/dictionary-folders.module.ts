import { Module } from '@nestjs/common';
import { DictionaryFoldersController } from './dictionary-folders.controller.js';
import { DictionaryFoldersService } from './dictionary-folders.service.js';

@Module({
  controllers: [DictionaryFoldersController],
  providers: [DictionaryFoldersService],
  exports: [DictionaryFoldersService],
})
export class DictionaryFoldersModule {}
