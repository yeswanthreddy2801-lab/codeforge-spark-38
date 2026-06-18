import { useQuery } from "@tanstack/react-query";
import { fetchLesson, fetchLessonList } from "@/api/learn";

export function useLessonList() {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: fetchLessonList,
    staleTime: Infinity,
  });
}

export function useLesson(topic: string) {
  return useQuery({
    queryKey: ["lesson", topic],
    queryFn: () => fetchLesson(topic),
    staleTime: Infinity,
  });
}
