import { api, mockDelay, USE_MOCK } from "./axios";
import { MOCK_PROFILE } from "@/mock/profile";
import type { UserProfile } from "@/types/user";

export async function fetchProfile(username: string): Promise<UserProfile> {
  if (USE_MOCK) {
    return mockDelay({
      ...MOCK_PROFILE,
      user: { ...MOCK_PROFILE.user, username },
    });
  }
  const { data } = await api.get<any>(`/users/${username}`);
  return data.data;
}

export async function updateProfile(payload: { fullName?: string; bio?: string; location?: string }) {
  const { data } = await api.patch<any>("/users/me", payload);
  return data.data;
}
