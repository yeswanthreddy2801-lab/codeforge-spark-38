export interface Contest {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  participants: number;
  status: "Upcoming" | "Live" | "Finished";
  problems: number[];
  prizes: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const iso = (offsetHours: number) =>
  new Date(Date.now() + offsetHours * 3600_000).toISOString();

export const CONTESTS: Contest[] = [
  {
    id: 1,
    name: "Weekly Sprint #42",
    description: "Fast-paced weekly contest with 5 problems across difficulty levels. Perfect for warming up.",
    startTime: iso(-1),
    endTime: iso(1.5),
    participants: 2841,
    status: "Live",
    problems: [1, 6, 8, 16, 22],
    prizes: ["Gold Badge", "$500 prize pool", "Premium for 1 month"],
    difficulty: "Intermediate",
  },
  {
    id: 2,
    name: "Beginner Friendly Round",
    description: "Designed for newcomers. Easy and Medium problems only. Start your journey here.",
    startTime: iso(48),
    endTime: iso(52),
    participants: 1240,
    status: "Upcoming",
    problems: [2, 3, 4, 5, 21],
    prizes: ["Bronze Badge", "Featured on Leaderboard"],
    difficulty: "Beginner",
  },
  {
    id: 3,
    name: "DP Marathon",
    description: "A deep dive into dynamic programming with 6 progressively harder problems.",
    startTime: iso(168),
    endTime: iso(174),
    participants: 502,
    status: "Upcoming",
    problems: [16, 17, 18, 19, 30],
    prizes: ["Gold Badge", "$1000 prize pool", "Premium for 3 months"],
    difficulty: "Advanced",
  },
  {
    id: 4,
    name: "Spring Championship 2026",
    description: "The flagship quarterly tournament. Top 10 win cash prizes and exclusive swag.",
    startTime: iso(-72),
    endTime: iso(-68),
    participants: 8420,
    status: "Finished",
    problems: [8, 11, 13, 17, 23, 26],
    prizes: ["$5000 grand prize", "Trophy", "Premium for 1 year"],
    difficulty: "Advanced",
  },
  {
    id: 5,
    name: "Graphs & Trees Night",
    description: "Six themed problems on traversal, shortest paths, and tree DP.",
    startTime: iso(-168),
    endTime: iso(-164),
    participants: 1820,
    status: "Finished",
    problems: [13, 14, 15, 25, 26, 27],
    prizes: ["Silver Badge", "$300 prize pool"],
    difficulty: "Intermediate",
  },
  {
    id: 6,
    name: "Strings Special",
    description: "Manipulate, hash, and pattern-match your way to victory.",
    startTime: iso(-336),
    endTime: iso(-332),
    participants: 1102,
    status: "Finished",
    problems: [2, 4, 7, 10, 29],
    prizes: ["Silver Badge", "Premium for 1 month"],
    difficulty: "Intermediate",
  },
  {
    id: 7,
    name: "Newbie Cup",
    description: "Friendly contest for users with under 10 solves. Mentor feedback included.",
    startTime: iso(-504),
    endTime: iso(-502),
    participants: 642,
    status: "Finished",
    problems: [1, 2, 3, 5],
    prizes: ["Bronze Badge", "Mentor session"],
    difficulty: "Beginner",
  },
  {
    id: 8,
    name: "Hard Mode Showdown",
    description: "Only Hard problems. Four hours of pure pain. Bring snacks.",
    startTime: iso(-720),
    endTime: iso(-716),
    participants: 320,
    status: "Finished",
    problems: [22, 23, 24, 25, 28, 30],
    prizes: ["Gold Badge", "$1500 prize pool", "Hall of Fame"],
    difficulty: "Advanced",
  },
];
