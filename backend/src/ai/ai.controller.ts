import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AiService } from './ai.service.js';
import { TranslateDto } from './dto/translate.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('translate')
  translate(@Body() dto: TranslateDto) {
    return this.aiService.translate(dto);
  }
}
