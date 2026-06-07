import { api } from "@/lib/api";

import type { TTranslateRequest, TTranslation } from "../types/translate.types";

export async function translateText(
  data: TTranslateRequest,
): Promise<TTranslation> {
  const response = await api.post<TTranslation>("/ai/translate", data);

  return response.data;
}
