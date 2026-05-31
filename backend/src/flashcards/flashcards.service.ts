import { Injectable, NotFoundException } from '@nestjs/common';
import { FlashcardDecksService } from '../flashcard-decks/flashcard-decks.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateFlashcardDto } from './dto/create-flashcard.dto.js';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto.js';

@Injectable()
export class FlashcardsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly flashcardDeckService: FlashcardDecksService,
  ) {}

  async createFlashCard(userId: string, dto: CreateFlashcardDto) {
    if (dto.flashcardDeckId) {
      await this.flashcardDeckService.getOneFlashCardDeck(
        userId,
        dto.flashcardDeckId,
      );
    }

    return this.prisma.flashcard.create({
      data: {
        userId,
        frontText: dto.frontText,
        backText: dto.backText,
        frontHint: dto.frontHint,
        backHint: dto.backHint,
        sourceLanguage: dto.sourceLanguage,
        targetLanguage: dto.targetLanguage,
        flashcardDeckId: dto.flashcardDeckId,
      },
    });
  }

  async getAllFlashCards(userId: string) {
    return this.prisma.flashcard.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOneFlashCard(userId: string, id: string) {
    const flashCard = await this.prisma.flashcard.findFirst({
      where: { userId, id },
    });

    if (!flashCard) {
      throw new NotFoundException('FlashCard not found');
    }

    return flashCard;
  }

  async updateFlashCard(userId: string, id: string, dto: UpdateFlashcardDto) {
    await this.getOneFlashCard(userId, id);

    if (dto.flashcardDeckId) {
      await this.flashcardDeckService.getOneFlashCardDeck(
        userId,
        dto.flashcardDeckId,
      );
    }

    return this.prisma.flashcard.update({
      where: { id },
      data: {
        frontText: dto.frontText,
        backText: dto.backText,
        frontHint: dto.frontHint,
        backHint: dto.backHint,
        sourceLanguage: dto.sourceLanguage,
        targetLanguage: dto.targetLanguage,
        flashcardDeckId: dto.flashcardDeckId,
      },
    });
  }

  async deleteFlashCard(userId: string, id: string) {
    await this.getOneFlashCard(userId, id);

    return await this.prisma.flashcard.delete({ where: { id } });
  }
}
