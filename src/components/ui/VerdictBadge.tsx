import { cn } from "@/lib/utils";

type Verdict = "Accepted" | "Wrong Answer" | "TLE" | "Compilation Error" | "Time Limit Exceeded" | "Runtime Error";

const STYLES: Record<string, string> = {
  "Accepted": "bg-success/15 text-success border-success/30",
  "Wrong Answer": "bg-error/15 text-error border-error/30",
  "TLE": "bg-warning/15 text-warning border-warning/30",
  "Time Limit Exceeded": "bg-warning/15 text-warning border-warning/30",
  "Runtime Error": "bg-error/15 text-error border-error/30",
  "Compilation Error": "bg-secondary/15 text-secondary border-secondary/30",
};

export function VerdictBadge({ verdict }: { verdict: Verdict | string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
      STYLES[verdict] ?? "bg-card text-text-secondary border-card",
    )}>
      {verdict}
    </span>
  );
}
