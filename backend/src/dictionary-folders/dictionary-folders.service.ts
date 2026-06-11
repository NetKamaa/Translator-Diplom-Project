import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDictionaryFolderDto } from './dto/create-dictionary-folder.dto.js';
import { UpdateDictionaryFolderDto } from './dto/update-dictionary-folder.dto.js';

@Injectable()
export class DictionaryFoldersService {
  constructor(private readonly prisma: PrismaService) {}

  async createFolder(userId: string, dto: CreateDictionaryFolderDto) {
    try {
      return await this.prisma.dictionaryFolder.create({
        data: {
          userId,
          name: dto.name,
          description: dto.description,
          color: dto.color ?? '#111827',
        },
      });
    } catch (error: unknown) {
      this.handleUniqueFolderNameError(error);
    }
  }

  async getAllFolders(userId: string) {
    return await this.prisma.dictionaryFolder.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOneFolder(userId: string, id: string) {
    const folder = await this.prisma.dictionaryFolder.findFirst({
      where: { id, userId },
    });

    if (!folder) {
      throw new NotFoundException('Dictionary folder not found');
    }

    return folder;
  }

  async updateFolder(
    userId: string,
    id: string,
    dto: UpdateDictionaryFolderDto,
  ) {
    await this.getOneFolder(userId, id);

    try {
      return await this.prisma.dictionaryFolder.update({
        where: { id },
        data: {
          name: dto.name,
          description: dto.description,
          color: dto.color,
        },
      });
    } catch (error: unknown) {
      this.handleUniqueFolderNameError(error);
    }
  }

  async deleteFolder(userId: string, id: string) {
    await this.getOneFolder(userId, id);

    return await this.prisma.dictionaryFolder.delete({ where: { id } });
  }

  private handleUniqueFolderNameError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(
        'Dictionary folder with this name already exists',
      );
    }

    throw error;
  }
}
