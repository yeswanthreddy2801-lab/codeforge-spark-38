export type Language = "mylang" | "c" | "cpp" | "java" | "python";

export type VerdictStatus =
  | "Accepted"
  | "Wrong Answer"
  | "Time Limit Exceeded"
  | "Runtime Error"
  | "Compilation Error";

export interface TestCaseResult {
  index: number;
  input: string;
  expected: string;
  got: string;
  passed: boolean;
}

export interface Verdict {
  status: VerdictStatus;
  message?: string;
  runtimeMs?: number;
  memoryKb?: number;
  testCases: TestCaseResult[];
}

export interface SubmitPayload {
  problemId?: string;
  language: Language;
  code: string;
}

export interface RunPayload extends SubmitPayload {
  stdin?: string;
}

export interface Submission {
  id: string;
  problemId: string;
  problemTitle: string;
  language: Language;
  status: VerdictStatus;
  runtimeMs: number;
  memoryKb: number;
  submittedAt: string;
}
