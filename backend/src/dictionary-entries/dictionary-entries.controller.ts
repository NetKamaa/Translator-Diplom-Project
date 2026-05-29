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
import { DictionaryEntriesService } from './dictionary-entries.service.js';
import { CreateDictionaryEntry } from './dto/create.dictionary.entry.dto.js';
import { UpdateDictionaryEntry } from './dto/update.dictionary.entry.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('dictionary-entries')
export class DictionaryEntriesController {
  constructor(
    private readonly dictionaryEntriesService: DictionaryEntriesService,
  ) {}

  @Post()
  create(@Req() req: TRequestWithUser, @Body() dto: CreateDictionaryEntry) {
    return this.dictionaryEntriesService.createEntry(req.user.id, dto);
  }

  @Get()
  getAll(@Req() req: TRequestWithUser) {
    return this.dictionaryEntriesService.findAllEntries(req.user.id);
  }

  @Get(':id')
  getOne(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.dictionaryEntriesService.findOneEntry(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: TRequestWithUser,
    @Body() dto: UpdateDictionaryEntry,
    @Param('id') id: string,
  ) {
    return this.dictionaryEntriesService.updateEntry(req.user.id, id, dto);
  }

  @Delete(':id')
  delete(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.dictionaryEntriesService.deleteEntry(req.user.id, id);
  }
}
