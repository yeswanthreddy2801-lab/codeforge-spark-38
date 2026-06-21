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
  const { data: responseData } = await api.get<any>("/problems", {
    params: filters,
  });

  return {
    items: responseData.data.map((p: any) => ({
      id: String(p.id),
      number: p.id,
      title: p.title,
      slug: p.slug,
      difficulty: p.difficulty,
      tags: p.tags || [],
      acceptance: p.acceptedCount && p.totalAttempts ? Math.round((p.acceptedCount / p.totalAttempts) * 100) : 0,
      solved: p.userSolved || false,
    })),
    total: responseData.pagination.total,
    page: responseData.pagination.page,
    pageSize: responseData.pagination.limit,
  };
}

export async function fetchProblemById(id: string): Promise<Problem> {
  if (USE_MOCK) {
    const found = MOCK_PROBLEMS.find((p) => p.id === id);
    if (!found) throw new Error("Problem not found");
    return mockDelay(found);
  }
  const { data: responseData } = await api.get<any>(`/problems/${id}`);
  const p = responseData.data;
  return {
    id: String(p.id),
    number: p.id,
    title: p.title,
    slug: p.slug,
    difficulty: p.difficulty,
    tags: p.tags || [],
    acceptance: p.acceptanceRate || (p.acceptedCount && p.totalAttempts ? Math.round((p.acceptedCount / p.totalAttempts) * 100) : 0),
    solved: p.userSolved || false,
    description: p.statement || "",
    examples: p.examples || [],
    constraints: p.constraints || [],
    starterCode: p.starterCode || {},
  };
}
