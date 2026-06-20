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
import { PROBLEMS } from "@/data/problems";
import { PROFILE } from "@/data/profile";

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

function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const recommended = PROBLEMS.filter((p) => p.difficulty === "Medium" && !p.isSolved).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Welcome back, {PROFILE.fullName.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-text-secondary">Here's how you're doing on CodeForge.</p>
      </motion.div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Problems" value={PROBLEMS.length} icon={Database} color="primary" />
        <StatCard label="Solved" value={PROFILE.problemsSolved} icon={CheckCircle} color="success" />
        <StatCard label="Current Rank" value={`#${PROFILE.rank}`} icon={Trophy} color="warning" />
        <StatCard label="Streak" value={PROFILE.streak} suffix=" days" icon={Flame} color="error" />
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Weekly Submissions">
          {isClient ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={PROFILE.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
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
              <PieChart>
                <Pie data={PROFILE.difficultyData} dataKey="count" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                  {PROFILE.difficultyData.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
              </PieChart>
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
          <Link to="/profile" className="text-sm text-primary hover:underline">View all →</Link>
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
              {PROFILE.recentSubmissions.map((s, i) => (
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
          {recommended.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -3 }}
              className="flex flex-col gap-3 rounded-2xl border border-card bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-text-secondary">#{p.id}</span>
                <DifficultyBadge difficulty={p.difficulty} />
              </div>
              <h3 className="font-display text-lg font-semibold text-text-primary">{p.title}</h3>
              <p className="line-clamp-2 text-sm text-text-secondary">{p.statement}</p>
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
    <div className="rounded-2xl border border-card bg-surface p-5">
      <h2 className="mb-4 font-display text-lg font-semibold text-text-primary">{title}</h2>
      {children}
    </div>
  );
}
