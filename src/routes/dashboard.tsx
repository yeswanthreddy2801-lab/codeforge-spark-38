import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis, Legend,
} from "recharts";
import { CheckCircle, Database, Flame, Trophy, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { VerdictBadge } from "@/components/ui/VerdictBadge";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { useAuthStore } from "@/store/authStore";
import { useProfile } from "@/hooks/useProfile";
import { useProblems } from "@/hooks/useProblems";
import { Skeleton, TableSkeleton } from "@/components/ui/LoadingSkeleton";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CodeForge" },
      { name: "description", content: "Track your progress, recent submissions, and recommended problems." },
      { property: "og:title", content: "Dashboard — CodeForge" },
    ],
  }),
  component: DashboardPage,
});

const formatTimeAgo = (dateStr: string) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins} mins ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${Math.floor(diffHours / 24)} days ago`;
};

function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuthStore();
  
  const { data: profileData, isLoading: profileLoading } = useProfile(user?.username || "");
  const { data: problemsData, isLoading: problemsLoading } = useProblems({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (profileLoading || problemsLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-8">
        <Skeleton className="h-24 w-1/3 rounded-2xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </div>
    );
  }

  const stats = profileData || {
    problemsSolved: 0,
    totalSubmissions: 0,
    accuracy: 0,
    rank: 0,
    streak: 0,
    score: 0,
    difficultyBreakdown: { easy: 0, medium: 0, hard: 0 },
    weeklyActivity: Array(7).fill(0),
    recentSubmissions: [],
  };

  const username = user?.username || "User";
  const totalProblems = problemsData?.total || 0;
  
  // Recommend unsolved medium problems
  const solvedSet = new Set(
    (stats.recentSubmissions || [])
      .filter((s: any) => s.verdict === "ACCEPTED")
      .map((s: any) => s.problemId)
  );
  
  const recommended = (problemsData?.items || [])
    .filter((p) => p.difficulty === "MEDIUM" && !p.solved && !solvedSet.has(Number(p.number)))
    .slice(0, 3);

  const difficultyData = [
    { name: "Easy", count: stats.difficultyBreakdown?.easy || 0, color: "#22c55e" },
    { name: "Medium", count: stats.difficultyBreakdown?.medium || 0, color: "#f59e0b" },
    { name: "Hard", count: stats.difficultyBreakdown?.hard || 0, color: "#ef4444" },
  ].filter(d => d.count > 0);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date().getDay();
  const last7Days = Array.from({length: 7}, (_, i) => daysOfWeek[(today - 6 + i + 7) % 7]);
  
  const weeklyData = last7Days.map((d, i) => ({ 
    day: d, 
    submissions: stats.weeklyActivity?.[i] || 0 
  }));

  const recentSubs = (stats.recentSubmissions || []).map((s: any) => {
    const prob = problemsData?.items?.find((p) => p.number === s.problemId);
    return {
      problemId: s.problemId,
      problemTitle: prob?.title || `Problem #${s.problemId}`,
      verdict: s.verdict,
      language: "MyLang", // Default or fetch from submission if available
      time: formatTimeAgo(s.createdAt),
    };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Welcome back, {username.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-text-secondary">Here's how you're doing on CodeForge.</p>
      </motion.div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Problems" value={totalProblems} icon={Database} color="primary" />
        <StatCard label="Solved" value={stats.problemsSolved} icon={CheckCircle} color="success" />
        <StatCard label="Global Rank" value={stats.rank ? `#${stats.rank}` : "-"} icon={Trophy} color="warning" />
        <StatCard label="Streak" value={stats.streak} suffix=" days" icon={Flame} color="error" />
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Weekly Submissions">
          {isClient ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} />
                <Bar dataKey="submissions" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[260px] w-full animate-pulse bg-card/50 rounded-xl" />
          )}
        </ChartCard>

        <ChartCard title="Difficulty Breakdown">
          {isClient ? (
            <ResponsiveContainer width="100%" height={260}>
              {difficultyData.length > 0 ? (
                <PieChart>
                  <Pie data={difficultyData} dataKey="count" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                    {difficultyData.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                </PieChart>
              ) : (
                <div className="flex h-full items-center justify-center text-text-secondary text-sm">
                  No accepted submissions yet.
                </div>
              )}
            </ResponsiveContainer>
          ) : (
            <div className="h-[260px] w-full animate-pulse bg-card/50 rounded-xl" />
          )}
        </ChartCard>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-card bg-surface">
        <div className="flex items-center justify-between border-b border-card px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-text-primary">Recent Submissions</h2>
          <Link to="/profile/" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-text-secondary">
              <tr>
                <th className="px-5 py-3">Problem</th>
                <th className="px-5 py-3 hidden sm:table-cell">Verdict</th>
                <th className="px-5 py-3 hidden md:table-cell">Language</th>
                <th className="px-5 py-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentSubs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-text-secondary">
                    You haven't submitted anything yet.
                  </td>
                </tr>
              )}
              {recentSubs.map((s: any, i: number) => (
                <tr key={i} className="border-t border-card/40 hover:bg-card/30">
                  <td className="px-5 py-3">
                    <Link to="/problems/$id" params={{ id: String(s.problemId) }} className="font-medium text-text-primary hover:text-primary">
                      {s.problemTitle}
                    </Link>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell"><VerdictBadge verdict={s.verdict} /></td>
                  <td className="px-5 py-3 hidden md:table-cell font-mono text-xs text-text-secondary">{s.language}</td>
                  <td className="px-5 py-3 text-right text-text-secondary">{s.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-bold text-text-primary">Continue Solving</h2>
        <p className="mt-1 text-sm text-text-secondary">Hand-picked Medium problems to push you forward.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {recommended.length === 0 && (
            <div className="col-span-3 rounded-2xl border border-card bg-surface p-8 text-center text-text-secondary">
              You're all caught up! Browse the problems page for more.
            </div>
          )}
          {recommended.map((p: any) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -3 }}
              className="flex flex-col gap-3 rounded-2xl border border-card bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-text-secondary">#{p.number}</span>
                <DifficultyBadge difficulty={p.difficulty} />
              </div>
              <h3 className="font-display text-lg font-semibold text-text-primary">{p.title}</h3>
              <p className="line-clamp-2 text-sm text-text-secondary opacity-0 hidden">
                {/* Omitted statement from API, keep clean */}
              </p>
              <Link
                to="/problems/$id" params={{ id: String(p.id) }}
                className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-background"
              >
                Solve Now <ArrowRight className="size-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-card bg-surface p-5 flex flex-col">
      <h2 className="mb-4 font-display text-lg font-semibold text-text-primary">{title}</h2>
      <div className="flex-1">{children}</div>
    </div>
  );
}
