import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Code2,
  Sparkles,
  Trophy,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeForge — Master Coding with AI and MyLang" },
      {
        name: "description",
        content:
          "Solve problems, learn a custom language, compete worldwide, and convert plain English into working code.",
      },
      { property: "og:title", content: "CodeForge — Master Coding with AI and MyLang" },
      {
        property: "og:description",
        content:
          "Solve problems, learn a custom language, compete worldwide, and convert plain English into working code.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Animated orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 size-[500px] rounded-full bg-primary/20 blur-3xl animate-orb" />
        <div
          className="absolute top-40 -right-32 size-[500px] rounded-full bg-secondary/20 blur-3xl animate-orb"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-5 lg:gap-8 lg:px-8 lg:py-28">
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            The Future of Competitive Programming
          </p>
          <h1 className="mt-4 font-display text-5xl font-black leading-[1.05] tracking-tight text-text-primary sm:text-6xl">
            Master Coding
            <br />
            With <span className="gradient-text">AI</span> And
            <br />
            MyLang
          </h1>
          <p className="mt-6 max-w-xl text-lg text-text-secondary">
            Solve problems, learn a custom language, compete with coders
            worldwide, and convert plain English into working code.
          </p>
          <p className="mt-2 text-sm italic text-text-secondary">
            Learn. Code. Compete. Create.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/problems"
              className="group inline-flex items-center gap-2 rounded-xl gradient-bg px-6 py-3 text-base font-semibold text-background shadow-lg shadow-primary/30 transition-transform hover:scale-[1.05]"
            >
              Start Solving
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/40 px-6 py-3 text-base font-semibold text-text-primary transition-colors hover:bg-primary/10"
            >
              Learn MyLang
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`https://api.dicebear.com/7.x/identicon/svg?seed=user${i}`}
                  alt=""
                  className="size-8 rounded-full border-2 border-background bg-card"
                />
              ))}
            </div>
            <p className="text-sm text-text-secondary">
              Join <span className="font-semibold text-text-primary">12,000+</span> developers already on CodeForge
            </p>
          </div>
        </motion.div>

        <motion.div
          className="relative lg:col-span-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-primary/10"
          >
            <div className="flex items-center gap-2 border-b border-white/5 bg-card/50 px-4 py-3">
              <div className="size-3 rounded-full bg-error/70" />
              <div className="size-3 rounded-full bg-warning/70" />
              <div className="size-3 rounded-full bg-success/70" />
              <span className="ml-3 font-mono text-xs text-text-secondary">
                solution.my
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
              <code>
                <span className="text-secondary">fn</span>{" "}
                <span className="text-primary">fibonacci</span>
                <span className="text-text-secondary">(</span>n<span className="text-text-secondary">)</span>{" "}
                <span className="text-text-secondary">{"{"}</span>
                {"\n  "}
                <span className="text-secondary">if</span> n {"<"} <span className="text-warning">2</span>{" "}
                <span className="text-text-secondary">{"{"}</span>
                {"\n    "}
                <span className="text-secondary">return</span> n
                {"\n  "}
                <span className="text-text-secondary">{"}"}</span>
                {"\n  "}
                <span className="text-secondary">return</span>{" "}
                <span className="text-primary">fibonacci</span>
                <span className="text-text-secondary">(</span>n - <span className="text-warning">1</span>
                <span className="text-text-secondary">)</span>
                {"\n       + "}
                <span className="text-primary">fibonacci</span>
                <span className="text-text-secondary">(</span>n - <span className="text-warning">2</span>
                <span className="text-text-secondary">)</span>
                {"\n"}
                <span className="text-text-secondary">{"}"}</span>
                {"\n\n"}
                <span className="text-secondary">fn</span>{" "}
                <span className="text-primary">main</span>
                <span className="text-text-secondary">()</span>{" "}
                <span className="text-text-secondary">{"{"}</span>
                {"\n  "}
                <span className="text-primary">print</span>
                <span className="text-text-secondary">(</span>
                <span className="text-primary">fibonacci</span>
                <span className="text-text-secondary">(</span>
                <span className="text-warning">10</span>
                <span className="text-text-secondary">))</span>
                {"\n"}
                <span className="text-text-secondary">{"}"}</span>
              </code>
            </pre>
            <div className="border-t border-white/5 bg-background/60 px-5 py-3 font-mono text-xs">
              <span className="text-text-secondary">{">"} </span>
              <span className="text-success">55</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const STATS = [
  { label: "Problems", target: 500, suffix: "+" },
  { label: "Active Users", target: 12000, suffix: "" },
  { label: "Submissions", target: 1200000, suffix: "" },
  { label: "Languages Supported", target: 4, suffix: "" },
];

function CountUp({ target }: { target: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setV(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <>{v.toLocaleString()}</>;
}

function StatsBar() {
  return (
    <section className="border-y border-card bg-surface py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8"
      >
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-4xl font-black gradient-text sm:text-5xl">
              <CountUp target={s.target} />
              {s.suffix}
            </div>
            <div className="mt-1 text-sm text-text-secondary">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

const FEATURES = [
  {
    icon: CheckCircle,
    title: "Online Judge",
    desc: "Real-time code execution with detailed verdicts across multiple languages.",
    color: "from-primary to-primary",
  },
  {
    icon: Code2,
    title: "Custom Language",
    desc: "Learn and code in MyLang, our purpose-built educational programming language.",
    color: "from-secondary to-secondary",
  },
  {
    icon: Sparkles,
    title: "English To Code",
    desc: "Describe logic in plain English — watch it transform into real, runnable code instantly.",
    color: "from-primary to-secondary",
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    desc: "Compete globally, track your rank, and rise to the top of the CodeForge leaderboard.",
    color: "from-warning to-warning",
  },
];

function Features() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
            Everything You Need to Excel
          </h2>
          <p className="mt-3 text-text-secondary">
            A complete platform for the modern competitive programmer.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/5 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${f.color} shadow-lg shadow-primary/20`}>
                <f.icon className="size-6 text-background" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-text-primary">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{f.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: 1, title: "Pick a Problem", desc: "Browse 500+ problems sorted by difficulty and tag." },
  { n: 2, title: "Write Your Solution", desc: "Code in MyLang or any supported language with full IDE features." },
  { n: 3, title: "Get Instant Results", desc: "Real-time verdicts with per-test-case feedback." },
];

function HowItWorks() {
  return (
    <section className="border-y border-card bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-text-primary sm:text-4xl">
          How It Works
        </h2>
        <div className="relative mt-14 grid gap-10 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-7 hidden h-px border-t border-dashed border-card md:block" />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="mx-auto grid size-14 place-items-center rounded-full gradient-bg font-display text-xl font-black text-background shadow-lg shadow-primary/30">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl gradient-bg p-10 text-center shadow-2xl shadow-primary/30 sm:p-16"
      >
        <Zap className="mx-auto size-10 text-background" />
        <h2 className="mt-4 font-display text-3xl font-black text-background sm:text-4xl">
          Ready to Start Your Journey?
        </h2>
        <p className="mt-3 text-background/80">
          No setup. No downloads. Code directly in your browser.
        </p>
        <Link
          to="/problems"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-base font-semibold text-primary transition-transform hover:scale-[1.05]"
        >
          Get Started Free
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>
    </section>
  );
}
