export type TDictionaryFolder = {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type TCreateDictionaryFolderRequest = {
  name: string;
  description?: string;
  color?: string;
};

export type TDictionaryEntry = {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  context: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  dictionaryFolderId: string | null;
  translationId: string | null;
};

export type TCreateDictionaryEntryRequest = {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  context?: string;
  note?: string;
  dictionaryFolderId?: string;
  translationId?: string;
};
