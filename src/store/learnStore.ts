import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LearnState {
  completedTopics: string[];
  activeTopic: string;
  markComplete: (topic: string) => void;
  setActiveTopic: (topic: string) => void;
}

export const useLearnStore = create<LearnState>()(
  persist(
    (set) => ({
      completedTopics: ["introduction", "variables", "io", "conditions", "loops", "functions"],
      activeTopic: "introduction",
      markComplete: (topic) =>
        set((s) => ({
          completedTopics: s.completedTopics.includes(topic)
            ? s.completedTopics
            : [...s.completedTopics, topic],
        })),
      setActiveTopic: (activeTopic) => set({ activeTopic }),
    }),
    { name: "codeforge-learn" },
  ),
);
