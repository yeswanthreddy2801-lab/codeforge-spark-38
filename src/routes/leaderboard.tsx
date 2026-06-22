import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Crown, Medal, Award } from "lucide-react";
import { useState } from "react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useAuthStore } from "@/store/authStore";
import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import type { LeaderboardEntry, LeaderboardRange } from "@/types/leaderboard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — CodeForge" },
      { name: "description", content: "The best coders on CodeForge, ranked by performance." },
      { property: "og:title", content: "Leaderboard — CodeForge" },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const [range, setRange] = useState<LeaderboardRange>("all");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useLeaderboard(page, range);
  const currentUser = useAuthStore((s) => s.user);

  const hasPodium = (data?.entries?.length ?? 0) >= 3;
  const top3 = hasPodium ? data!.entries.slice(0, 3) : [];
  const rest = hasPodium ? data!.entries.slice(3) : (data?.entries ?? []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="font-display text-4xl font-black gradient-text sm:text-5xl">Global Leaderboard</h1>
        <p className="mt-3 text-text-secondary">The best coders on CodeForge, ranked by performance.</p>
      </motion.div>

      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-xl border border-card bg-surface p-1">
          {(["all", "month", "week"] as const).map((r) => (
            <button
              key={r}
              onClick={() => { setRange(r); setPage(1); }}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                range === r ? "gradient-bg text-background" : "text-text-secondary hover:text-text-primary",
              )}
            >
              {r === "all" ? "All Time" : r === "month" ? "This Month" : "This Week"}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-10 space-y-4"><TableSkeleton rows={10} /></div>
      ) : (
        <>
          {hasPodium && (
            <div className="mt-12 grid grid-cols-1 items-end gap-6 md:grid-cols-3">
              <PodiumCard entry={top3[1]!} place={2} delay={0.1} />
              <PodiumCard entry={top3[0]!} place={1} delay={0} />
              <PodiumCard entry={top3[2]!} place={3} delay={0.2} />
            </div>
          )}

          <div className="mt-12 overflow-hidden rounded-2xl border border-card bg-surface">
            <table className="w-full text-sm">
              <thead className="bg-card/30 text-left text-xs uppercase tracking-wider text-text-secondary">
                <tr>
                  <th className="px-4 py-3 w-16">Rank</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Solved</th>
                  <th className="px-4 py-3 hidden md:table-cell">Accuracy</th>
                  <th className="px-4 py-3 hidden md:table-cell">Submissions</th>
                  <th className="px-4 py-3 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {rest.map((e) => {
                  const isMe = currentUser?.username === e.username;
                  return (
                    <tr
                      key={e.userId}
                      className={cn(
                        "border-b border-card/40 transition-colors last:border-0 hover:bg-card/40",
                        isMe && "border-l-4 border-l-primary bg-primary/5",
                      )}
                    >
                      <td className="px-4 py-3 font-mono text-text-secondary">
                        {e.rank <= 3 ? ["🥇","🥈","🥉"][e.rank - 1] : `#${e.rank}`}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={e.avatarUrl} alt="" className="size-8 rounded-full bg-card" />
                          <span className="font-medium text-text-primary">{e.username}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">{e.problemsSolved}</td>
                      <td className="px-4 py-3 hidden md:table-cell">{e.accuracy}%</td>
                      <td className="px-4 py-3 hidden md:table-cell">{e.submissions}</td>
                      <td className="px-4 py-3 text-right font-mono font-semibold gradient-text">{e.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-sm">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-card bg-surface px-4 py-2 disabled:opacity-30"
            >Previous</button>
            <span className="text-text-secondary">Page {page}</span>
            <button
              disabled={!data || page * 20 >= data.total}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-card bg-surface px-4 py-2 disabled:opacity-30"
            >Next</button>
          </div>
        </>
      )}
    </div>
  );
}

function PodiumCard({ entry, place, delay }: { entry: LeaderboardEntry; place: 1 | 2 | 3; delay: number }) {
  const config = {
    1: { color: "#f59e0b", icon: Crown, label: "1st", height: "h-72" },
    2: { color: "#94a3b8", icon: Medal, label: "2nd", height: "h-64" },
    3: { color: "#cd7f32", icon: Award, label: "3rd", height: "h-60" },
  }[place];

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        "relative rounded-2xl border-2 bg-card p-6 text-center",
        config.height,
      )}
      style={{ borderColor: config.color, boxShadow: `0 0 32px ${config.color}30` }}
    >
      <Icon className="absolute left-1/2 top-3 size-6 -translate-x-1/2" style={{ color: config.color }} />
      <div className="mt-8 flex flex-col items-center">
        <img
          src={entry.avatarUrl}
          alt={entry.username}
          className="size-20 rounded-full border-4 bg-background"
          style={{ borderColor: config.color }}
        />
        <span
          className="mt-2 rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider"
          style={{ backgroundColor: `${config.color}22`, color: config.color }}
        >
          {config.label}
        </span>
        <h3 className="mt-3 font-semibold text-text-primary">{entry.username}</h3>
        <p className="mt-1 text-xs text-text-secondary">{entry.problemsSolved} solved</p>
        <p className="mt-3 font-display text-2xl font-black gradient-text">{entry.score}</p>
      </div>
    </motion.div>
  );
}
