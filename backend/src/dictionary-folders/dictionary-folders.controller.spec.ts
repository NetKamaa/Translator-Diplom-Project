import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryFoldersController } from './dictionary-folders.controller.js';

describe('DictionaryFoldersController', () => {
  let controller: DictionaryFoldersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictionaryFoldersController],
    }).compile();

    controller = module.get<DictionaryFoldersController>(
      DictionaryFoldersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
