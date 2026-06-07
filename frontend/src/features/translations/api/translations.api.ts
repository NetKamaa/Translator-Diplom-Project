import { api } from "@/lib/api";

import type { TTranslation } from "../types/translation.types";

export async function getTranslations(): Promise<TTranslation[]> {
  const response = await api.get<TTranslation[]>("/translations");

  return response.data;
}

export async function deleteTranslation(id: string): Promise<TTranslation> {
  const response = await api.delete<TTranslation>(`/translations/${id}`);

  return response.data;
}
