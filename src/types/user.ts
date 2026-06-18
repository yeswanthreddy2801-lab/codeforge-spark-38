export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  joinedAt: string;
}

export interface UserStats {
  problemsSolved: number;
  totalSubmissions: number;
  accuracy: number;
  globalRank: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress?: { current: number; total: number };
}

export interface ActivityDay {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface UserProfile {
  user: User;
  stats: UserStats;
  achievements: Achievement[];
  activity: ActivityDay[];
}
