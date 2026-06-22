import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight, Play, RefreshCw, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useProblemDetail } from "@/hooks/useProblems";
import { useRunCode, useSubmitCode } from "@/hooks/useSubmission";
import { useEditorStore } from "@/store/editorStore";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { Tag } from "@/components/ui/Tag";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { MonacoEditorWrapper } from "@/components/editor/MonacoEditorWrapper";
import type { Language, VerdictStatus } from "@/types/submission";
import { cn } from "@/lib/utils";

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "mylang", label: "MyLang" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
];

export const Route = createFileRoute("/problems/$id")({
  head: () => ({
    meta: [{ title: "Problem — CodeForge" }],
  }),
  component: ProblemDetailPage,
});

const TABS = ["Description", "Examples", "Constraints", "Submissions"] as const;
type Tab = (typeof TABS)[number];

function ProblemDetailPage() {
  const { id } = Route.useParams();
  const { data: problem, isLoading } = useProblemDetail(id);
  const [tab, setTab] = useState<Tab>("Description");
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [consoleTab, setConsoleTab] = useState<"Output" | "Verdict">("Output");

  const language = useEditorStore((s) => s.language);
  const setLanguage = useEditorStore((s) => s.setLanguage);
  
  const compositeKey = `${id}_${language}`;
  const code = useEditorStore((s) => s.codeByProblemId[compositeKey] ?? "");
  const setCode = useEditorStore((s) => s.setCode);
  
  const runOutput = useEditorStore((s) => s.runOutput);
  const verdict = useEditorStore((s) => s.verdict);
  const isRunning = useEditorStore((s) => s.isRunning);
  const isSubmitting = useEditorStore((s) => s.isSubmitting);
  const resetEditor = useEditorStore((s) => s.reset);

  const runMutation = useRunCode();
  const submitMutation = useSubmitCode();

  useEffect(() => {
    if (runOutput || verdict) setConsoleOpen(true);
    if (verdict) setConsoleTab("Verdict");
  }, [runOutput, verdict]);

  if (isLoading || !problem) {
    return (
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  const handleReset = () => {
    setCode(compositeKey, problem.starterCode[language] ?? "");
    resetEditor();
  };

  const handleRun = () =>
    runMutation.mutate({ problemId: id, language, code });
  const handleSubmit = () =>
    submitMutation.mutate({ problemId: id, language, code });

  return (
    <div className="mx-auto grid max-w-[1600px] gap-4 px-4 py-6 sm:px-6 lg:grid-cols-[45%_1fr] lg:px-8">
      {/* Left panel */}
      <div className="overflow-hidden rounded-2xl border border-card bg-surface lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Link to="/problems/" className="hover:text-text-primary">Problems</Link>
            <ChevronRight className="size-3" />
            <span className="text-text-primary">{problem.title}</span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-bold text-text-primary">
            {problem.number}. {problem.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={problem.difficulty} />
            {problem.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>

          <div className="mt-6 flex gap-1 border-b border-card">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  tab === t ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
                )}
              >
                {t}
                {tab === t && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-4 text-sm text-text-secondary">
            {tab === "Description" && (
              <div className="whitespace-pre-line leading-relaxed">
                {problem.description}
              </div>
            )}
            {tab === "Examples" && (
              <div className="space-y-4">
                {problem.examples.map((ex, i) => (
                  <div key={i} className="rounded-xl bg-background p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">Example {i + 1}</p>
                    <div className="space-y-2 font-mono text-xs">
                      <div><span className="text-primary">Input: </span>{ex.input}</div>
                      <div><span className="text-success">Output: </span>{ex.output}</div>
                      {ex.explanation && (
                        <div className="text-text-secondary"><span className="text-secondary">Explanation: </span>{ex.explanation}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "Constraints" && (
              <ul className="list-disc space-y-1 pl-5 font-mono text-xs">
                {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            )}
            {tab === "Submissions" && (
              <p className="text-center text-text-secondary py-8">No submissions yet. Run some code!</p>
            )}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-card bg-surface lg:max-h-[calc(100vh-7rem)]">
        <div className="flex items-center justify-between border-b border-card bg-card/30 px-4 py-2.5">
          <select
            value={language}
            onChange={(e) => {
              const lang = e.target.value as Language;
              setLanguage(lang);
            }}
            className="rounded-lg border border-card bg-surface px-3 py-1.5 text-sm text-text-primary focus:border-primary focus:outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary"
          >
            <RefreshCw className="size-3.5" /> Reset
          </button>
        </div>

        <div className="min-h-[400px] flex-1">
          <MonacoEditorWrapper
            language={language}
            value={code}
            onChange={(v) => setCode(compositeKey, v)}
          />
        </div>

        <div className="flex items-center justify-between border-t border-card bg-card/30 px-4 py-3">
          <button
            onClick={() => setConsoleOpen((s) => !s)}
            className="text-xs text-text-secondary hover:text-text-primary"
          >
            {consoleOpen ? "Hide" : "Show"} console
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 rounded-lg border border-card bg-surface px-4 py-2 text-sm font-medium text-text-primary hover:border-primary/40 disabled:opacity-50"
            >
              <Play className="size-3.5" />
              {isRunning ? "Running…" : "Run"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-background shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              <Send className="size-3.5" />
              {isSubmitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        </div>

        {consoleOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            className="border-t border-card bg-background"
          >
            <div className="flex items-center justify-between border-b border-card px-4">
              <div className="flex">
                {(["Output", "Verdict"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setConsoleTab(t)}
                    className={cn(
                      "px-3 py-2 text-xs font-medium",
                      consoleTab === t ? "border-b-2 border-primary text-text-primary" : "text-text-secondary",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button onClick={() => setConsoleOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X className="size-4" />
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto p-4 font-mono text-xs">
              {consoleTab === "Output" && (
                <pre className="whitespace-pre-wrap text-text-secondary">
                  {runOutput ?? "Run your code to see output."}
                </pre>
              )}
              {consoleTab === "Verdict" && (
                <VerdictPanel />
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function VerdictPanel() {
  const verdict = useEditorStore((s) => s.verdict);
  if (!verdict) return <p className="text-text-secondary">Submit your code to get a verdict.</p>;

  const colors: Record<VerdictStatus, string> = {
    "Accepted": "bg-success/15 text-success border-success/30",
    "Wrong Answer": "bg-error/15 text-error border-error/30",
    "Time Limit Exceeded": "bg-warning/15 text-warning border-warning/30",
    "Runtime Error": "bg-error/15 text-error border-error/30",
    "Compilation Error": "bg-secondary/15 text-secondary border-secondary/30",
  };

  return (
    <div className="space-y-3">
      <div className={cn("rounded-lg border px-4 py-3 text-sm font-semibold", colors[verdict.status])}>
        {verdict.status}
        {verdict.runtimeMs != null && (
          <span className="ml-3 font-normal opacity-70">
            {verdict.runtimeMs}ms · {(verdict.memoryKb! / 1024).toFixed(1)} MB
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        {verdict.testCases.map((tc) => (
          <div
            key={tc.index}
            className={cn(
              "rounded-md border px-3 py-2 text-xs",
              tc.passed ? "border-success/30 bg-success/5" : "border-error/30 bg-error/5",
            )}
          >
            <div className="font-semibold">
              Test {tc.index} — {tc.passed ? "Passed" : "Failed"}
            </div>
            <div className="mt-1 text-text-secondary">
              <div>Input: {tc.input}</div>
              <div>Expected: {tc.expected}</div>
              <div>Got: {tc.got}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
