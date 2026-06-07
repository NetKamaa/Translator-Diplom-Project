import { api } from "@/lib/api";

import type {
  TCreateFlashcardDeckRequest,
  TCreateFlashcardRequest,
  TFlashcard,
  TFlashcardDeck,
} from "../types/flashcards.types";

export async function getFlashcardDecks(): Promise<TFlashcardDeck[]> {
  const response = await api.get<TFlashcardDeck[]>("/flashcard-decks");

  return response.data;
}

export async function createFlashcardDeck(
  data: TCreateFlashcardDeckRequest,
): Promise<TFlashcardDeck> {
  const response = await api.post<TFlashcardDeck>("/flashcard-decks", data);

  return response.data;
}

export async function getFlashcards(): Promise<TFlashcard[]> {
  const response = await api.get<TFlashcard[]>("/flashcards");

  return response.data;
}

export async function createFlashcard(
  data: TCreateFlashcardRequest,
): Promise<TFlashcard> {
  const response = await api.post<TFlashcard>("/flashcards", data);

  return response.data;
}

export async function deleteFlashcard(id: string): Promise<TFlashcard> {
  const response = await api.delete<TFlashcard>(`/flashcards/${id}`);

  return response.data;
}
