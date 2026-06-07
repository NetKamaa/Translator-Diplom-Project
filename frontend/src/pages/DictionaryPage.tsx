import { useEffect, useMemo, useState, type FormEvent } from "react";

import {
  createDictionaryFolder,
  deleteDictionaryEntry,
  getDictionaryEntries,
  getDictionaryFolders,
} from "@/features/dictionary/api/dictionary.api";
import type {
  TDictionaryEntry,
  TDictionaryFolder,
} from "@/features/dictionary/types/dictionary.types";
import {
  createFlashcard,
  getFlashcardDecks,
} from "@/features/flashcards/api/flashcards.api";
import type { TFlashcardDeck } from "@/features/flashcards/types/flashcards.types";

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

export function DictionaryPage() {
  const [folders, setFolders] = useState<TDictionaryFolder[]>([]);
  const [entries, setEntries] = useState<TDictionaryEntry[]>([]);

  const [selectedFolderId, setSelectedFolderId] = useState("all");

  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [folderColor, setFolderColor] = useState("#3b82f6");

  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
    useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const [error, setError] = useState("");
  const [folderError, setFolderError] = useState("");

  const [flashcardDecks, setFlashcardDecks] = useState<TFlashcardDeck[]>([]);

  const [selectedEntryForFlashcard, setSelectedEntryForFlashcard] =
    useState<TDictionaryEntry | null>(null);

  const [flashcardDeckId, setFlashcardDeckId] = useState("none");
  const [flashcardFrontText, setFlashcardFrontText] = useState("");
  const [flashcardBackText, setFlashcardBackText] = useState("");
  const [flashcardFrontHint, setFlashcardFrontHint] = useState("");
  const [flashcardBackHint, setFlashcardBackHint] = useState("");

  const [isCreateFlashcardDialogOpen, setIsCreateFlashcardDialogOpen] =
    useState(false);

  const [isCreatingFlashcard, setIsCreatingFlashcard] = useState(false);

  const [flashcardError, setFlashcardError] = useState("");
  const [flashcardMessage, setFlashcardMessage] = useState("");

  useEffect(() => {
    async function loadDictionary() {
      try {
        setError("");

        const [foldersData, entriesData, flashcardDecksData] =
          await Promise.all([
            getDictionaryFolders(),
            getDictionaryEntries(),
            getFlashcardDecks(),
          ]);

        setFolders(foldersData);
        setEntries(entriesData);
        setFlashcardDecks(flashcardDecksData);
      } catch {
        setError("Failed to load dictionary");
      } finally {
        setIsLoading(false);
      }
    }

    loadDictionary();
  }, []);

  const folderNameById = useMemo(() => {
    return folders.reduce<Record<string, string>>((acc, folder) => {
      acc[folder.id] = folder.name;

      return acc;
    }, {});
  }, [folders]);

  const filteredEntries = useMemo(() => {
    if (selectedFolderId === "all") {
      return entries;
    }

    if (selectedFolderId === "without-folder") {
      return entries.filter((entry) => !entry.dictionaryFolderId);
    }

    return entries.filter(
      (entry) => entry.dictionaryFolderId === selectedFolderId,
    );
  }, [entries, selectedFolderId]);

  async function handleCreateFolder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!folderName.trim()) {
      setFolderError("Folder name is required");
      return;
    }

    setFolderError("");
    setIsCreatingFolder(true);

    try {
      const createdFolder = await createDictionaryFolder({
        name: folderName.trim(),
        description: folderDescription.trim() || undefined,
        color: folderColor.trim() || undefined,
      });

      setFolders((currentFolders) => [createdFolder, ...currentFolders]);

      setFolderName("");
      setFolderDescription("");
      setFolderColor("#3b82f6");
      setIsCreateFolderDialogOpen(false);
    } catch {
      setFolderError("Failed to create dictionary folder");
    } finally {
      setIsCreatingFolder(false);
    }
  }

  async function handleDeleteEntry(id: string) {
    try {
      await deleteDictionaryEntry(id);

      setEntries((currentEntries) =>
        currentEntries.filter((entry) => entry.id !== id),
      );
    } catch {
      setError("Failed to delete dictionary entry");
    }
  }

  function handleOpenCreateFlashcardDialog(entry: TDictionaryEntry) {
    setSelectedEntryForFlashcard(entry);

    setFlashcardFrontText(entry.sourceText);
    setFlashcardBackText(entry.translatedText);
    setFlashcardFrontHint("");
    setFlashcardBackHint("");
    setFlashcardDeckId("none");

    setFlashcardError("");
    setFlashcardMessage("");

    setIsCreateFlashcardDialogOpen(true);
  }

  async function handleCreateFlashcardFromEntry(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!selectedEntryForFlashcard) {
      setFlashcardError("Dictionary entry is not selected");
      return;
    }

    if (!flashcardFrontText.trim()) {
      setFlashcardError("Front text is required");
      return;
    }

    if (!flashcardBackText.trim()) {
      setFlashcardError("Back text is required");
      return;
    }

    setFlashcardError("");
    setIsCreatingFlashcard(true);

    try {
      await createFlashcard({
        frontText: flashcardFrontText.trim(),
        backText: flashcardBackText.trim(),
        frontHint: flashcardFrontHint.trim() || undefined,
        backHint: flashcardBackHint.trim() || undefined,
        sourceLanguage: selectedEntryForFlashcard.sourceLanguage,
        targetLanguage: selectedEntryForFlashcard.targetLanguage,
        flashcardDeckId:
          flashcardDeckId === "none" ? undefined : flashcardDeckId,
      });

      setFlashcardMessage("Flashcard created");

      setSelectedEntryForFlashcard(null);
      setFlashcardFrontText("");
      setFlashcardBackText("");
      setFlashcardFrontHint("");
      setFlashcardBackHint("");
      setFlashcardDeckId("none");

      setIsCreateFlashcardDialogOpen(false);
    } catch {
      setFlashcardError("Failed to create flashcard");
    } finally {
      setIsCreatingFlashcard(false);
    }
  }

  if (isLoading) {
    return <p className="text-muted-foreground">Loading dictionary...</p>;
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-bold">Dictionary</h1>
          <p className="text-muted-foreground">
            Manage saved words and phrases from your translations.
          </p>
        </div>

        <Dialog
          open={isCreateFolderDialogOpen}
          onOpenChange={(open) => {
            setIsCreateFolderDialogOpen(open);

            if (open) {
              setFolderError("");
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>Create folder</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create dictionary folder</DialogTitle>
              <DialogDescription>
                Add a folder to organize your saved words.
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-5" onSubmit={handleCreateFolder}>
              <div className="space-y-2">
                <Label htmlFor="folderName">Name</Label>

                <Input
                  id="folderName"
                  value={folderName}
                  placeholder="English words"
                  onChange={(event) => {
                    setFolderName(event.target.value);
                    setFolderError("");
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="folderDescription">Description</Label>

                <Textarea
                  id="folderDescription"
                  value={folderDescription}
                  placeholder="Words for daily practice"
                  className="resize-none"
                  onChange={(event) => setFolderDescription(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="folderColor">Color</Label>

                <Input
                  id="folderColor"
                  value={folderColor}
                  placeholder="#3b82f6"
                  onChange={(event) => setFolderColor(event.target.value)}
                />
              </div>

              {folderError ? (
                <p className="text-sm text-destructive">{folderError}</p>
              ) : null}

              <Button type="submit" disabled={isCreatingFolder}>
                {isCreatingFolder ? "Creating..." : "Create folder"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Card>
        <CardHeader>
          <CardTitle>Filter</CardTitle>
          <CardDescription>
            Show all entries or only entries from a selected folder.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="max-w-sm space-y-2">
            <Label>Folder</Label>

            <Select
              value={selectedFolderId}
              onValueChange={setSelectedFolderId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select folder" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All entries</SelectItem>
                <SelectItem value="without-folder">Without folder</SelectItem>

                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isCreateFlashcardDialogOpen}
        onOpenChange={(open) => {
          setIsCreateFlashcardDialogOpen(open);

          if (open) {
            setFlashcardError("");
            setFlashcardMessage("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create flashcard</DialogTitle>
            <DialogDescription>
              Create a flashcard from this dictionary entry.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-5" onSubmit={handleCreateFlashcardFromEntry}>
            <div className="space-y-2">
              <Label>Deck</Label>

              <Select
                value={flashcardDeckId}
                onValueChange={setFlashcardDeckId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select deck" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="none">Without deck</SelectItem>

                  {flashcardDecks.map((deck) => (
                    <SelectItem key={deck.id} value={deck.id}>
                      {deck.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="flashcardFrontText">Front text</Label>

              <Textarea
                id="flashcardFrontText"
                value={flashcardFrontText}
                className="resize-none"
                onChange={(event) => {
                  setFlashcardFrontText(event.target.value);
                  setFlashcardError("");
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flashcardBackText">Back text</Label>

              <Textarea
                id="flashcardBackText"
                value={flashcardBackText}
                className="resize-none"
                onChange={(event) => {
                  setFlashcardBackText(event.target.value);
                  setFlashcardError("");
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flashcardFrontHint">Front hint</Label>

              <Input
                id="flashcardFrontHint"
                value={flashcardFrontHint}
                placeholder="Optional hint"
                onChange={(event) => setFlashcardFrontHint(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flashcardBackHint">Back hint</Label>

              <Input
                id="flashcardBackHint"
                value={flashcardBackHint}
                placeholder="Optional hint"
                onChange={(event) => setFlashcardBackHint(event.target.value)}
              />
            </div>

            {flashcardError ? (
              <p className="text-sm text-destructive">{flashcardError}</p>
            ) : null}

            {flashcardMessage ? (
              <p className="text-sm text-muted-foreground">
                {flashcardMessage}
              </p>
            ) : null}

            <Button type="submit" disabled={isCreatingFlashcard}>
              {isCreatingFlashcard ? "Creating..." : "Create flashcard"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Saved entries</CardTitle>
          <CardDescription>
            {filteredEntries.length} saved{" "}
            {filteredEntries.length === 1 ? "entry" : "entries"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {filteredEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No dictionary entries yet.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="rounded-xl border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>
                          {entry.sourceLanguage} → {entry.targetLanguage}
                        </span>

                        <span>·</span>

                        <span>
                          {entry.dictionaryFolderId
                            ? (folderNameById[entry.dictionaryFolderId] ??
                              "Unknown folder")
                            : "Without folder"}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium">{entry.sourceText}</p>
                        <p className="text-muted-foreground">
                          {entry.translatedText}
                        </p>
                      </div>

                      {entry.note ? (
                        <p className="text-sm text-muted-foreground">
                          Note: {entry.note}
                        </p>
                      ) : null}

                      {entry.context ? (
                        <p className="text-sm text-muted-foreground">
                          Context: {entry.context}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenCreateFlashcardDialog(entry)}
                      >
                        Create flashcard
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteEntry(entry.id)}
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
