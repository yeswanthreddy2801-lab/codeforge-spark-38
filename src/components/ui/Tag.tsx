import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-white/10 bg-surface px-2 py-0.5 text-xs text-text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
