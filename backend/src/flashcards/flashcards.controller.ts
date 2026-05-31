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
import { CreateFlashcard } from './dto/create.flashcard.dto.js';
import { UpdateFlashcard } from './dto/update.flashcard.dto.js';
import { FlashcardsService } from './flashcards.service.js';

@UseGuards(JwtAuthGuard)
@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Post()
  create(@Req() req: TRequestWithUser, @Body() dto: CreateFlashcard) {
    return this.flashcardsService.createFlashCard(req.user.id, dto);
  }

  @Get()
  getAll(@Req() req: TRequestWithUser) {
    return this.flashcardsService.getAllFlashCards(req.user.id);
  }

  @Get(':id')
  getOne(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.flashcardsService.getOneFlashCard(req.user.id, id);
  }

  @Patch(':id')
  updateFlashCard(
    @Req() req: TRequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateFlashcard,
  ) {
    return this.flashcardsService.updateFlashCard(req.user.id, id, dto);
  }

  @Delete(':id')
  delete(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.flashcardsService.deleteFlashCard(req.user.id, id);
  }
}
