import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Calendar, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CONTESTS } from "@/data/contests";
import { PROBLEMS } from "@/data/problems";
import { LEADERBOARD } from "@/data/leaderboard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contests/$id")({
  head: () => ({ meta: [{ title: "Contest — CodeForge" }] }),
  component: ContestDetailPage,
});

type Tab = "Problems" | "Rankings" | "Details";

function ContestDetailPage() {
  const { id } = Route.useParams();
  const contest = CONTESTS.find((c) => c.id === Number(id));
  if (!contest) throw notFound();

  const [tab, setTab] = useState<Tab>("Problems");
  const [registered, setRegistered] = useState(false);

  const problems = contest.problems
    .map((pid) => PROBLEMS.find((p) => p.id === pid))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const start = new Date(contest.startTime);
  const end = new Date(contest.endTime);
  const durationHours = Math.round((end.getTime() - start.getTime()) / 3600_000);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/contests" className="text-sm text-text-secondary hover:text-text-primary">← Back to contests</Link>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-card bg-surface p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-black gradient-text sm:text-4xl">{contest.name}</h1>
            <p className="mt-2 max-w-2xl text-text-secondary">{contest.description}</p>
          </div>
          <StatusBadge status={contest.status} />
        </div>

        {contest.status !== "Finished" && (
          <div className="mt-6">
            <CountdownTimer
              target={contest.status === "Upcoming" ? contest.startTime : contest.endTime}
              label={contest.status === "Upcoming" ? "Starts in" : "Ends in"}
            />
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat icon={Users} label="Participants" value={contest.participants.toLocaleString()} />
          <Stat icon={Calendar} label="Duration" value={`${durationHours} hours`} />
          <Stat icon={Trophy} label="Difficulty" value={contest.difficulty} />
          <Stat icon={Award} label="Problems" value={String(contest.problems.length)} />
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="mt-8 flex gap-1 border-b border-card">
        {(["Problems", "Rankings", "Details"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors",
              tab === t ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
            )}
          >
            {t}
            {tab === t && <motion.div layoutId="contest-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Problems" && (
          <div className="overflow-hidden rounded-2xl border border-card bg-surface">
            <table className="w-full text-sm">
              <thead className="bg-card/30 text-left text-xs uppercase tracking-wider text-text-secondary">
                <tr>
                  <th className="px-4 py-3 w-12">#</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Difficulty</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Solved By</th>
                  <th className="px-4 py-3 text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((p, i) => (
                  <tr key={p.id} className="border-t border-card/40 hover:bg-card/30">
                    <td className="px-4 py-3 font-mono text-text-secondary">{i + 1}</td>
                    <td className="px-4 py-3">
                      <Link to="/problems/$id" params={{ id: String(p.id) }} className="font-medium text-text-primary hover:text-primary">
                        {p.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3"><DifficultyBadge difficulty={p.difficulty} /></td>
                    <td className="px-4 py-3 hidden sm:table-cell text-text-secondary">{Math.floor(contest.participants * (0.2 + i * 0.07)).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-semibold gradient-text">{(i + 1) * 100}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Rankings" && (
          <div className="overflow-hidden rounded-2xl border border-card bg-surface">
            <table className="w-full text-sm">
              <thead className="bg-card/30 text-left text-xs uppercase tracking-wider text-text-secondary">
                <tr>
                  <th className="px-4 py-3 w-16">Rank</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Solved</th>
                  <th className="px-4 py-3 hidden md:table-cell">Time</th>
                  <th className="px-4 py-3 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD.slice(0, 20).map((u, i) => {
                  const isMe = u.username === "alex_j";
                  return (
                    <tr key={u.username} className={cn("border-t border-card/40 hover:bg-card/30", isMe && "bg-primary/5")}>
                      <td className="px-4 py-3 font-mono text-text-secondary">{i < 3 ? ["🥇","🥈","🥉"][i] : `#${i + 1}`}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="grid size-7 place-items-center rounded-full bg-secondary text-xs font-bold text-background">{u.avatar}</div>
                          <span className="font-medium text-text-primary">{u.username}</span>
                          <span>{u.flag}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">{Math.max(1, Math.floor(contest.problems.length - i / 8))}/{contest.problems.length}</td>
                      <td className="px-4 py-3 hidden md:table-cell font-mono text-xs text-text-secondary">{String(Math.floor(i * 3 + 12)).padStart(2,"0")}:{String((i * 17) % 60).padStart(2,"0")}</td>
                      <td className="px-4 py-3 text-right font-semibold gradient-text">{u.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Details" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-card bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">About this contest</h3>
              <p className="mt-2 text-text-secondary">{contest.description}</p>
            </div>

            <div className="rounded-2xl border border-card bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">Rules</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-text-secondary">
                <li>Contest runs for exactly {durationHours} hours from the announced start time.</li>
                <li>You may submit any problem any number of times during the window.</li>
                <li>Each wrong submission incurs a 5-minute time penalty.</li>
                <li>Sharing solutions or using external help is grounds for disqualification.</li>
                <li>Final ranking is by total score; ties are broken by submission time.</li>
                <li>Prizes are sent to verified email addresses within 7 days of contest end.</li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-card bg-surface">
              <div className="border-b border-card px-6 py-4">
                <h3 className="font-display text-lg font-semibold text-text-primary">Prizes</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {contest.prizes.map((p, i) => (
                    <tr key={p} className="border-t border-card/40">
                      <td className="px-6 py-3 font-mono text-text-secondary w-24">#{i + 1}</td>
                      <td className="px-6 py-3 text-text-primary">{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              {contest.status === "Upcoming" && (
                <button
                  onClick={() => {
                    setRegistered((r) => !r);
                    toast.success(registered ? "Unregistered" : "Registered for contest");
                  }}
                  className={cn(
                    "rounded-xl px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]",
                    registered
                      ? "border border-success/30 bg-success/15 text-success"
                      : "gradient-bg text-background shadow-lg shadow-primary/20",
                  )}
                >
                  {registered ? "Registered ✓" : "Register Now"}
                </button>
              )}
              {contest.status === "Finished" && (
                <button
                  onClick={() => toast.success("Certificate downloaded")}
                  className="rounded-xl border border-card bg-card/30 px-6 py-3 text-sm font-semibold text-text-primary hover:border-primary/40"
                >
                  View Certificate
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-card bg-card/30 p-4">
      <Icon className="size-4 text-primary" />
      <div className="mt-2 font-display text-lg font-bold text-text-primary">{value}</div>
      <div className="text-xs text-text-secondary">{label}</div>
    </div>
  );
}
