import { useQuery } from "@tanstack/react-query";
import { fetchProblemById, fetchProblems } from "@/api/problems";
import type { ProblemFilters } from "@/types/problem";

export const problemsQueryKey = (filters: ProblemFilters) =>
  ["problems", filters] as const;

export function useProblems(filters: ProblemFilters = {}) {
  return useQuery({
    queryKey: problemsQueryKey(filters),
    queryFn: () => fetchProblems(filters),
    staleTime: 60_000,
  });
}

export function useProblemDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["problem", id],
    queryFn: () => fetchProblemById(id!),
    enabled: !!id,
    staleTime: 5 * 60_000,
  });
}
