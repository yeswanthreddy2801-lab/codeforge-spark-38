import { create } from "zustand";
import type { Language, Verdict } from "@/types/submission";

interface EditorState {
  language: Language;
  codeByProblemId: Record<string, string>;
  runOutput: string | null;
  verdict: Verdict | null;
  isRunning: boolean;
  isSubmitting: boolean;
  setLanguage: (lang: Language) => void;
  setCode: (id: string, code: string) => void;
  setRunOutput: (output: string | null) => void;
  setVerdict: (verdict: Verdict | null) => void;
  setRunning: (v: boolean) => void;
  setSubmitting: (v: boolean) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  language: "mylang",
  codeByProblemId: {},
  runOutput: null,
  verdict: null,
  isRunning: false,
  isSubmitting: false,
  setLanguage: (language) => set({ language }),
  setCode: (id, code) =>
    set((s) => ({ codeByProblemId: { ...s.codeByProblemId, [id]: code } })),
  setRunOutput: (runOutput) => set({ runOutput }),
  setVerdict: (verdict) => set({ verdict }),
  setRunning: (isRunning) => set({ isRunning }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  reset: () => set({ runOutput: null, verdict: null }),
}));
