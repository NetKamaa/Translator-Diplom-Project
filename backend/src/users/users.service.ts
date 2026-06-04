import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto.js';

type TCreateUserData = {
  email: string;
  passwordHash: string;
  nickname?: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      omit: { passwordHash: true },
    });
  }

  create(data: TCreateUserData) {
    return this.prisma.user.create({
      data,
      omit: { passwordHash: true },
    });
  }

  updateProfile(userId: string, dto: UpdateUserProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        nickname: dto.nickname,
        avatarUrl: dto.avatarUrl,
      },
      omit: { passwordHash: true },
    });
  }
}
