import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { useProblems } from "@/hooks/useProblems";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Tag } from "@/components/ui/Tag";
import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import type { Difficulty, ProblemTag } from "@/types/problem";
import { cn } from "@/lib/utils";

const TAGS: ProblemTag[] = [
  "Arrays", "Strings", "Trees", "Graphs", "Dynamic Programming",
  "Linked List", "Stack", "Queue", "Binary Search", "Greedy",
];

const searchSchema = z.object({
  q: z.string().optional(),
  difficulty: z.enum(["All", "Easy", "Medium", "Hard"]).optional(),
  status: z.enum(["All", "Solved", "Unsolved"]).optional(),
  tags: z.array(z.string()).optional(),
  page: z.coerce.number().optional(),
});

export const Route = createFileRoute("/problems")({
  head: () => ({
    meta: [
      { title: "Problems — CodeForge" },
      { name: "description", content: "Sharpen your skills with hundreds of competitive programming problems." },
      { property: "og:title", content: "Problems — CodeForge" },
    ],
  }),
  validateSearch: searchSchema,
  component: ProblemsPage,
});

function ProblemsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filters = useMemo(
    () => ({
      search: search.q,
      difficulty: (search.difficulty ?? "All") as Difficulty | "All",
      status: search.status ?? "All",
      tags: (search.tags as ProblemTag[]) ?? [],
      page: search.page ?? 1,
      pageSize: 10,
    }),
    [search],
  );

  const { data, isLoading } = useProblems(filters);
  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / 10));
  const currentPage = filters.page ?? 1;

  const setQ = (q: string) =>
    navigate({ search: (p: z.infer<typeof searchSchema>) => ({ ...p, q: q || undefined, page: 1 }) });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Problems
        </h1>
        <p className="mt-2 text-text-secondary">
          Sharpen your skills, one problem at a time.
        </p>
      </motion.div>

      <div className="sticky top-16 z-30 -mx-4 mt-6 border-b border-card/60 bg-background/80 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              defaultValue={search.q ?? ""}
              placeholder="Search problems..."
              onChange={(e) => {
                const v = e.target.value;
                clearTimeout((window as unknown as { __pSearch?: number }).__pSearch);
                (window as unknown as { __pSearch?: number }).__pSearch =
                  window.setTimeout(() => setQ(v), 300) as unknown as number;
              }}
              className="h-11 w-full rounded-xl border border-card bg-surface pl-10 pr-10 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none"
            />
            {search.q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-text-secondary hover:bg-card"
                aria-label="Clear"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setFiltersOpen((s) => !s)}
            className="inline-flex items-center gap-2 rounded-xl border border-card bg-surface px-4 py-2.5 text-sm font-medium text-text-primary hover:border-primary/40"
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </button>

          <div className="ml-auto text-sm text-text-secondary">
            {data && (
              <>
                Showing{" "}
                <span className="text-text-primary">{data.items.length}</span> of{" "}
                <span className="text-text-primary">{data.total}</span>
              </>
            )}
          </div>
        </div>

        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 grid gap-4 rounded-2xl border border-card bg-surface p-4 sm:grid-cols-3"
          >
            <FilterGroup label="Difficulty">
              {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
                <Pill
                  key={d}
                  active={(search.difficulty ?? "All") === d}
                  onClick={() =>
                    navigate({ search: (p: z.infer<typeof searchSchema>) => ({ ...p, difficulty: d, page: 1 }) })
                  }
                  variant={d === "Easy" ? "success" : d === "Medium" ? "warning" : d === "Hard" ? "error" : "default"}
                >
                  {d}
                </Pill>
              ))}
            </FilterGroup>

            <FilterGroup label="Status">
              {(["All", "Solved", "Unsolved"] as const).map((s) => (
                <Pill
                  key={s}
                  active={(search.status ?? "All") === s}
                  onClick={() => navigate({ search: (p: z.infer<typeof searchSchema>) => ({ ...p, status: s, page: 1 }) })}
                >
                  {s}
                </Pill>
              ))}
            </FilterGroup>

            <FilterGroup label="Tags">
              <div className="flex flex-wrap gap-2">
                {TAGS.map((t) => {
                  const active = (search.tags ?? []).includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() =>
                        navigate({
                          search: (p: z.infer<typeof searchSchema>) => ({
                            ...p,
                            tags: active
                              ? (p.tags ?? []).filter((x) => x !== t)
                              : [...(p.tags ?? []), t],
                            page: 1,
                          }),
                        })
                      }
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs transition-colors",
                        active
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-card text-text-secondary hover:text-text-primary",
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </FilterGroup>
          </motion.div>
        )}
      </div>

      <div className="mt-6">
        {isLoading ? (
          <TableSkeleton />
        ) : !data || data.items.length === 0 ? (
          <div className="grid place-items-center rounded-2xl border border-card bg-surface py-16">
            <Inbox className="size-10 text-text-secondary" />
            <p className="mt-3 text-text-primary">No problems match your filters.</p>
            <button
              onClick={() => navigate({ search: {} })}
              className="mt-4 rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-background"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-card bg-surface">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-card text-left text-xs uppercase tracking-wider text-text-secondary">
                  <th className="px-4 py-3 w-12">#</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Difficulty</th>
                  <th className="px-4 py-3 hidden md:table-cell">Tags</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Acceptance</th>
                  <th className="px-4 py-3 w-16 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-card/40 transition-colors last:border-0 hover:bg-card/40"
                  >
                    <td className="px-4 py-3 font-mono text-text-secondary">{p.number}</td>
                    <td className="px-4 py-3">
                      <Link
                        to="/problems/$id"
                        params={{ id: p.id }}
                        className="font-medium text-text-primary hover:text-primary"
                      >
                        {p.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <DifficultyBadge difficulty={p.difficulty} />
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.slice(0, 2).map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                        {p.tags.length > 2 && (
                          <Tag>+{p.tags.length - 2}</Tag>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-text-secondary">{p.acceptance}%</span>
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-card">
                          <div
                            className="h-full gradient-bg"
                            style={{ width: `${p.acceptance}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex"><StatusIndicator solved={p.solved} /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {data && data.total > 10 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => navigate({ search: (p: z.infer<typeof searchSchema>) => ({ ...p, page: currentPage - 1 }) })}
            className="grid size-9 place-items-center rounded-lg border border-card bg-surface text-text-secondary disabled:opacity-30 hover:text-text-primary"
          >
            <ChevronLeft className="size-4" />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
            const n = i + 1;
            return (
              <button
                key={n}
                onClick={() => navigate({ search: (p: z.infer<typeof searchSchema>) => ({ ...p, page: n }) })}
                className={cn(
                  "grid size-9 place-items-center rounded-lg text-sm font-medium",
                  n === currentPage
                    ? "gradient-bg text-background"
                    : "border border-card bg-surface text-text-secondary hover:text-text-primary",
                )}
              >
                {n}
              </button>
            );
          })}
          <button
            disabled={currentPage >= totalPages}
            onClick={() => navigate({ search: (p: z.infer<typeof searchSchema>) => ({ ...p, page: currentPage + 1 }) })}
            className="grid size-9 place-items-center rounded-lg border border-card bg-surface text-text-secondary disabled:opacity-30 hover:text-text-primary"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({
  children,
  active,
  onClick,
  variant = "default",
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  variant?: "default" | "success" | "warning" | "error";
}) {
  const variants = {
    default: active ? "border-primary bg-primary/15 text-primary" : "border-card text-text-secondary",
    success: active ? "border-success bg-success/15 text-success" : "border-card text-text-secondary",
    warning: active ? "border-warning bg-warning/15 text-warning" : "border-card text-text-secondary",
    error: active ? "border-error bg-error/15 text-error" : "border-card text-text-secondary",
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:text-text-primary",
        variants[variant],
      )}
    >
      {children}
    </button>
  );
}
