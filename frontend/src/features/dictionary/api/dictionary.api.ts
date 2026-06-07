import { api } from "@/lib/api";

import type {
  TCreateDictionaryEntryRequest,
  TCreateDictionaryFolderRequest,
  TDictionaryEntry,
  TDictionaryFolder,
} from "../types/dictionary.types";

export async function getDictionaryFolders(): Promise<TDictionaryFolder[]> {
  const response = await api.get<TDictionaryFolder[]>("/dictionary-folders");

  return response.data;
}

export async function createDictionaryFolder(
  data: TCreateDictionaryFolderRequest,
): Promise<TDictionaryFolder> {
  const response = await api.post<TDictionaryFolder>(
    "/dictionary-folders",
    data,
  );

  return response.data;
}

export async function getDictionaryEntries(): Promise<TDictionaryEntry[]> {
  const response = await api.get<TDictionaryEntry[]>("/dictionary-entries");

  return response.data;
}

export async function createDictionaryEntry(
  data: TCreateDictionaryEntryRequest,
): Promise<TDictionaryEntry> {
  const response = await api.post<TDictionaryEntry>(
    "/dictionary-entries",
    data,
  );

  return response.data;
}

export async function deleteDictionaryEntry(
  id: string,
): Promise<TDictionaryEntry> {
  const response = await api.delete<TDictionaryEntry>(
    `/dictionary-entries/${id}`,
  );

  return response.data;
}
