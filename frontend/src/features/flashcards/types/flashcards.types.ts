export type TFlashcardDeck = {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type TCreateFlashcardDeckRequest = {
  name: string;
  description?: string;
  color?: string;
};

export type TFlashcard = {
  id: string;
  frontText: string;
  backText: string;
  frontHint: string | null;
  backHint: string | null;
  sourceLanguage: string | null;
  targetLanguage: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  flashcardDeckId: string | null;
};

export type TCreateFlashcardRequest = {
  frontText: string;
  backText: string;
  frontHint?: string;
  backHint?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  flashcardDeckId?: string;
};
