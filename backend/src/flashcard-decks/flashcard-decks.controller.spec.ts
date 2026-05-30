import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardDecksController } from './flashcard-decks.controller.js';

describe('FlashcardDecksController', () => {
  let controller: FlashcardDecksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashcardDecksController],
    }).compile();

    controller = module.get<FlashcardDecksController>(FlashcardDecksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
