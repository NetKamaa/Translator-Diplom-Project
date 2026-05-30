import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { DictionaryEntriesModule } from './dictionary-entries/dictionary-entries.module.js';
import { DictionaryFoldersModule } from './dictionary-folders/dictionary-folders.module.js';
import { FlashcardDecksModule } from './flashcard-decks/flashcard-decks.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { TranslationsController } from './translations/translations.controller.js';
import { TranslationsModule } from './translations/translations.module.js';
import { TranslationsService } from './translations/translations.service.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    TranslationsModule,
    DictionaryFoldersModule,
    DictionaryEntriesModule,
    FlashcardDecksModule,
  ],
  controllers: [TranslationsController],
  providers: [TranslationsService],
})
export class AppModule {}
