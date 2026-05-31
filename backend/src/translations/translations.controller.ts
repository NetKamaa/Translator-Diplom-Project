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
import { CreateTranslationDto } from './dto/create-translation.dto.js';
import { UpdateTranslationDto } from './dto/update-translation.dto.js';
import { TranslationsService } from './translations.service.js';

@UseGuards(JwtAuthGuard)
@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post()
  create(@Req() req: TRequestWithUser, @Body() dto: CreateTranslationDto) {
    return this.translationsService.createTranslation(req.user.id, dto);
  }

  @Get()
  getAll(@Req() req: TRequestWithUser) {
    return this.translationsService.getAllTranslations(req.user.id);
  }

  @Get(':id')
  getOne(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.translationsService.getOneTranslation(req.user.id, id);
  }

  @Patch(':id')
  patch(
    @Req() req: TRequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateTranslationDto,
  ) {
    return this.translationsService.patchOneTranslation(req.user.id, id, dto);
  }

  @Delete(':id')
  delete(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.translationsService.deleteOneTranslation(req.user.id, id);
  }
}
