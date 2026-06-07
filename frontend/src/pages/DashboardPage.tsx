import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { getDictionaryEntries } from "@/features/dictionary/api/dictionary.api";
import type { TDictionaryEntry } from "@/features/dictionary/types/dictionary.types";
import { getFlashcards } from "@/features/flashcards/api/flashcards.api";
import type { TFlashcard } from "@/features/flashcards/types/flashcards.types";
import { getTranslations } from "@/features/translations/api/translations.api";
import type { TTranslation } from "@/features/translations/types/translation.types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DashboardPage() {
  const [translations, setTranslations] = useState<TTranslation[]>([]);
  const [dictionaryEntries, setDictionaryEntries] = useState<
    TDictionaryEntry[]
  >([]);
  const [flashcards, setFlashcards] = useState<TFlashcard[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setError("");

        const [translationsData, dictionaryEntriesData, flashcardsData] =
          await Promise.all([
            getTranslations(),
            getDictionaryEntries(),
            getFlashcards(),
          ]);

        setTranslations(translationsData);
        setDictionaryEntries(dictionaryEntriesData);
        setFlashcards(flashcardsData);
      } catch {
        setError("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const latestTranslations = useMemo(() => {
    return translations.slice(0, 5);
  }, [translations]);

  if (isLoading) {
    return <p className="text-muted-foreground">Loading dashboard...</p>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your translations, dictionary and flashcards.
          </p>
        </div>

        <div className="flex gap-3">
          <Button asChild>
            <Link to="/translate">Translate text</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to="/flashcards">Open flashcards</Link>
          </Button>
        </div>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Translations</CardTitle>
            <CardDescription>Saved translation history</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">{translations.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dictionary</CardTitle>
            <CardDescription>Saved words and phrases</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">{dictionaryEntries.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flashcards</CardTitle>
            <CardDescription>Cards for practice</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">{flashcards.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Latest translations</CardTitle>
            <CardDescription>
              Your most recent translation results.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {latestTranslations.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No translations yet.
              </p>
            ) : (
              <div className="space-y-3">
                {latestTranslations.map((translation) => (
                  <div key={translation.id} className="rounded-xl border p-4">
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        {translation.sourceLanguage} →{" "}
                        {translation.targetLanguage}
                      </div>

                      <div>
                        <p className="font-medium">{translation.sourceText}</p>

                        <p className="text-muted-foreground">
                          {translation.translatedText}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>
              Continue working with your learning materials.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button className="w-full justify-start" asChild>
              <Link to="/translate">New translation</Link>
            </Button>

            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/dictionary">Open dictionary</Link>
            </Button>

            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/flashcards">Practice flashcards</Link>
            </Button>

            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/profile">Edit profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
