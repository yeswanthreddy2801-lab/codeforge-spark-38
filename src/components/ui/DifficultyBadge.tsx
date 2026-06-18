import { cn } from "@/lib/utils";
import type { Difficulty } from "@/types/problem";

const STYLES: Record<Difficulty, string> = {
  Easy: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Hard: "bg-error/15 text-error border-error/30",
};

export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        STYLES[difficulty],
        className,
      )}
    >
      {difficulty}
    </span>
  );
}
