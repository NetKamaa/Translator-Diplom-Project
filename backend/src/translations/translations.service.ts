import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateTranslationDto } from './dto/update-translation.dto.js';
import type { TCreateTranslationData } from './types/create-translation-data.type.js';

@Injectable()
export class TranslationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTranslation(userId: string, data: TCreateTranslationData) {
    return this.prisma.translation.create({
      data: {
        userId,
        sourceText: data.sourceText,
        translatedText: data.translatedText,
        sourceLanguage: data.sourceLanguage,
        targetLanguage: data.targetLanguage,
        provider: data.provider,
        modelName: data.modelName,
      },
    });
  }

  async getAllTranslations(userId: string) {
    return this.prisma.translation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOneTranslation(userId: string, id: string) {
    const translation = await this.prisma.translation.findFirst({
      where: { id, userId },
    });

    if (!translation) {
      throw new NotFoundException('Translation not found');
    }

    return translation;
  }

  async patchOneTranslation(
    userId: string,
    id: string,
    dto: UpdateTranslationDto,
  ) {
    await this.getOneTranslation(userId, id);

    return this.prisma.translation.update({
      where: { id },
      data: {
        sourceText: dto.sourceText,
        translatedText: dto.translatedText,
        sourceLanguage: dto.sourceLanguage,
        targetLanguage: dto.targetLanguage,
      },
    });
  }

  async deleteOneTranslation(userId: string, id: string) {
    await this.getOneTranslation(userId, id);

    return this.prisma.translation.delete({ where: { id } });
  }
}
