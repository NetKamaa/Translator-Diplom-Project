import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryEntriesController } from './dictionary-entries.controller.js';

describe('DictionaryEntriesController', () => {
  let controller: DictionaryEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictionaryEntriesController],
    }).compile();

    controller = module.get<DictionaryEntriesController>(
      DictionaryEntriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
