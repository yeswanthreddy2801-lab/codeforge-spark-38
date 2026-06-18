import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color?: "primary" | "success" | "warning" | "error" | "secondary";
  suffix?: string;
}

const COLORS = {
  primary: "text-primary bg-primary/15",
  success: "text-success bg-success/15",
  warning: "text-warning bg-warning/15",
  error: "text-error bg-error/15",
  secondary: "text-secondary bg-secondary/15",
};

function CountUp({ to, suffix }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{n.toLocaleString()}{suffix ?? ""}</>;
}

export function StatCard({ label, value, icon: Icon, color = "primary", suffix }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-surface p-6"
    >
      <div className={`absolute right-4 top-4 grid size-10 place-items-center rounded-xl ${COLORS[color]}`}>
        <Icon className="size-5" />
      </div>
      <div className="font-display text-3xl font-black text-text-primary">
        {typeof value === "number" ? <CountUp to={value} suffix={suffix} /> : value}
      </div>
      <div className="mt-1 text-sm text-text-secondary">{label}</div>
    </motion.div>
  );
}
