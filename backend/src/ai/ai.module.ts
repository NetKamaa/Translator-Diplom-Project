import { Module } from '@nestjs/common';
import { AiController } from './ai.controller.js';
import { AiService } from './ai.service.js';

@Module({
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule {}
