import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryFoldersService } from './dictionary-folders.service.js';

describe('DictionaryFoldersService', () => {
  let service: DictionaryFoldersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictionaryFoldersService],
    }).compile();

    service = module.get<DictionaryFoldersService>(DictionaryFoldersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
