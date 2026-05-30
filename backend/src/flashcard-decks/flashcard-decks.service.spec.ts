import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardDecksService } from './flashcard-decks.service.js';

describe('FlashcardDecksService', () => {
  let service: FlashcardDecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlashcardDecksService],
    }).compile();

    service = module.get<FlashcardDecksService>(FlashcardDecksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
