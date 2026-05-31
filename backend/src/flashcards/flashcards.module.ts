import { Module } from '@nestjs/common';
import { FlashcardDecksModule } from '../flashcard-decks/flashcard-decks.module.js';
import { FlashcardsController } from './flashcards.controller.js';
import { FlashcardsService } from './flashcards.service.js';

@Module({
  controllers: [FlashcardsController],
  providers: [FlashcardsService],
  imports: [FlashcardDecksModule],
})
export class FlashcardsModule {}
