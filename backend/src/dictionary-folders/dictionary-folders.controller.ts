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
import { DictionaryFoldersService } from './dictionary-folders.service.js';
import { CreateDictionaryFolder } from './dto/create.dictionary.folder.dto.js';
import { UpdateDictionaryFolder } from './dto/update.dictionary.folder.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('dictionary-folders')
export class DictionaryFoldersController {
  constructor(
    private readonly dictionaryFoldersService: DictionaryFoldersService,
  ) {}

  @Post()
  create(@Req() req: TRequestWithUser, @Body() dto: CreateDictionaryFolder) {
    return this.dictionaryFoldersService.createFolder(req.user.id, dto);
  }

  @Get()
  getAll(@Req() req: TRequestWithUser) {
    return this.dictionaryFoldersService.findAllFolders(req.user.id);
  }

  @Get(':id')
  getOne(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.dictionaryFoldersService.findOneFolder(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: TRequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateDictionaryFolder,
  ) {
    return this.dictionaryFoldersService.updateFolder(req.user.id, id, dto);
  }

  @Delete(':id')
  delete(@Req() req: TRequestWithUser, @Param('id') id: string) {
    return this.dictionaryFoldersService.deleteFolder(req.user.id, id);
  }
}
