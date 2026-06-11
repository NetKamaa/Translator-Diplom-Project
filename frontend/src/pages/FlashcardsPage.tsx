import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router";

import {
  createFlashcard,
  createFlashcardDeck,
  deleteFlashcard,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function FlashcardsPage() {
  const [decks, setDecks] = useState<TFlashcardDeck[]>([]);
  const [flashcards, setFlashcards] = useState<TFlashcard[]>([]);

  const [selectedDeckId, setSelectedDeckId] = useState("all");

  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [deckColor, setDeckColor] = useState("#111827");

  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [frontHint, setFrontHint] = useState("");
  const [backHint, setBackHint] = useState("");

  const [isCreateDeckDialogOpen, setIsCreateDeckDialogOpen] = useState(false);
  const [isCreateCardDialogOpen, setIsCreateCardDialogOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);
  const [isCreatingCard, setIsCreatingCard] = useState(false);

  const [error, setError] = useState("");
  const [deckError, setDeckError] = useState("");
  const [cardError, setCardError] = useState("");

  useEffect(() => {
    async function loadFlashcardsData() {
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

    loadFlashcardsData();
  }, []);

  const deckById = useMemo(() => {
    return decks.reduce<Record<string, TFlashcardDeck>>((acc, deck) => {
      acc[deck.id] = deck;

      return acc;
    }, {});
  }, [decks]);

  const filteredFlashcards = useMemo(() => {
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

  async function handleCreateDeck(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!deckName.trim()) {
      setDeckError("Deck name is required");
      return;
    }

    setDeckError("");
    setIsCreatingDeck(true);

    try {
      const createdDeck = await createFlashcardDeck({
        name: deckName.trim(),
        description: deckDescription.trim() || undefined,
        color: deckColor.trim() || undefined,
      });

      setDecks((currentDecks) => [createdDeck, ...currentDecks]);

      setDeckName("");
      setDeckDescription("");
      setDeckColor("#111827");
      setIsCreateDeckDialogOpen(false);
    } catch {
      setDeckError("Failed to create flashcard deck");
    } finally {
      setIsCreatingDeck(false);
    }
  }

  async function handleCreateFlashcard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!frontText.trim()) {
      setCardError("Front text is required");
      return;
    }

    if (!backText.trim()) {
      setCardError("Back text is required");
      return;
    }

    setCardError("");
    setIsCreatingCard(true);

    try {
      const createdFlashcard = await createFlashcard({
        frontText: frontText.trim(),
        backText: backText.trim(),
        frontHint: frontHint.trim() || undefined,
        backHint: backHint.trim() || undefined,
        flashcardDeckId:
          selectedDeckId === "all" || selectedDeckId === "without-deck"
            ? undefined
            : selectedDeckId,
      });

      setFlashcards((currentFlashcards) => [
        createdFlashcard,
        ...currentFlashcards,
      ]);

      setFrontText("");
      setBackText("");
      setFrontHint("");
      setBackHint("");
      setIsCreateCardDialogOpen(false);
    } catch {
      setCardError("Failed to create flashcard");
    } finally {
      setIsCreatingCard(false);
    }
  }

  async function handleDeleteFlashcard(id: string) {
    try {
      await deleteFlashcard(id);

      setFlashcards((currentFlashcards) =>
        currentFlashcards.filter((flashcard) => flashcard.id !== id),
      );
    } catch {
      setError("Failed to delete flashcard");
    }
  }

  if (isLoading) {
    return <p className="text-muted-foreground">Loading flashcards...</p>;
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-bold">Flashcards</h1>
          <p className="text-muted-foreground">
            Create decks and practice saved words with cards.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/flashcards/practice">Practice</Link>
          </Button>
          <Dialog
            open={isCreateDeckDialogOpen}
            onOpenChange={(open) => {
              setIsCreateDeckDialogOpen(open);

              if (open) {
                setDeckError("");
              }
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline">Create deck</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create flashcard deck</DialogTitle>
                <DialogDescription>
                  Add a deck to organize your flashcards.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-5" onSubmit={handleCreateDeck}>
                <div className="space-y-2">
                  <Label htmlFor="deckName">Name</Label>

                  <Input
                    id="deckName"
                    value={deckName}
                    placeholder="English A1"
                    onChange={(event) => {
                      setDeckName(event.target.value);
                      setDeckError("");
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deckDescription">Description</Label>

                  <Textarea
                    id="deckDescription"
                    value={deckDescription}
                    placeholder="Basic English vocabulary"
                    className="resize-none"
                    onChange={(event) => setDeckDescription(event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deckColor">Color</Label>

                  <Input
                    id="deckColor"
                    type="color"
                    value={deckColor}
                    onChange={(event) => setDeckColor(event.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-full p-1"
                  />
                </div>

                {deckError ? (
                  <p className="text-sm text-destructive">{deckError}</p>
                ) : null}

                <Button type="submit" disabled={isCreatingDeck}>
                  {isCreatingDeck ? "Creating..." : "Create deck"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isCreateCardDialogOpen}
            onOpenChange={(open) => {
              setIsCreateCardDialogOpen(open);

              if (open) {
                setCardError("");
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>Create flashcard</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create flashcard</DialogTitle>
                <DialogDescription>
                  Add a new card to practice later.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-5" onSubmit={handleCreateFlashcard}>
                <div className="space-y-2">
                  <Label htmlFor="frontText">Front text</Label>

                  <Textarea
                    id="frontText"
                    value={frontText}
                    placeholder="hello"
                    className="resize-none"
                    onChange={(event) => {
                      setFrontText(event.target.value);
                      setCardError("");
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backText">Back text</Label>

                  <Textarea
                    id="backText"
                    value={backText}
                    placeholder="привет"
                    className="resize-none"
                    onChange={(event) => {
                      setBackText(event.target.value);
                      setCardError("");
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frontHint">Front hint</Label>

                  <Input
                    id="frontHint"
                    value={frontHint}
                    placeholder="Greeting"
                    onChange={(event) => setFrontHint(event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backHint">Back hint</Label>

                  <Input
                    id="backHint"
                    value={backHint}
                    placeholder="Basic word"
                    onChange={(event) => setBackHint(event.target.value)}
                  />
                </div>

                {cardError ? (
                  <p className="text-sm text-destructive">{cardError}</p>
                ) : null}

                <Button type="submit" disabled={isCreatingCard}>
                  {isCreatingCard ? "Creating..." : "Create flashcard"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Card>
        <CardHeader>
          <CardTitle>Filter</CardTitle>
          <CardDescription>
            Show all flashcards or only cards from a selected deck.
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

      <Card>
        <CardHeader>
          <CardTitle>Cards</CardTitle>
          <CardDescription>
            {filteredFlashcards.length}{" "}
            {filteredFlashcards.length === 1 ? "card" : "cards"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {filteredFlashcards.length === 0 ? (
            <p className="text-sm text-muted-foreground">No flashcards yet.</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {filteredFlashcards.map((flashcard) => (
                <div key={flashcard.id} className="rounded-xl border p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-xs text-muted-foreground">
                        {flashcard.flashcardDeckId ? (
                          <span
                            style={{
                              color:
                                deckById[flashcard.flashcardDeckId]?.color ??
                                "#111827",
                            }}
                          >
                            {deckById[flashcard.flashcardDeckId]?.name ??
                              "Unknown deck"}
                          </span>
                        ) : (
                          <span>Without deck</span>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteFlashcard(flashcard.id)}
                      >
                        Delete
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Front</p>
                        <p className="font-medium">{flashcard.frontText}</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Back</p>
                        <p className="text-muted-foreground">
                          {flashcard.backText}
                        </p>
                      </div>
                    </div>

                    {flashcard.frontHint || flashcard.backHint ? (
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {flashcard.frontHint ? (
                          <p>Front hint: {flashcard.frontHint}</p>
                        ) : null}

                        {flashcard.backHint ? (
                          <p>Back hint: {flashcard.backHint}</p>
                        ) : null}
                      </div>
                    ) : null}
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
