import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard } from "@/api/leaderboard";
import type { LeaderboardRange } from "@/types/leaderboard";

export function useLeaderboard(page = 1, range: LeaderboardRange = "all") {
  return useQuery({
    queryKey: ["leaderboard", page, range],
    queryFn: () => fetchLeaderboard(page, 20, range),
    staleTime: 60_000,
  });
}
