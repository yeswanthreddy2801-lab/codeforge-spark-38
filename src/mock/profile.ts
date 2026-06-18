import type { UserProfile } from "@/types/user";

function buildActivity(): UserProfile["activity"] {
  const days: UserProfile["activity"] = [];
  const today = new Date();
  for (let i = 365; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const seed = (d.getDate() + d.getMonth() * 7 + i * 3) % 11;
    const count = seed > 7 ? seed - 4 : seed < 3 ? 0 : seed - 2;
    days.push({
      date: d.toISOString().slice(0, 10),
      count: Math.max(0, count),
    });
  }
  return days;
}

export const MOCK_PROFILE: UserProfile = {
  user: {
    id: "u1",
    username: "neo_coder",
    email: "neo@codeforge.dev",
    avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=neo_coder",
    bio: "Full-stack engineer. Lover of algorithms, espresso, and clean APIs.",
    location: "San Francisco, CA",
    joinedAt: "2024-03-12",
  },
  stats: {
    problemsSolved: 247,
    totalSubmissions: 612,
    accuracy: 88,
    globalRank: 1,
  },
  achievements: [
    {
      id: "first-blood",
      name: "First Blood",
      description: "Solve your first problem",
      icon: "Sword",
      color: "#06b6d4",
      unlocked: true,
    },
    {
      id: "on-a-roll",
      name: "On a Roll",
      description: "Solve 10 problems",
      icon: "Flame",
      color: "#f59e0b",
      unlocked: true,
    },
    {
      id: "half-century",
      name: "Half Century",
      description: "Solve 50 problems",
      icon: "Star",
      color: "#8b5cf6",
      unlocked: true,
    },
    {
      id: "century",
      name: "Century",
      description: "Solve 100 problems",
      icon: "Trophy",
      color: "#f59e0b",
      unlocked: true,
      progress: { current: 247, total: 100 },
    },
    {
      id: "mylang-initiate",
      name: "MyLang Initiate",
      description: "Complete the Introduction lesson",
      icon: "BookOpen",
      color: "#06b6d4",
      unlocked: true,
    },
    {
      id: "mylang-adept",
      name: "MyLang Adept",
      description: "Complete all MyLang lessons",
      icon: "GraduationCap",
      color: "#8b5cf6",
      unlocked: false,
      progress: { current: 6, total: 9 },
    },
    {
      id: "speed-demon",
      name: "Speed Demon",
      description: "Solve a problem in under 1 minute",
      icon: "Zap",
      color: "#f59e0b",
      unlocked: false,
    },
    {
      id: "accuracy-king",
      name: "Accuracy King",
      description: "90%+ acceptance rate over 20 submissions",
      icon: "Target",
      color: "#22c55e",
      unlocked: false,
      progress: { current: 88, total: 90 },
    },
  ],
  activity: buildActivity(),
};
