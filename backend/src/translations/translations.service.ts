import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTranslationDto } from './dto/create-translation.dto.js';
import { UpdateTranslationDto } from './dto/update-translation.dto.js';

@Injectable()
export class TranslationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTranslation(userId: string, dto: CreateTranslationDto) {
    return this.prisma.translation.create({
      data: {
        userId,
        sourceText: dto.sourceText,
        translatedText: dto.translatedText,
        sourceLanguage: dto.sourceLanguage,
        targetLanguage: dto.targetLanguage,
      },
    });
  }

  async findAllTranslations(userId: string) {
    return this.prisma.translation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneTranslation(userId: string, id: string) {
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
    await this.findOneTranslation(userId, id);

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
    await this.findOneTranslation(userId, id);

    return this.prisma.translation.delete({ where: { id } });
  }
}
