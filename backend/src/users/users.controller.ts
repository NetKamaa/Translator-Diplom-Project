import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { TRequestWithUser } from '../auth/types/request-with-user.type.js';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto.js';
import { UsersService } from './users.service.js';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getById(@Req() req: TRequestWithUser) {
    return this.usersService.getById(req.user.id);
  }

  @Patch('me')
  patch(@Req() req: TRequestWithUser, @Body() dto: UpdateUserProfileDto) {
    return this.usersService.updateProfile(req.user.id, dto);
  }
}
