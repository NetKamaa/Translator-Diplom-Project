import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateFlashCardDeckDto } from './dto/create-flashcard-decks.dto.js';
import { UpdateFlashCardDeckDto } from './dto/update-flashcard-decks.dto.js';

@Injectable()
export class FlashcardDecksService {
  constructor(private readonly prisma: PrismaService) {}

  async createFlashCardDeck(userId: string, dto: CreateFlashCardDeckDto) {
    try {
      return await this.prisma.flashcardDeck.create({
        data: {
          userId,
          name: dto.name,
          description: dto.description,
          color: dto.color ?? '111827',
        },
      });
    } catch (error: unknown) {
      this.handleUniqueDeckNameError(error);
    }
  }

  async getAllFlashCardDecks(userId: string) {
    return this.prisma.flashcardDeck.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOneFlashCardDeck(userId: string, id: string) {
    const flashCardDeck = await this.prisma.flashcardDeck.findFirst({
      where: { userId, id },
    });

    if (!flashCardDeck) {
      throw new NotFoundException('FlashCardDeck is not found');
    }

    return flashCardDeck;
  }

  async updateOneFlashCardDeck(
    userId: string,
    id: string,
    dto: UpdateFlashCardDeckDto,
  ) {
    await this.getOneFlashCardDeck(userId, id);

    try {
      return await this.prisma.flashcardDeck.update({
        where: { id },
        data: {
          name: dto.name,
          description: dto.description,
          color: dto.color,
        },
      });
    } catch (error: unknown) {
      this.handleUniqueDeckNameError(error);
    }
  }

  async deleteOneFlashCardDeck(userId: string, id: string) {
    await this.getOneFlashCardDeck(userId, id);

    return await this.prisma.flashcardDeck.delete({
      where: { id },
    });
  }

  private handleUniqueDeckNameError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(
        'Flashcard deck with this name already exists',
      );
    }

    throw error;
  }
}
