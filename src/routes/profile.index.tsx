import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  BookOpen, Calendar, Flame, Lock, MapPin, Sword, Star, Timer, Trophy, Zap, Layers, Target
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { VerdictBadge } from "@/components/ui/VerdictBadge";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useProblems } from "@/hooks/useProblems";
import { Skeleton } from "@/components/ui/LoadingSkeleton";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sword, Flame, Star, Trophy, BookOpen, Zap, Calendar, Timer, Layers, Target
};

const ACHIEVEMENT_META: Record<string, { desc: string, icon: string }> = {
  first_solve: { desc: "Solve your first problem.", icon: "Sword" },
  ten_solve: { desc: "Solve 10 problems on CodeForge.", icon: "Layers" },
  fifty_solve: { desc: "Solve 50 problems. Getting serious!", icon: "Flame" },
  hundred_solve: { desc: "Solve 100 problems. A true master.", icon: "Star" },
  streak_7: { desc: "Maintain a 7-day coding streak.", icon: "Calendar" },
  streak_30: { desc: "Maintain a 30-day coding streak.", icon: "Calendar" },
  accuracy_90: { desc: "Maintain 90%+ accuracy over 20+ subs.", icon: "Target" },
  speed_demon: { desc: "Get an accepted solution under 100ms.", icon: "Zap" },
};

export const Route = createFileRoute("/profile/")({
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

const formatTimeAgo = (dateStr: string) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins} mins ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${Math.floor(diffHours / 24)} days ago`;
};

function ProfilePage() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [verdictFilter, setVerdictFilter] = useState<string>("All");
  const [isClient, setIsClient] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", bio: "", location: "" });

  const { user } = useAuthStore();
  const { data: profileData, isLoading: profileLoading } = useProfile(user?.username || "");
  const { data: problemsData, isLoading: problemsLoading } = useProblems({});
  const updateMutation = useUpdateProfile();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (profileLoading || problemsLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-8">
        <Skeleton className="h-44 w-full rounded-2xl" />
        <Skeleton className="h-24 w-1/2 rounded-2xl" />
        <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
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
    achievements: [],
    location: "",
    bio: "Passionate coder.",
  };

  const username = user?.username || "User";
  const fullName = stats.fullName || username;
  const joinedDate = user?.joinedAt ? new Date(user.joinedAt) : new Date();
  const avatar = username?.charAt(0)?.toUpperCase();
  const daysActive = Math.floor((Date.now() - joinedDate.getTime()) / 86400000) || 1;

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

  const mapVerdict = (v: string) => {
    if (v === 'ACCEPTED') return 'Accepted';
    if (v === 'RUNTIME_ERROR') return 'Runtime Error';
    if (v === 'TIME_LIMIT_EXCEEDED') return 'Time Limit Exceeded';
    if (v === 'COMPILATION_ERROR') return 'Compilation Error';
    return 'Wrong Answer';
  };

  const recentSubs = (stats.recentSubmissions || []).map((s: any) => {
    const prob = problemsData?.items?.find((p) => p.number === s.problemId);
    return {
      problemId: s.problemId,
      problemTitle: prob?.title || `Problem #${s.problemId}`,
      verdict: mapVerdict(s.verdict),
      language: s.language || "MyLang",
      time: formatTimeAgo(s.createdAt),
    };
  });

  const filteredSubs = verdictFilter === "All" 
    ? recentSubs 
    : recentSubs.filter((s: any) => s.verdict === verdictFilter);

  const achievementsList = (stats.achievements || []).map((a: any) => {
    const meta = ACHIEVEMENT_META[a.id] || { desc: "Achievement", icon: "Trophy" };
    return {
      ...a,
      desc: meta.desc,
      icon: meta.icon,
    };
  });

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
            {avatar}
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-text-primary">{username}</h1>
            <p className="text-text-secondary">{fullName}</p>
            {stats.bio && <p className="mt-1 text-sm text-text-secondary">{stats.bio}</p>}
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
              {stats.location && (
                <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {stats.location}</span>
              )}
              <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> Joined {joinedDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => {
            setFormData({ fullName: stats.fullName || "", bio: stats.bio || "", location: stats.location || "" });
            setIsEditing(true);
          }}
          className="rounded-lg border border-card bg-surface px-4 py-2 text-sm hover:border-primary/40 transition-colors"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl border border-card bg-surface p-6 shadow-2xl"
          >
            <h2 className="font-display text-xl font-bold text-text-primary mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Full Name</label>
                <input 
                  type="text" 
                  value={formData.fullName} 
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-lg border border-card bg-background px-3 py-2 text-sm text-text-primary focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Bio</label>
                <textarea 
                  value={formData.bio} 
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-card bg-background px-3 py-2 text-sm text-text-primary focus:border-primary focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Location</label>
                <input 
                  type="text" 
                  value={formData.location} 
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-lg border border-card bg-background px-3 py-2 text-sm text-text-primary focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => setIsEditing(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  updateMutation.mutate(formData, {
                    onSuccess: () => setIsEditing(false)
                  });
                }}
                disabled={updateMutation.isPending}
                className="rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-background shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Pill>Rank {stats.rank ? `#${stats.rank}` : "N/A"}</Pill>
        <Pill>{stats.problemsSolved} Solved</Pill>
        <Pill>{stats.streak} 🔥 Streak</Pill>
        <Pill>{stats.accuracy}% Accuracy</Pill>
        <Pill>{stats.score} pts</Pill>
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
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
                      <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} />
                      <Bar dataKey="submissions" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[240px] w-full animate-pulse bg-card/50 rounded-xl" />
                )}
              </div>
              <div className="overflow-hidden rounded-2xl border border-card bg-surface">
                <div className="border-b border-card px-5 py-4 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-text-primary">Recent Submissions</h3>
                  <button onClick={() => setTab("Submissions")} className="text-sm text-primary hover:underline">View all →</button>
                </div>
                <SubmissionsTable subs={recentSubs.slice(0, 5)} />
              </div>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl border border-card bg-surface p-5">
                <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">Difficulty Breakdown</h3>
                {isClient ? (
                  <ResponsiveContainer width="100%" height={220}>
                    {difficultyData.length > 0 ? (
                      <PieChart>
                        <Pie data={difficultyData} dataKey="count" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
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
                  <div className="h-[220px] w-full animate-pulse bg-card/50 rounded-xl" />
                )}
              </div>
              <div className="rounded-2xl border border-card bg-surface p-5">
                <h3 className="font-display text-lg font-semibold text-text-primary">Active Since</h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {joinedDate.toLocaleDateString(undefined, { dateStyle: "long" })}
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
              {(["All", "Accepted", "Wrong Answer", "Runtime Error", "Time Limit Exceeded"] as const).map((v) => (
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
            {achievementsList.length === 0 && (
              <div className="col-span-3 text-center py-8 text-text-secondary">No achievements to show.</div>
            )}
            {achievementsList.map((a: any, i: number) => {
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
                    !a.earned && "opacity-50 grayscale",
                  )}
                >
                  {!a.earned && <Lock className="absolute right-4 top-4 size-4 text-text-secondary" />}
                  <div className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h4 className="mt-3 font-semibold text-text-primary">{a.title}</h4>
                  <p className="mt-1 text-xs text-text-secondary">{a.desc}</p>
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

function SubmissionsTable({ subs }: { subs: any[] }) {
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
            <tr><td colSpan={4} className="px-5 py-8 text-center text-text-secondary">No submissions found.</td></tr>
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
