import { api } from "@/lib/api";
import type {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TRegisterResponse,
} from "../types/auth.types";

export async function login(data: TLoginRequest): Promise<TLoginResponse> {
  const response = await api.post<TLoginResponse>("/auth/login", data);

  return response.data;
}

export async function register(
  data: TRegisterRequest,
): Promise<TRegisterResponse> {
  const response = await api.post<TRegisterResponse>("/auth/register", data);

  return response.data;
}
