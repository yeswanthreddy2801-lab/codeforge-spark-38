import { lazy, Suspense } from "react";
import type { Language } from "@/types/submission";

const Monaco = lazy(() => import("@monaco-editor/react"));

interface Props {
  value: string;
  onChange?: (v: string) => void;
  language: Language;
  height?: string | number;
  readOnly?: boolean;
}

const LANG_MAP: Record<Language, string> = {
  mylang: "rust",
  c: "c",
  cpp: "cpp",
  java: "java",
  python: "python",
};

export function MonacoEditorWrapper({
  value,
  onChange,
  language,
  height = "100%",
  readOnly = false,
}: Props) {
  return (
    <Suspense
      fallback={
        <div className="grid h-full w-full place-items-center bg-background font-mono text-sm text-text-secondary">
          Loading editor…
        </div>
      }
    >
      <Monaco
        height={height}
        language={LANG_MAP[language]}
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange?.(v ?? "")}
        options={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          readOnly,
          tabSize: 2,
          automaticLayout: true,
        }}
      />
    </Suspense>
  );
}
