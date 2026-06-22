import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CheckSquare, MapPin, Calendar, Send, Target, Trophy,
  Sword, Flame, Star, BookOpen, GraduationCap, Zap, Lock,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import type { Achievement, ActivityDay } from "@/types/user";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Sword, Flame, Star, Trophy, BookOpen, GraduationCap, Zap, Target,
};

export const Route = createFileRoute("/profile/$username")({
  head: () => ({
    meta: [{ title: "Profile — CodeForge" }],
  }),
  component: ProfilePage,
});

type Tab = "Overview" | "Submissions" | "Achievements";

function ProfilePage() {
  const { username } = Route.useParams();
  const { data, isLoading } = useProfile(username);
  const [tab, setTab] = useState<Tab>("Overview");

  if (isLoading || !data) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-8">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    );
  }

  const {
    username: pUsername, fullName, bio, location, avatarUrl, joinedDate,
    problemsSolved, totalSubmissions, accuracy, rank, streak, score,
    recentSubmissions, difficultyBreakdown, weeklyActivity,
    achievements
  } = data;

  const user = { username: pUsername, fullName, bio, location, avatarUrl, joinedAt: joinedDate };
  const stats = { problemsSolved, totalSubmissions, accuracy, globalRank: rank, streak, score };
  const activity = [] as ActivityDay[]; // Backend doesn't return full activity day array currently

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      {/* Banner */}
      <div className="relative mt-6 h-48 overflow-hidden rounded-2xl gradient-bg">
        <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <filter id="n">
            <feTurbulence baseFrequency="0.9" />
          </filter>
          <rect width="100%" height="100%" filter="url(#n)" />
        </svg>
      </div>

      <div className="-mt-12 flex flex-col items-start gap-4 px-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end">
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="size-24 rounded-full border-4 border-background bg-card"
          />
          <div>
            <h1 className="font-display text-2xl font-bold text-text-primary">{user.username}</h1>
            <p className="mt-1 text-sm text-text-secondary">{user.bio}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
              {user.location && (
                <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {user.location}</span>
              )}
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3" /> Joined {new Date(user.joinedAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>
        <button className="rounded-lg border border-card bg-surface px-4 py-2 text-sm hover:border-primary/40">
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={CheckSquare} label="Problems Solved" value={stats.problemsSolved} />
        <StatCard icon={Send} label="Total Submissions" value={stats.totalSubmissions} />
        <StatCard icon={Target} label="Accuracy" value={`${stats.accuracy}%`} />
        <StatCard icon={Trophy} label="Global Rank" value={`#${stats.globalRank}`} />
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
            {tab === t && (
              <motion.div layoutId="profile-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Overview" && <OverviewTab activity={activity} />}
        {tab === "Submissions" && <SubmissionsTab />}
        {tab === "Achievements" && <AchievementsTab achievements={achievements} />}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon, label, value,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/5 bg-card p-5"
    >
      <Icon className="size-5 text-primary" />
      <div className="mt-3 font-display text-3xl font-black gradient-text">{value}</div>
      <div className="mt-0.5 text-xs text-text-secondary">{label}</div>
    </motion.div>
  );
}

function OverviewTab({ activity }: { activity: ActivityDay[] }) {
  // Build 53 weeks x 7 days grid
  const weeks = useMemo(() => {
    const out: ActivityDay[][] = [];
    let cur: ActivityDay[] = [];
    activity.forEach((d) => {
      cur.push(d);
      if (cur.length === 7) { out.push(cur); cur = []; }
    });
    if (cur.length) out.push(cur);
    return out;
  }, [activity]);

  const cellColor = (n: number) => {
    if (n === 0) return "bg-card";
    if (n <= 2) return "bg-primary/25";
    if (n <= 5) return "bg-primary/55";
    return "bg-primary";
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-card bg-surface p-5">
        <h3 className="mb-4 text-sm font-semibold text-text-primary">
          {activity.reduce((a, b) => a + b.count, 0)} submissions in the last year
        </h3>
        <div className="overflow-x-auto">
          <div className="flex gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.count} submissions on ${day.date}`}
                    className={cn("size-3 rounded-sm transition-transform hover:scale-125", cellColor(day.count))}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-text-secondary">
          Less
          <span className="size-3 rounded-sm bg-card" />
          <span className="size-3 rounded-sm bg-primary/25" />
          <span className="size-3 rounded-sm bg-primary/55" />
          <span className="size-3 rounded-sm bg-primary" />
          More
        </div>
      </div>

      <div className="rounded-2xl border border-card bg-surface p-5">
        <h3 className="mb-3 text-sm font-semibold text-text-primary">Recent Submissions</h3>
        <div className="divide-y divide-card/40 text-sm">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <span className="text-text-primary">Two Sum</span>
              <div className="flex items-center gap-3 text-xs text-text-secondary">
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-success">Accepted</span>
                <span className="font-mono">MyLang</span>
                <span>{i + 1}d ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SubmissionsTab() {
  return (
    <div className="rounded-2xl border border-card bg-surface p-8 text-center text-text-secondary">
      Detailed submission history will appear here.
    </div>
  );
}

function AchievementsTab({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((a, i) => {
        const Icon = ICONS[a.icon] ?? Trophy;
        return (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "relative rounded-2xl border border-white/5 bg-card p-5",
              !a.unlocked && "opacity-50 grayscale",
            )}
          >
            {!a.unlocked && (
              <Lock className="absolute right-4 top-4 size-4 text-text-secondary" />
            )}
            <div
              className="grid size-12 place-items-center rounded-xl"
              style={{ backgroundColor: `${a.color}22`, color: a.color }}
            >
              <Icon className="size-6" />
            </div>
            <h4 className="mt-3 font-semibold text-text-primary">{a.name}</h4>
            <p className="mt-1 text-xs text-text-secondary">{a.description}</p>
            {a.progress && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-text-secondary">
                  <span>{a.progress.current} / {a.progress.total}</span>
                  <span>{Math.min(100, Math.round((a.progress.current / a.progress.total) * 100))}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-background">
                  <div
                    className="h-full gradient-bg"
                    style={{ width: `${Math.min(100, (a.progress.current / a.progress.total) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
