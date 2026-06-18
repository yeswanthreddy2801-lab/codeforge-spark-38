import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, ChevronRight, Clock, Play } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { useLearnStore } from "@/store/learnStore";
import { LESSONS } from "@/mock/lessons";
import { MonacoEditorWrapper } from "@/components/editor/MonacoEditorWrapper";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn MyLang — CodeForge" },
      { name: "description", content: "Learn MyLang, the custom educational programming language behind CodeForge." },
      { property: "og:title", content: "Learn MyLang — CodeForge" },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  const activeTopic = useLearnStore((s) => s.activeTopic);
  const setActiveTopic = useLearnStore((s) => s.setActiveTopic);
  const completed = useLearnStore((s) => s.completedTopics);
  const markComplete = useLearnStore((s) => s.markComplete);

  const lesson = LESSONS.find((l) => l.id === activeTopic) ?? LESSONS[0]!;
  const [code, setCode] = useState(lesson.starterCode);
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    setCode(lesson.starterCode);
    setOutput(null);
  }, [lesson.id, lesson.starterCode]);

  const progress = Math.round((completed.length / LESSONS.length) * 100);
  const isCompleted = completed.includes(lesson.id);

  const handleComplete = () => {
    if (isCompleted) return;
    markComplete(lesson.id);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
    toast.success(`Lesson complete: ${lesson.title}`);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
      {/* Sidebar */}
      <aside className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto">
        <div className="rounded-2xl border border-card bg-surface p-5">
          <h2 className="font-display text-lg font-bold gradient-text">MyLang Docs</h2>
          <p className="mt-1 text-xs text-text-secondary">
            {completed.length} / {LESSONS.length} topics completed
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-card">
            <div className="h-full bg-success transition-all" style={{ width: `${progress}%` }} />
          </div>

          <nav className="mt-5 space-y-1">
            {LESSONS.map((l) => {
              const done = completed.includes(l.id);
              const active = activeTopic === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setActiveTopic(l.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    active
                      ? "border-l-2 border-primary bg-card text-text-primary"
                      : "text-text-secondary hover:bg-card/50 hover:text-text-primary",
                  )}
                >
                  <span>{l.title}</span>
                  {done && <Check className="size-4 text-success" />}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <motion.section
        key={lesson.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span>Learn</span>
          <ChevronRight className="size-3" />
          <span className="text-text-primary">{lesson.title}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-bold text-text-primary">{lesson.title}</h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-xs text-text-secondary">
            <Clock className="size-3" /> ~{lesson.estimatedMinutes} min read
          </span>
        </div>

        <div className="space-y-5">
          {lesson.body.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="mb-2 font-display text-xl font-semibold text-text-primary">{section.heading}</h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="text-text-secondary leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: p
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary">$1</strong>')
                      .replace(/`(.*?)`/g, '<code class="rounded bg-card px-1 py-0.5 font-mono text-xs text-primary">$1</code>'),
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {lesson.comparison && (
          <div className="grid gap-3 md:grid-cols-2">
            <CodePanel header="MyLang" headerColor="bg-primary" code={lesson.comparison.mylang} />
            <CodePanel header="C++" headerColor="bg-secondary" code={lesson.comparison.cpp} />
          </div>
        )}

        <div className="rounded-2xl border border-card bg-surface">
          <div className="border-b border-card px-5 py-3">
            <h3 className="font-display text-lg font-semibold text-text-primary">Try It Yourself</h3>
          </div>
          <div className="h-[300px]">
            <MonacoEditorWrapper language="mylang" value={code} onChange={setCode} />
          </div>
          <div className="flex items-center justify-between border-t border-card px-4 py-3">
            <button
              onClick={() => setOutput("Hello, MyLang!\nProgram exited with code 0.")}
              className="inline-flex items-center gap-1.5 rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-background"
            >
              <Play className="size-3.5" /> Run
            </button>
            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                isCompleted
                  ? "bg-success/20 text-success cursor-default"
                  : "border border-primary text-primary hover:bg-primary/10",
              )}
            >
              {isCompleted ? "✓ Completed" : "Mark as Complete"}
            </button>
          </div>
          {output && (
            <div className="border-t border-card bg-background p-4 font-mono text-xs text-text-secondary">
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}

function CodePanel({ header, headerColor, code }: { header: string; headerColor: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-card bg-background">
      <div className={cn("px-4 py-2 text-xs font-semibold uppercase tracking-wider text-background", headerColor)}>
        {header}
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-text-secondary">
        <code>{code}</code>
      </pre>
    </div>
  );
}
