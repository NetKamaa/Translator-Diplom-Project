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
import { CreateFlashCardDeckDto } from './dto/create-flashcard-decks.dto.js';
import { UpdateFlashCardDeckDto } from './dto/update-flashcard-decks.dto.js';
import { FlashcardDecksService } from './flashcard-decks.service.js';

@UseGuards(JwtAuthGuard)
@Controller('flashcard-decks')
export class FlashcardDecksController {
  constructor(private readonly flashcardDecksService: FlashcardDecksService) {}

  @Post()
  create(@Req() req: TRequestWithUser, @Body() dto: CreateFlashCardDeckDto) {
    return this.flashcardDecksService.createFlashCardDeck(req.user.id, dto);
  }

  @Get()
  getAll(@Req() req: TRequestWithUser) {
    return this.flashcardDecksService.getAllFlashCardDecks(req.user.id);
  }

  @Get(':id')
  getOne(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.flashcardDecksService.getOneFlashCardDeck(req.user.id, id);
  }

  @Patch(':id')
  patch(
    @Req() req: TRequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateFlashCardDeckDto,
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
