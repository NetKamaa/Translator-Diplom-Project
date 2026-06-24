import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import {
  getFlashcardDecks,
  getFlashcards,
} from "@/features/flashcards/api/flashcards.api";
import type {
  TFlashcard,
  TFlashcardDeck,
} from "@/features/flashcards/types/flashcards.types";

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

export function FlashcardPracticePage() {
  const [decks, setDecks] = useState<TFlashcardDeck[]>([]);
  const [flashcards, setFlashcards] = useState<TFlashcard[]>([]);

  const [selectedDeckId, setSelectedDeckId] = useState("all");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const [rememberedCount, setRememberedCount] = useState(0);
  const [needPracticeCount, setNeedPracticeCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPracticeData() {
      try {
        setError("");

        const [decksData, flashcardsData] = await Promise.all([
          getFlashcardDecks(),
          getFlashcards(),
        ]);

        setDecks(decksData);
        setFlashcards(flashcardsData);
      } catch {
        setError("Failed to load flashcards");
      } finally {
        setIsLoading(false);
      }
    }

    loadPracticeData();
  }, []);

  const deckById = useMemo(() => {
    return decks.reduce<Record<string, TFlashcardDeck>>((acc, deck) => {
      acc[deck.id] = deck;

      return acc;
    }, {});
  }, [decks]);

  const practiceFlashcards = useMemo(() => {
    if (selectedDeckId === "all") {
      return flashcards;
    }

    if (selectedDeckId === "without-deck") {
      return flashcards.filter((flashcard) => !flashcard.flashcardDeckId);
    }

    return flashcards.filter(
      (flashcard) => flashcard.flashcardDeckId === selectedDeckId,
    );
  }, [flashcards, selectedDeckId]);

  const currentFlashcard = practiceFlashcards[currentIndex] ?? null;

  const isFinished =
    practiceFlashcards.length > 0 && currentIndex >= practiceFlashcards.length;

  useEffect(() => {
    resetPracticeSession();
  }, [selectedDeckId, flashcards.length]);

  function resetPracticeSession() {
    setCurrentIndex(0);
    setIsAnswerVisible(false);
    setRememberedCount(0);
    setNeedPracticeCount(0);
  }

  function handleAnswer(isRemembered: boolean) {
    if (isRemembered) {
      setRememberedCount((currentCount) => currentCount + 1);
    } else {
      setNeedPracticeCount((currentCount) => currentCount + 1);
    }

    setCurrentIndex((currentIndexValue) => currentIndexValue + 1);
    setIsAnswerVisible(false);
  }

  if (isLoading) {
    return <p className="text-muted-foreground">Loading practice mode...</p>;
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-bold">Flashcard practice</h1>
          <p className="text-muted-foreground">
            Review your cards and track how many you remember.
          </p>
        </div>

        <Button variant="outline" asChild>
          <Link to="/flashcards">Back to flashcards</Link>
        </Button>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Card>
        <CardHeader>
          <CardTitle>Practice settings</CardTitle>
          <CardDescription>
            Choose which deck you want to practice.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="max-w-sm space-y-2">
            <Label>Deck</Label>

            <Select value={selectedDeckId} onValueChange={setSelectedDeckId}>
              <SelectTrigger>
                <SelectValue placeholder="Select deck" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All flashcards</SelectItem>
                <SelectItem value="without-deck">Without deck</SelectItem>

                {decks.map((deck) => (
                  <SelectItem key={deck.id} value={deck.id}>
                    <span style={{ color: deck.color ?? "#111827" }}>
                      {deck.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {practiceFlashcards.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No cards to practice</CardTitle>
            <CardDescription>
              Create flashcards first, then come back to practice.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button asChild>
              <Link to="/flashcards">Create flashcards</Link>
            </Button>
          </CardContent>
        </Card>
      ) : isFinished ? (
        <Card>
          <CardHeader>
            <CardTitle>Practice completed</CardTitle>
            <CardDescription>
              You reviewed {practiceFlashcards.length} cards.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">Remembered</p>
                <p className="text-4xl font-bold">{rememberedCount}</p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">Need practice</p>
                <p className="text-4xl font-bold">{needPracticeCount}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={resetPracticeSession}>Practice again</Button>

              <Button variant="outline" asChild>
                <Link to="/flashcards">Back to flashcards</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : currentFlashcard ? (
        <Card>
          <CardHeader>
            <CardTitle>
              Card {currentIndex + 1} of {practiceFlashcards.length}
            </CardTitle>

            <CardDescription>
              {currentFlashcard.flashcardDeckId ? (
                <span
                  style={{
                    color:
                      deckById[currentFlashcard.flashcardDeckId]?.color ??
                      "#111827",
                  }}
                >
                  {deckById[currentFlashcard.flashcardDeckId]?.name ??
                    "Unknown deck"}
                </span>
              ) : (
                "Without deck"
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-2xl border bg-muted/40 p-8 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Front</p>

              <p className="text-3xl font-bold">{currentFlashcard.frontText}</p>

              {currentFlashcard.frontHint ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Hint: {currentFlashcard.frontHint}
                </p>
              ) : null}
            </div>

            {isAnswerVisible ? (
              <div className="rounded-2xl border p-8 text-center">
                <p className="mb-2 text-sm text-muted-foreground">Back</p>

                <p className="text-2xl font-semibold">
                  {currentFlashcard.backText}
                </p>

                {currentFlashcard.backHint ? (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Hint: {currentFlashcard.backHint}
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              {!isAnswerVisible ? (
                <Button onClick={() => setIsAnswerVisible(true)}>
                  Show answer
                </Button>
              ) : (
                <>
                  <Button onClick={() => handleAnswer(true)}>
                    I remembered
                  </Button>

                  <Button variant="outline" onClick={() => handleAnswer(false)}>
                    Need practice
                  </Button>
                </>
              )}

              <Button variant="ghost" onClick={resetPracticeSession}>
                Restart
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
