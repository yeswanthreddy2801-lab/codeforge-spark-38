export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl?: string;
  problemsSolved: number;
  accuracy: number;
  submissions: number;
  score: number;
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
  total: number;
  page: number;
  pageSize: number;
}

export type LeaderboardRange = "all" | "month" | "week";
