import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryEntriesService } from './dictionary-entries.service.js';

describe('DictionaryEntriesService', () => {
  let service: DictionaryEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictionaryEntriesService],
    }).compile();

    service = module.get<DictionaryEntriesService>(DictionaryEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
