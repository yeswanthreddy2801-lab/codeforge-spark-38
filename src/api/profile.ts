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
  const { data } = await api.get<UserProfile>(`/users/${username}`);
  return data;
}
