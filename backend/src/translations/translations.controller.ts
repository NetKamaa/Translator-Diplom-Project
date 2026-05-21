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
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateTranslationDto } from './dto/create.translation.dto.js';
import { UpdateTranslationDto } from './dto/update.translation.dto.js';
import { TranslationsService } from './translations.service.js';

type TJwtUser = {
  id: string;
  email: string;
};

type TRequestWithUser = Request & {
  user: TJwtUser;
};

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
    return this.translationsService.findAllTranslations(req.user.id);
  }

  @Get(':id')
  getOne(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.translationsService.findOneTranslation(req.user.id, id);
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
