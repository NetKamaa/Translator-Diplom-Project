-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "nickname" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" UUID NOT NULL,
    "sourceText" TEXT NOT NULL,
    "translatedText" TEXT NOT NULL,
    "sourceLanguage" TEXT NOT NULL,
    "targetLanguage" TEXT NOT NULL,
    "provider" TEXT,
    "modelName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DictionaryFolder" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "DictionaryFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DictionaryEntry" (
    "id" UUID NOT NULL,
    "sourceText" TEXT NOT NULL,
    "translatedText" TEXT NOT NULL,
    "sourceLanguage" TEXT NOT NULL,
    "targetLanguage" TEXT NOT NULL,
    "context" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "dictionaryFolderId" UUID,
    "translationId" UUID,

    CONSTRAINT "DictionaryEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashcardDeck" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "FlashcardDeck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" UUID NOT NULL,
    "frontText" TEXT NOT NULL,
    "backText" TEXT NOT NULL,
    "frontHint" TEXT,
    "backHint" TEXT,
    "sourceLanguage" TEXT,
    "targetLanguage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "flashcardDeckId" UUID,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Translation_userId_idx" ON "Translation"("userId");

-- CreateIndex
CREATE INDEX "Translation_createdAt_idx" ON "Translation"("createdAt");

-- CreateIndex
CREATE INDEX "Translation_sourceLanguage_targetLanguage_idx" ON "Translation"("sourceLanguage", "targetLanguage");

-- CreateIndex
CREATE INDEX "DictionaryFolder_userId_idx" ON "DictionaryFolder"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DictionaryFolder_userId_name_key" ON "DictionaryFolder"("userId", "name");

-- CreateIndex
CREATE INDEX "DictionaryEntry_userId_idx" ON "DictionaryEntry"("userId");

-- CreateIndex
CREATE INDEX "DictionaryEntry_dictionaryFolderId_idx" ON "DictionaryEntry"("dictionaryFolderId");

-- CreateIndex
CREATE INDEX "DictionaryEntry_translationId_idx" ON "DictionaryEntry"("translationId");

-- CreateIndex
CREATE INDEX "DictionaryEntry_createdAt_idx" ON "DictionaryEntry"("createdAt");

-- CreateIndex
CREATE INDEX "DictionaryEntry_sourceLanguage_targetLanguage_idx" ON "DictionaryEntry"("sourceLanguage", "targetLanguage");

-- CreateIndex
CREATE INDEX "FlashcardDeck_userId_idx" ON "FlashcardDeck"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FlashcardDeck_userId_name_key" ON "FlashcardDeck"("userId", "name");

-- CreateIndex
CREATE INDEX "Flashcard_userId_idx" ON "Flashcard"("userId");

-- CreateIndex
CREATE INDEX "Flashcard_flashcardDeckId_idx" ON "Flashcard"("flashcardDeckId");

-- CreateIndex
CREATE INDEX "Flashcard_createdAt_idx" ON "Flashcard"("createdAt");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DictionaryFolder" ADD CONSTRAINT "DictionaryFolder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DictionaryEntry" ADD CONSTRAINT "DictionaryEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DictionaryEntry" ADD CONSTRAINT "DictionaryEntry_dictionaryFolderId_fkey" FOREIGN KEY ("dictionaryFolderId") REFERENCES "DictionaryFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DictionaryEntry" ADD CONSTRAINT "DictionaryEntry_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "Translation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardDeck" ADD CONSTRAINT "FlashcardDeck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_flashcardDeckId_fkey" FOREIGN KEY ("flashcardDeckId") REFERENCES "FlashcardDeck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
