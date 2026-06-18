import { useMutation } from "@tanstack/react-query";
import { translateEnglishToCode } from "@/api/englishToCode";
import type { Language } from "@/types/submission";

export function useEnglishToCode() {
  return useMutation({
    mutationFn: ({ english, language }: { english: string; language: Language }) =>
      translateEnglishToCode(english, language),
  });
}
