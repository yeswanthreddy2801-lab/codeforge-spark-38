import { api, mockDelay, USE_MOCK } from "./axios";
import { MOCK_PROBLEMS } from "@/mock/problems";
import type {
  Problem,
  ProblemFilters,
  ProblemListResponse,
} from "@/types/problem";

export async function fetchProblems(
  filters: ProblemFilters = {},
): Promise<ProblemListResponse> {
  if (USE_MOCK) {
    let items = [...MOCK_PROBLEMS];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (filters.difficulty && filters.difficulty !== "All") {
      items = items.filter((p) => p.difficulty === filters.difficulty);
    }
    if (filters.tags?.length) {
      items = items.filter((p) =>
        filters.tags!.some((t) => p.tags.includes(t)),
      );
    }
    if (filters.status === "Solved") items = items.filter((p) => p.solved);
    if (filters.status === "Unsolved") items = items.filter((p) => !p.solved);

    const page = filters.page ?? 1;
    const pageSize = filters.pageSize ?? 10;
    const total = items.length;
    const paged = items.slice((page - 1) * pageSize, page * pageSize);
    return mockDelay({ items: paged, total, page, pageSize });
  }
  const { data } = await api.get<ProblemListResponse>("/problems", {
    params: filters,
  });
  return data;
}

export async function fetchProblemById(id: string): Promise<Problem> {
  if (USE_MOCK) {
    const found = MOCK_PROBLEMS.find((p) => p.id === id);
    if (!found) throw new Error("Problem not found");
    return mockDelay(found);
  }
  const { data } = await api.get<Problem>(`/problems/${id}`);
  return data;
}
