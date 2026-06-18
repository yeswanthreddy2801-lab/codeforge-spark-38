import { Check, Minus } from "lucide-react";

export function StatusIndicator({ solved }: { solved: boolean }) {
  return solved ? (
    <Check className="size-4 text-success" />
  ) : (
    <Minus className="size-4 text-text-secondary/60" />
  );
}
