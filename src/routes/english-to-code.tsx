import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Copy, Play, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MonacoEditorWrapper } from "@/components/editor/MonacoEditorWrapper";
import { useEnglishToCode } from "@/hooks/useEnglishToCode";
import type { Language } from "@/types/submission";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/english-to-code")({
  head: () => ({
    meta: [
      { title: "English to Code — CodeForge" },
      { name: "description", content: "Describe your logic in plain English and watch it become real code." },
      { property: "og:title", content: "English to Code — CodeForge" },
    ],
  }),
  component: EnglishToCodePage,
});

const EXAMPLES = [
  {
    label: "Sum of two numbers",
    text: "• Read two integers a and b from input.\n• Print their sum.",
  },
  {
    label: "Find max in array",
    text: "• Read an array of integers.\n• Find the largest value.\n• Print it.",
  },
  {
    label: "FizzBuzz",
    text: "• For numbers 1 to 100, print 'Fizz' if divisible by 3,\n  'Buzz' if divisible by 5, 'FizzBuzz' if both,\n  otherwise the number.",
  },
  {
    label: "Fibonacci sequence",
    text: "• Read an integer n.\n• Print the first n Fibonacci numbers.",
  },
];

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "mylang", label: "MyLang" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
];

function EnglishToCodePage() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<Language>("mylang");
  const [displayedCode, setDisplayedCode] = useState("");
  const { mutate, isPending, error } = useEnglishToCode();

  const handleGenerate = () => {
    if (!text.trim()) {
      toast.error("Add some English first");
      return;
    }
    setDisplayedCode("");
    mutate(
      { english: text, language },
      {
        onSuccess: (data) => {
          // simulate streaming line-by-line reveal
          const lines = data.code.split("\n");
          let i = 0;
          const tick = () => {
            i++;
            setDisplayedCode(lines.slice(0, i).join("\n"));
            if (i < lines.length) setTimeout(tick, 80);
          };
          tick();
        },
      },
    );
  };

  const handleCopy = async () => {
    if (!displayedCode) return;
    await navigator.clipboard.writeText(displayedCode);
    toast.success("Copied!");
  };

  const status: "idle" | "thinking" | "done" = isPending
    ? "thinking"
    : displayedCode
      ? "done"
      : "idle";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-bold gradient-text">English to Code</h1>
        <span className="inline-flex items-center gap-1.5 rounded-full gradient-bg px-3 py-1 text-xs font-bold uppercase tracking-wider text-background">
          <Sparkles className="size-3" /> AI Powered
        </span>
      </motion.div>
      <p className="mt-2 max-w-2xl text-text-secondary">
        Describe your logic in plain English — CodeForge's AI translates it into real code instantly.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {/* Left panel */}
        <div className="overflow-hidden rounded-2xl border border-card bg-surface">
          <div className="flex items-center justify-between border-b border-card bg-card/30 px-4 py-2.5">
            <span className="text-sm font-medium text-text-primary">Your Instructions</span>
            <span className="font-mono text-xs text-text-secondary">
              {text.length} / 2000
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 2000))}
            placeholder={"Describe your logic in plain English...\n\nExample:\n• Create a variable x and store 10 in it.\n• Read two numbers from input.\n• Print the sum of the two numbers."}
            className={cn(
              "h-[420px] w-full resize-none bg-background p-5 font-mono text-sm text-text-primary placeholder:italic placeholder:text-text-secondary focus:outline-none",
              isPending && "animate-shimmer",
            )}
          />
          <div className="border-t border-card p-4">
            <p className="mb-2 text-xs text-text-secondary">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => setText(ex.text)}
                  className="rounded-full border border-card bg-card/50 px-3 py-1 text-xs text-text-secondary transition-colors hover:border-primary/40 hover:text-text-primary"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="overflow-hidden rounded-2xl border border-card bg-surface">
          <div className="flex items-center justify-between border-b border-card bg-card/30 px-4 py-2.5">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="rounded-lg border border-card bg-surface px-3 py-1.5 text-sm text-text-primary focus:border-primary focus:outline-none"
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <span
                className={cn(
                  "size-2 rounded-full",
                  status === "idle" && "bg-text-secondary",
                  status === "thinking" && "bg-warning animate-pulse",
                  status === "done" && "bg-success",
                )}
              />
              {status === "idle" ? "Idle" : status === "thinking" ? "Translating…" : "Done"}
            </div>
          </div>
          <div className="h-[420px]">
            <MonacoEditorWrapper
              language={language}
              value={displayedCode || "// Generated code will appear here"}
              readOnly
            />
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-card p-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-card bg-surface px-3 py-2 text-xs font-medium text-text-primary hover:border-primary/40"
            >
              <Copy className="size-3.5" /> Copy
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-card bg-surface px-3 py-2 text-xs font-medium text-text-primary hover:border-primary/40">
              <Play className="size-3.5" /> Run
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg gradient-bg px-3 py-2 text-xs font-semibold text-background">
              <Send className="size-3.5" /> Submit
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={isPending}
          className="group inline-flex items-center gap-2 rounded-2xl gradient-bg px-8 py-4 text-base font-bold text-background shadow-2xl shadow-primary/30 transition-transform hover:scale-[1.03] disabled:opacity-60"
        >
          <Sparkles className={cn("size-5", isPending && "animate-spin")} />
          {isPending ? "Translating your logic…" : "Generate Code"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-error/30 bg-error/10 p-4 text-sm text-error">
          {(error as Error).message ?? "Generation failed. Try again."}
        </div>
      )}
    </div>
  );
}
