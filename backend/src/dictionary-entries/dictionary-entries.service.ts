import { Injectable, NotFoundException } from '@nestjs/common';
import { DictionaryFoldersService } from '../dictionary-folders/dictionary-folders.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { TranslationsService } from '../translations/translations.service.js';
import { CreateDictionaryEntry } from './dto/create.dictionary.entry.dto.js';
import { UpdateDictionaryEntry } from './dto/update.dictionary.entry.dto.js';

@Injectable()
export class DictionaryEntriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dictionaryFoldersService: DictionaryFoldersService,
    private readonly translationsService: TranslationsService,
  ) {}

  async createEntry(userId: string, dto: CreateDictionaryEntry) {
    if (dto.dictionaryFolderId) {
      await this.dictionaryFoldersService.findOneFolder(
        userId,
        dto.dictionaryFolderId,
      );
    }

    if (dto.translationId) {
      await this.translationsService.findOneTranslation(
        userId,
        dto.translationId,
      );
    }

    return this.prisma.dictionaryEntry.create({
      data: {
        userId,
        sourceText: dto.sourceText,
        translatedText: dto.translatedText,
        sourceLanguage: dto.sourceLanguage,
        targetLanguage: dto.targetLanguage,
        context: dto.context,
        note: dto.note,
        dictionaryFolderId: dto.dictionaryFolderId,
        translationId: dto.translationId,
      },
    });
  }

  async findAllEntries(userId: string) {
    return this.prisma.dictionaryEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneEntry(userId: string, id: string) {
    const entry = await this.prisma.dictionaryEntry.findFirst({
      where: { userId, id },
    });

    if (!entry) {
      throw new NotFoundException('Entry not found');
    }

    return entry;
  }

  async updateEntry(userId: string, id: string, dto: UpdateDictionaryEntry) {
    await this.findOneEntry(userId, id);

    if (dto.dictionaryFolderId) {
      await this.dictionaryFoldersService.findOneFolder(
        userId,
        dto.dictionaryFolderId,
      );
    }

    if (dto.translationId) {
      await this.translationsService.findOneTranslation(
        userId,
        dto.translationId,
      );
    }

    return this.prisma.dictionaryEntry.update({
      where: { id },
      data: {
        sourceText: dto.sourceText,
        translatedText: dto.translatedText,
        sourceLanguage: dto.sourceLanguage,
        targetLanguage: dto.targetLanguage,
        context: dto.context,
        note: dto.note,
        dictionaryFolderId: dto.dictionaryFolderId,
        translationId: dto.translationId,
      },
    });
  }

  async deleteEntry(userId: string, id: string) {
    await this.findOneEntry(userId, id);

    return this.prisma.dictionaryEntry.delete({ where: { id } });
  }
}
