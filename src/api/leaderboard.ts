import { api, mockDelay, USE_MOCK } from "./axios";
import { MOCK_LEADERBOARD } from "@/mock/leaderboard";
import type {
  LeaderboardRange,
  LeaderboardResponse,
} from "@/types/leaderboard";

export async function fetchLeaderboard(
  page = 1,
  pageSize = 20,
  range: LeaderboardRange = "all",
): Promise<LeaderboardResponse> {
  if (USE_MOCK) {
    const entries = MOCK_LEADERBOARD.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );
    void range;
    return mockDelay({
      entries,
      total: MOCK_LEADERBOARD.length,
      page,
      pageSize,
    });
  }
  const { data } = await api.get<LeaderboardResponse>("/leaderboard", {
    params: { page, pageSize, range },
  });
  return data;
}
