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
import { CreateFlashcardDto } from './dto/create-flashcard.dto.js';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto.js';
import { FlashcardsService } from './flashcards.service.js';

@UseGuards(JwtAuthGuard)
@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Post()
  create(@Req() req: TRequestWithUser, @Body() dto: CreateFlashcardDto) {
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
  patch(
    @Req() req: TRequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateFlashcardDto,
  ) {
    return this.flashcardsService.updateFlashCard(req.user.id, id, dto);
  }

  @Delete(':id')
  delete(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.flashcardsService.deleteFlashCard(req.user.id, id);
  }
}
