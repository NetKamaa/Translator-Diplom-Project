import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { TRequestWithUser } from '../auth/types/request-with-user.type.js';
import { CreateFlashcardDeckDto } from './dto/create.flashcard.decks.dto.js';
import { UpdateFlashcardDeckDto } from './dto/update.flashcard.decks.dto.js';
import { FlashcardDecksService } from './flashcard-decks.service.js';

@UseGuards(JwtAuthGuard)
@Controller('flashcard-decks')
export class FlashcardDecksController {
  constructor(private readonly flashcardDecksService: FlashcardDecksService) {}

  @Post()
  create(@Req() req: TRequestWithUser, @Body() dto: CreateFlashcardDeckDto) {
    return this.flashcardDecksService.createFlashcardDeck(req.user.id, dto);
  }

  @Get()
  getAll(@Req() req: TRequestWithUser) {
    return this.flashcardDecksService.getAllFlashcardDecks(req.user.id);
  }

  @Get(':id')
  getOne(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.flashcardDecksService.getOneFlashCardDeck(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: TRequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateFlashcardDeckDto,
  ) {
    return this.flashcardDecksService.updateOneFlashCardDeck(
      req.user.id,
      id,
      dto,
    );
  }

  @Delete(':id')
  delete(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.flashcardDecksService.deleteOneFlashCardDeck(req.user.id, id);
  }
}
