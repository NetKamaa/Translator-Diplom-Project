export type TCreateTranslationData = {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  provider?: string;
  modelName?: string;
};
