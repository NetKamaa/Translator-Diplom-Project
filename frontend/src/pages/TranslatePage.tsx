import { useEffect, useState, type FormEvent } from "react";

import { translateText } from "@/features/translate/api/translate.api";
import type { TTranslation } from "@/features/translations/types/translation.types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  createDictionaryEntry,
  getDictionaryFolders,
} from "@/features/dictionary/api/dictionary.api";
import type { TDictionaryFolder } from "@/features/dictionary/types/dictionary.types";
import {
  deleteTranslation,
  getTranslations,
} from "@/features/translations/api/translations.api";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "ru", label: "Russian" },
  { value: "de", label: "German" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
];

export function TranslatePage() {
  const [sourceText, setSourceText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("ru");

  const [translation, setTranslation] = useState<TTranslation | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [translations, setTranslations] = useState<TTranslation[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  const [dictionaryFolders, setDictionaryFolders] = useState<
    TDictionaryFolder[]
  >([]);

  const [selectedDictionaryFolderId, setSelectedDictionaryFolderId] =
    useState<string>("none");

  const [isSavingToDictionary, setIsSavingToDictionary] = useState(false);
  const [dictionaryMessage, setDictionaryMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [translationsData, foldersData] = await Promise.all([
          getTranslations(),
          getDictionaryFolders(),
        ]);

        setTranslations(translationsData);
        setDictionaryFolders(foldersData);
      } catch {
        setError("Failed to load page data");
      } finally {
        setIsHistoryLoading(false);
      }
    }

    loadData();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!sourceText.trim()) {
      setError("Enter text to translate");
      return;
    }

    setError("");
    setTranslation(null);
    setIsLoading(true);

    try {
      const data = await translateText({
        sourceText: sourceText.trim(),
        sourceLanguage,
        targetLanguage,
      });

      setTranslation(data);
      setTranslations((currentTranslations) => [data, ...currentTranslations]);
    } catch {
      setError("Failed to translate text");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteTranslation(id: string) {
    try {
      await deleteTranslation(id);

      setTranslations((currentTranslations) =>
        currentTranslations.filter(
          (translationItem) => translationItem.id !== id,
        ),
      );

      if (translation?.id === id) {
        setTranslation(null);
      }
    } catch {
      setError("Failed to delete translation");
    }
  }

  function handleSwapLanguages() {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);

    setSourceText(translation?.translatedText ?? sourceText);
    setTranslation(null);
  }

  async function handleSaveToDictionary(translationItem: TTranslation) {
    setError("");
    setDictionaryMessage("");
    setIsSavingToDictionary(true);

    try {
      await createDictionaryEntry({
        sourceText: translationItem.sourceText,
        translatedText: translationItem.translatedText,
        sourceLanguage: translationItem.sourceLanguage,
        targetLanguage: translationItem.targetLanguage,
        translationId: translationItem.id,
        dictionaryFolderId:
          selectedDictionaryFolderId === "none"
            ? undefined
            : selectedDictionaryFolderId,
      });

      setDictionaryMessage("Translation saved to dictionary");
    } catch {
      setError("Failed to save translation to dictionary");
    } finally {
      setIsSavingToDictionary(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Translate</h1>
        <p className="text-muted-foreground">
          Translate text and save it to your history.
        </p>
      </div>

      <form className="grid gap-6 lg:grid-cols-2" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1 space-y-1.5">
                <CardTitle>Source text</CardTitle>
                <CardDescription>
                  Enter the text you want to translate.
                </CardDescription>
              </div>

              <div className="w-full shrink-0 space-y-2 sm:ml-auto sm:w-40">
                <Select
                  value={sourceLanguage}
                  onValueChange={setSourceLanguage}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select source language" />
                  </SelectTrigger>

                  <SelectContent>
                    {languageOptions.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="sourceText">Text to translate</Label>

              <Textarea
                id="sourceText"
                value={sourceText}
                placeholder="Enter text here..."
                className="min-h-48 resize-none"
                onChange={(event) => setSourceText(event.target.value)}
              />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <div className="flex gap-3">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Translating..." : "Translate"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleSwapLanguages}
              >
                Swap languages
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1 space-y-1.5">
                <CardTitle>Translation</CardTitle>
                <CardDescription>
                  The result will be saved to translation history.
                </CardDescription>
              </div>

              <div className="w-full shrink-0 space-y-2 sm:ml-auto sm:w-40">
                <Select
                  value={targetLanguage}
                  onValueChange={setTargetLanguage}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>

                  <SelectContent>
                    {languageOptions.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-2">
            <Label>Translated text</Label>

            <div className="min-h-48 rounded-md border bg-muted/40 p-4">
              {translation ? (
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap text-lg">
                    {translation.translatedText}
                  </p>

                  <div className="text-xs text-muted-foreground">
                    Provider: {translation.provider ?? "unknown"} · Model:{" "}
                    {translation.modelName ?? "unknown"}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Translation result will appear here.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Dictionary saving</CardTitle>
          <CardDescription>
            Choose a folder where translations will be saved.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label>Dictionary folder</Label>

            <Select
              value={selectedDictionaryFolderId}
              onValueChange={setSelectedDictionaryFolderId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select dictionary folder" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="none">Without folder</SelectItem>

                {dictionaryFolders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {dictionaryMessage ? (
            <p className="text-sm text-muted-foreground">{dictionaryMessage}</p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Translation history</CardTitle>
          <CardDescription>Your latest saved translations.</CardDescription>
        </CardHeader>

        <CardContent>
          {isHistoryLoading ? (
            <p className="text-sm text-muted-foreground">
              Loading translation history...
            </p>
          ) : translations.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You do not have translations yet.
            </p>
          ) : (
            <div className="space-y-3">
              {translations.map((translationItem) => (
                <div key={translationItem.id} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        {translationItem.sourceLanguage} →{" "}
                        {translationItem.targetLanguage}
                      </div>

                      <div>
                        <p className="font-medium">
                          {translationItem.sourceText}
                        </p>

                        <p className="text-muted-foreground">
                          {translationItem.translatedText}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isSavingToDictionary}
                        onClick={() => handleSaveToDictionary(translationItem)}
                      >
                        Save
                      </Button>

                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleDeleteTranslation(translationItem.id)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
