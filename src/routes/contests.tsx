import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Clock, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { CONTESTS, type Contest } from "@/data/contests";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contests")({
  head: () => ({
    meta: [
      { title: "Contests — CodeForge" },
      { name: "description", content: "Compete in live contests, rank up, and win prizes." },
      { property: "og:title", content: "Contests — CodeForge" },
    ],
  }),
  component: ContestsPage,
});

type Filter = "All" | "Live" | "Upcoming" | "Finished";

function ContestsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = filter === "All" ? CONTESTS : CONTESTS.filter((c) => c.status === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">Contests</h1>
        <p className="mt-2 text-text-secondary">Compete, rank, and win.</p>
      </motion.div>

      <div className="mt-6 inline-flex rounded-xl border border-card bg-surface p-1">
        {(["All", "Live", "Upcoming", "Finished"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f ? "gradient-bg text-background" : "text-text-secondary hover:text-text-primary",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {list.map((c, i) => (
          <ContestCard key={c.id} contest={c} delay={i * 0.05} />
        ))}
      </div>

      {list.length === 0 && (
        <div className="mt-12 rounded-2xl border border-card bg-surface p-12 text-center text-text-secondary">
          No contests in this category yet.
        </div>
      )}
    </div>
  );
}

function ContestCard({ contest, delay }: { contest: Contest; delay: number }) {
  const start = new Date(contest.startTime);
  const end = new Date(contest.endTime);
  const durationHours = Math.round((end.getTime() - start.getTime()) / 3600_000);
  const isLive = contest.status === "Live";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={cn(
        "rounded-2xl border bg-surface p-6 transition-all hover:border-primary/40",
        isLive ? "border-primary/40 shadow-[0_0_24px_rgba(6,182,212,0.25)]" : "border-card",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-text-primary">{contest.name}</h3>
        <StatusBadge status={contest.status} />
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-text-secondary">{contest.description}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-text-secondary">
        <div className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" /> {start.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
        <div className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> {durationHours}h duration</div>
        <div className="inline-flex items-center gap-1.5"><Users className="size-3.5" /> {contest.participants.toLocaleString()} joined</div>
        <div className="inline-flex items-center gap-1.5"><Trophy className="size-3.5" /> {contest.difficulty}</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {contest.prizes.map((p) => (
          <span key={p} className="rounded-full border border-card bg-card/40 px-2.5 py-0.5 text-xs text-text-secondary">{p}</span>
        ))}
      </div>

      <Link
        to="/contests/$id"
        params={{ id: String(contest.id) }}
        className={cn(
          "mt-5 block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition-transform hover:scale-[1.01]",
          isLive
            ? "gradient-bg text-background shadow-lg shadow-primary/20"
            : "border border-card bg-card/30 text-text-primary hover:border-primary/40",
        )}
      >
        {isLive ? "Join Contest" : "View Contest"}
      </Link>
    </motion.article>
  );
}
