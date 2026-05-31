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
import { CreateDictionaryEntryDto } from './dto/create-dictionary-entry.dto.js';
import { UpdateDictionaryEntryDto } from './dto/update-dictionary-entry.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('dictionary-entries')
export class DictionaryEntriesController {
  constructor(
    private readonly dictionaryEntriesService: DictionaryEntriesService,
  ) {}

  @Post()
  create(@Req() req: TRequestWithUser, @Body() dto: CreateDictionaryEntryDto) {
    return this.dictionaryEntriesService.createEntry(req.user.id, dto);
  }

  @Get()
  getAll(@Req() req: TRequestWithUser) {
    return this.dictionaryEntriesService.getAllEntries(req.user.id);
  }

  @Get(':id')
  getOne(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.dictionaryEntriesService.getOneEntry(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: TRequestWithUser,
    @Body() dto: UpdateDictionaryEntryDto,
    @Param('id') id: string,
  ) {
    return this.dictionaryEntriesService.updateEntry(req.user.id, id, dto);
  }

  @Delete(':id')
  delete(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.dictionaryEntriesService.deleteEntry(req.user.id, id);
  }
}
