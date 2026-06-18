import { api, mockDelay, USE_MOCK } from "./axios";
import type { User } from "@/types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  if (USE_MOCK) {
    return mockDelay({
      token: "mock-token",
      user: {
        id: "u1",
        username: payload.email.split("@")[0] ?? "user",
        email: payload.email,
        joinedAt: new Date().toISOString(),
      },
    });
  }
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  if (USE_MOCK) {
    return mockDelay({
      token: "mock-token",
      user: {
        id: "u1",
        username: payload.username,
        email: payload.email,
        joinedAt: new Date().toISOString(),
      },
    });
  }
  const { data } = await api.post<AuthResponse>("/auth/signup", payload);
  return data;
}
