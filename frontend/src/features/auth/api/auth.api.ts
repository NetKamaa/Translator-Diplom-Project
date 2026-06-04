import { api } from "@/lib/api";
import type {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TUser,
} from "../types/auth.types";

export async function login(data: TLoginRequest): Promise<TLoginResponse> {
  const response = await api.post<TLoginResponse>("/auth/login", data);

  return response.data;
}

export async function register(data: TRegisterRequest): Promise<TUser> {
  const response = await api.post<TUser>("/auth/register", data);

  return response.data;
}

export async function getProfile(): Promise<TUser> {
  const response = await api.get<TUser>("/auth/me");

  return response.data;
}
