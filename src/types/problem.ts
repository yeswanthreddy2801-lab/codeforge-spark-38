export type Difficulty = "Easy" | "Medium" | "Hard";

export type ProblemTag =
  | "Arrays"
  | "Strings"
  | "Trees"
  | "Graphs"
  | "Dynamic Programming"
  | "Linked List"
  | "Stack"
  | "Queue"
  | "Binary Search"
  | "Greedy";

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  number: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  tags: ProblemTag[];
  acceptance: number; // 0-100
  solved: boolean;
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  starterCode: Record<string, string>;
}

export interface ProblemFilters {
  search?: string;
  difficulty?: Difficulty | "All";
  tags?: ProblemTag[];
  status?: "All" | "Solved" | "Unsolved";
  page?: number;
  pageSize?: number;
}

export interface ProblemListResponse {
  items: Problem[];
  total: number;
  page: number;
  pageSize: number;
}
