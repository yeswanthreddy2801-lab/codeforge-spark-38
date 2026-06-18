import { useEffect, useState } from "react";

function format(ms: number) {
  if (ms <= 0) return "00:00:00";
  const s = Math.floor(ms / 1000);
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

export function CountdownTimer({ target, label }: { target: string; label?: string }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = new Date(target).getTime() - now;
  return (
    <div className="inline-flex flex-col items-center">
      {label && <span className="text-xs uppercase tracking-wider text-text-secondary">{label}</span>}
      <span className="font-mono text-2xl font-bold gradient-text tabular-nums">{format(remaining)}</span>
    </div>
  );
}
