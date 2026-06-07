import { api } from "@/lib/api";
import type {
  TUpdateUserProfileRequest,
  TUserProfile,
} from "../types/profile.types";

export async function getProfile(): Promise<TUserProfile> {
  const response = await api.get<TUserProfile>("/users/me");

  return response.data;
}

export async function updateProfile(
  data: TUpdateUserProfileRequest,
): Promise<TUserProfile> {
  const response = await api.patch<TUserProfile>("/users/me", data);

  return response.data;
}
