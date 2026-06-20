import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  BookOpen, Calendar, Flame, Lock, MapPin, Sword, Star, Timer, Trophy, Zap, Layers,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PROFILE } from "@/data/profile";
import { VerdictBadge } from "@/components/ui/VerdictBadge";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sword, Flame, Star, Trophy, BookOpen, Zap, Calendar, Timer, Layers,
};

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — CodeForge" },
      { name: "description", content: "Your coding journey: stats, submissions, and achievements." },
      { property: "og:title", content: "Profile — CodeForge" },
    ],
  }),
  component: ProfilePage,
});

type Tab = "Overview" | "Submissions" | "Achievements";

function ProfilePage() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [verdictFilter, setVerdictFilter] = useState<string>("All");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredSubs = useMemo(() => {
    if (verdictFilter === "All") return PROFILE.recentSubmissions;
    return PROFILE.recentSubmissions.filter((s) => s.verdict === verdictFilter);
  }, [verdictFilter]);

  const daysActive = Math.floor((Date.now() - new Date(PROFILE.joinedDate).getTime()) / 86400000);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      {/* Banner */}
      <div className="relative mt-6 h-44 overflow-hidden rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, rgba(6,182,212,0.3) 0px, transparent 40%), radial-gradient(circle at 80% 60%, rgba(139,92,246,0.3) 0px, transparent 40%)",
        }} />
      </div>

      <div className="-mt-12 flex flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
          <div className="grid size-24 place-items-center rounded-full bg-secondary text-3xl font-bold text-background border-4 border-background">
            {PROFILE.avatar}
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-text-primary">{PROFILE.username}</h1>
            <p className="text-text-secondary">{PROFILE.fullName}</p>
            <p className="mt-1 text-sm text-text-secondary">{PROFILE.bio}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
              <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {PROFILE.location}</span>
              <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> Joined {new Date(PROFILE.joinedDate).toLocaleDateString(undefined, { month: "long", year: "numeric" })}</span>
            </div>
          </div>
        </div>
        <button className="rounded-lg border border-card bg-surface px-4 py-2 text-sm hover:border-primary/40">
          Edit Profile
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Pill>Rank #{PROFILE.rank}</Pill>
        <Pill>{PROFILE.problemsSolved} Solved</Pill>
        <Pill>{PROFILE.streak} 🔥 Streak</Pill>
        <Pill>{PROFILE.accuracy}% Accuracy</Pill>
        <Pill>{PROFILE.score} pts</Pill>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-1 border-b border-card">
        {(["Overview", "Submissions", "Achievements"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors",
              tab === t ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
            )}
          >
            {t}
            {tab === t && <motion.div layoutId="profile-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Overview" && (
          <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
            <div className="space-y-5">
              <div className="rounded-2xl border border-card bg-surface p-5">
                <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">Weekly Submissions</h3>
                {isClient ? (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={PROFILE.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} />
                      <Bar dataKey="submissions" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[240px] w-full animate-pulse bg-card/50 rounded-xl" />
                )}
              </div>
              <div className="overflow-hidden rounded-2xl border border-card bg-surface">
                <div className="border-b border-card px-5 py-4">
                  <h3 className="font-display text-lg font-semibold text-text-primary">Recent Submissions</h3>
                </div>
                <SubmissionsTable subs={PROFILE.recentSubmissions.slice(0, 5)} />
              </div>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl border border-card bg-surface p-5">
                <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">Difficulty Breakdown</h3>
                {isClient ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={PROFILE.difficultyData} dataKey="count" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
                        {PROFILE.difficultyData.map((d) => <Cell key={d.name} fill={d.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} />
                      <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[220px] w-full animate-pulse bg-card/50 rounded-xl" />
                )}
              </div>
              <div className="rounded-2xl border border-card bg-surface p-5">
                <h3 className="font-display text-lg font-semibold text-text-primary">Active Since</h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {new Date(PROFILE.joinedDate).toLocaleDateString(undefined, { dateStyle: "long" })}
                </p>
                <div className="mt-4 font-display text-3xl font-black gradient-text">{daysActive}</div>
                <p className="text-xs text-text-secondary">days on CodeForge</p>
              </div>
            </div>
          </div>
        )}

        {tab === "Submissions" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(["All", "Accepted", "Wrong Answer", "TLE"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVerdictFilter(v)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    verdictFilter === v ? "border-primary bg-primary/15 text-primary" : "border-card text-text-secondary hover:text-text-primary",
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl border border-card bg-surface">
              <SubmissionsTable subs={filteredSubs} />
            </div>
          </div>
        )}

        {tab === "Achievements" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROFILE.achievements.map((a, i) => {
              const Icon = ICONS[a.icon] ?? Trophy;
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className={cn(
                    "relative rounded-2xl border border-card bg-surface p-5",
                    !a.earned && "opacity-50",
                  )}
                >
                  {!a.earned && <Lock className="absolute right-4 top-4 size-4 text-text-secondary" />}
                  <div className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h4 className="mt-3 font-semibold text-text-primary">{a.title}</h4>
                  <p className="mt-1 text-xs text-text-secondary">{a.desc}</p>
                  {a.progress && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-text-secondary">
                        <span>{a.progress.current} / {a.progress.total}</span>
                        <span>{Math.round((a.progress.current / a.progress.total) * 100)}%</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-card">
                        <div className="h-full gradient-bg" style={{ width: `${(a.progress.current / a.progress.total) * 100}%` }} />
                      </div>
                    </div>
                  )}
                  <div className="mt-3">
                    {a.earned ? (
                      <span className="inline-flex items-center rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">Earned ✓</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-card px-2.5 py-0.5 text-xs font-medium text-text-secondary">Locked</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-card bg-card/40 px-3 py-1 text-xs font-medium text-text-primary">{children}</span>;
}

function SubmissionsTable({ subs }: { subs: typeof PROFILE.recentSubmissions }) {
  return (
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
          {subs.length === 0 && (
            <tr><td colSpan={4} className="px-5 py-8 text-center text-text-secondary">No submissions match that filter.</td></tr>
          )}
          {subs.map((s, i) => (
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
  );
}
