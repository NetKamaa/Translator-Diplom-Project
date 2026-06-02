import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { TRequestWithUser } from '../auth/types/request-with-user.type.js';
import { AiService } from './ai.service.js';
import { TranslateDto } from './dto/translate.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('translate')
  translate(@Req() req: TRequestWithUser, @Body() dto: TranslateDto) {
    return this.aiService.translate(req.user.id, dto);
  }
}
