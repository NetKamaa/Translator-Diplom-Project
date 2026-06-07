export type TTranslateRequest = {
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
};

export type TTranslation = {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  provider: string | null;
  modelName: string | null;
  createdAt: string;
  userId: string;
};
