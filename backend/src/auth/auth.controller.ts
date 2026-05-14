import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

type TAuthenticatedUser = {
  id: string;
  email: string;
  nickname: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type TAuthenticatedRequest = {
  user: TAuthenticatedUser;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: TAuthenticatedRequest) {
    return req.user;
  }
}
