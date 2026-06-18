import { api, mockDelay, USE_MOCK } from "./axios";
import type {
  RunPayload,
  SubmitPayload,
  Verdict,
} from "@/types/submission";

export async function runCode(payload: RunPayload): Promise<{ output: string }> {
  if (USE_MOCK) {
    void payload;
    return mockDelay({
      output: "Compiling...\nRunning test 1... OK\nRunning test 2... OK\n\nOutput: 9",
    }, 700);
  }
  const { data } = await api.post<{ output: string }>("/run", payload);
  return data;
}

export async function submitCode(payload: SubmitPayload): Promise<Verdict> {
  if (USE_MOCK) {
    void payload;
    return mockDelay(
      {
        status: "Accepted",
        runtimeMs: 42,
        memoryKb: 7800,
        testCases: [
          { index: 1, input: "2 7 11 15, 9", expected: "[0,1]", got: "[0,1]", passed: true },
          { index: 2, input: "3 2 4, 6", expected: "[1,2]", got: "[1,2]", passed: true },
          { index: 3, input: "3 3, 6", expected: "[0,1]", got: "[0,1]", passed: true },
        ],
      },
      1200,
    );
  }
  const { data } = await api.post<Verdict>("/submit", payload);
  return data;
}
