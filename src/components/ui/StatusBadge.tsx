import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: "Live" | "Upcoming" | "Finished" }) {
  if (status === "Live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">
        <span className="relative grid size-2 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-success/70" />
          <span className="size-2 rounded-full bg-success" />
        </span>
        LIVE
      </span>
    );
  }
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
      status === "Upcoming"
        ? "border-warning/30 bg-warning/15 text-warning"
        : "border-card bg-card text-text-secondary",
    )}>
      {status}
    </span>
  );
}
