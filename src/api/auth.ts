import { api, mockDelay, USE_MOCK } from "./axios";
import type { User } from "@/types/user";
import { supabase } from "@/lib/supabase";

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
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) throw new Error(error.message);
  if (!data.session) throw new Error("No session returned from Supabase");

  return {
    token: data.session.access_token,
    user: {
      id: data.user.id,
      username: data.user.user_metadata?.username || payload.email.split("@")[0],
      email: payload.email,
      joinedAt: data.user.created_at,
    },
  };
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        username: payload.username,
      },
      emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
    },
  });

  if (error) throw new Error(error.message);
  if (!data.session && data.user) {
    // If email confirmation is required, session will be null
    throw new Error("Please verify your email address to log in.");
  }
  if (!data.session) throw new Error("No session returned from Supabase");

  return {
    token: data.session.access_token,
    user: {
      id: data.user.id,
      username: payload.username,
      email: payload.email,
      joinedAt: data.user.created_at,
    },
  };
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Supabase logout error:", error.message);
}
