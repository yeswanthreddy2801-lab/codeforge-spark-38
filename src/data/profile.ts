export interface ProfileSubmission {
  problemId: number;
  problemTitle: string;
  verdict: "Accepted" | "Wrong Answer" | "TLE" | "Compilation Error";
  language: string;
  time: string;
}

export interface ProfileAchievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  earned: boolean;
  progress?: { current: number; total: number };
}

export interface ProfileData {
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  location: string;
  joinedDate: string;
  rank: number;
  problemsSolved: number;
  totalSubmissions: number;
  accuracy: number;
  streak: number;
  score: number;
  weeklyData: { day: string; submissions: number }[];
  difficultyData: { name: string; count: number; color: string }[];
  recentSubmissions: ProfileSubmission[];
  achievements: ProfileAchievement[];
}

export const PROFILE: ProfileData = {
  username: "alex_j",
  fullName: "Alex Johnson",
  avatar: "AJ",
  bio: "Competitive programmer. Loves graphs and DP.",
  location: "Hyderabad, India",
  joinedDate: "2024-01-15",
  rank: 12,
  problemsSolved: 147,
  totalSubmissions: 312,
  accuracy: 71.2,
  streak: 23,
  score: 8450,
  weeklyData: [
    { day: "Mon", submissions: 4 },
    { day: "Tue", submissions: 7 },
    { day: "Wed", submissions: 3 },
    { day: "Thu", submissions: 9 },
    { day: "Fri", submissions: 5 },
    { day: "Sat", submissions: 11 },
    { day: "Sun", submissions: 6 },
  ],
  difficultyData: [
    { name: "Easy", count: 68, color: "#22C55E" },
    { name: "Medium", count: 61, color: "#F59E0B" },
    { name: "Hard", count: 18, color: "#EF4444" },
  ],
  recentSubmissions: [
    { problemId: 1, problemTitle: "Two Sum", verdict: "Accepted", language: "MyLang", time: "2 hours ago" },
    { problemId: 6, problemTitle: "Maximum Subarray", verdict: "Accepted", language: "MyLang", time: "4 hours ago" },
    { problemId: 18, problemTitle: "Coin Change", verdict: "Wrong Answer", language: "C++", time: "yesterday" },
    { problemId: 14, problemTitle: "Course Schedule", verdict: "Accepted", language: "Python", time: "yesterday" },
    { problemId: 23, problemTitle: "Trapping Rain Water", verdict: "TLE", language: "MyLang", time: "2 days ago" },
    { problemId: 7, problemTitle: "Longest Substring Without Repeating", verdict: "Accepted", language: "MyLang", time: "3 days ago" },
    { problemId: 11, problemTitle: "Merge Intervals", verdict: "Wrong Answer", language: "Java", time: "3 days ago" },
    { problemId: 21, problemTitle: "Reverse Linked List", verdict: "Accepted", language: "C", time: "4 days ago" },
    { problemId: 4, problemTitle: "Valid Parentheses", verdict: "Compilation Error", language: "C++", time: "5 days ago" },
    { problemId: 17, problemTitle: "Unique Paths", verdict: "Accepted", language: "MyLang", time: "6 days ago" },
  ],
  achievements: [
    { id: "first_solve", title: "First Blood", desc: "Solved your first problem", icon: "Sword", earned: true },
    { id: "ten_solve", title: "On a Roll", desc: "Solved 10 problems", icon: "Flame", earned: true },
    { id: "fifty_solve", title: "Half Century", desc: "Solved 50 problems", icon: "Star", earned: true },
    { id: "hundred_solve", title: "Century Club", desc: "Solved 100 problems", icon: "Trophy", earned: true },
    { id: "mylang_init", title: "MyLang Initiate", desc: "Completed Introduction lesson", icon: "BookOpen", earned: true },
    { id: "streak_7", title: "Week Warrior", desc: "7-day solving streak", icon: "Zap", earned: true },
    { id: "streak_30", title: "Monthly Master", desc: "30-day solving streak", icon: "Calendar", earned: false, progress: { current: 23, total: 30 } },
    { id: "speed_demon", title: "Speed Demon", desc: "Solved a problem in under 60 seconds", icon: "Timer", earned: false },
    { id: "all_categories", title: "Generalist", desc: "Solve a problem in every category", icon: "Layers", earned: false, progress: { current: 6, total: 8 } },
  ],
};
