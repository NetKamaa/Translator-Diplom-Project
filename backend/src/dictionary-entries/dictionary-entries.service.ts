import { Injectable, NotFoundException } from '@nestjs/common';
import { DictionaryFoldersService } from '../dictionary-folders/dictionary-folders.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { TranslationsService } from '../translations/translations.service.js';
import { CreateDictionaryEntryDto } from './dto/create-dictionary-entry.dto.js';
import { UpdateDictionaryEntryDto } from './dto/update-dictionary-entry.dto.js';

@Injectable()
export class DictionaryEntriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dictionaryFoldersService: DictionaryFoldersService,
    private readonly translationsService: TranslationsService,
  ) {}

  async createEntry(userId: string, dto: CreateDictionaryEntryDto) {
    if (dto.dictionaryFolderId) {
      await this.dictionaryFoldersService.getOneFolder(
        userId,
        dto.dictionaryFolderId,
      );
    }

    if (dto.translationId) {
      await this.translationsService.getOneTranslation(
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

  async getAllEntries(userId: string) {
    return this.prisma.dictionaryEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOneEntry(userId: string, id: string) {
    const entry = await this.prisma.dictionaryEntry.findFirst({
      where: { userId, id },
    });

    if (!entry) {
      throw new NotFoundException('Entry not found');
    }

    return entry;
  }

  async updateEntry(userId: string, id: string, dto: UpdateDictionaryEntryDto) {
    await this.getOneEntry(userId, id);

    if (dto.dictionaryFolderId) {
      await this.dictionaryFoldersService.getOneFolder(
        userId,
        dto.dictionaryFolderId,
      );
    }

    if (dto.translationId) {
      await this.translationsService.getOneTranslation(
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
    await this.getOneEntry(userId, id);

    return this.prisma.dictionaryEntry.delete({ where: { id } });
  }
}
