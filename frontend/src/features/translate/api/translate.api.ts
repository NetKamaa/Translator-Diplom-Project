import { api } from "@/lib/api";

import type { TTranslation } from "@/features/translations/types/translation.types";
import type { TTranslateRequest } from "../types/translate.types";

export async function translateText(
  data: TTranslateRequest,
): Promise<TTranslation> {
  const response = await api.post<TTranslation>("/ai/translate", data);

  return response.data;
}
