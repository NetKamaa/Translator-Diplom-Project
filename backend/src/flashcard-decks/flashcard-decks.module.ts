import { Module } from '@nestjs/common';
import { FlashcardDecksController } from './flashcard-decks.controller.js';
import { FlashcardDecksService } from './flashcard-decks.service.js';

@Module({
  controllers: [FlashcardDecksController],
  providers: [FlashcardDecksService],
  exports: [FlashcardDecksService],
})
export class FlashcardDecksModule {}
