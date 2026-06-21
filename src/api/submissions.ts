import { api, mockDelay, USE_MOCK } from "./axios";
import type {
  RunPayload,
  SubmitPayload,
  Verdict,
  TestCaseResult,
} from "@/types/submission";

export async function runCode(payload: RunPayload): Promise<{ output: string }> {
  if (USE_MOCK) {
    void payload;
    return mockDelay({
      output: "Compiling...\nRunning test 1... OK\nRunning test 2... OK\n\nOutput: 9",
    }, 700);
  }

  const body: any = {
    ...payload,
  };
  
  if (payload.problemId) {
    body.problemId = parseInt(payload.problemId, 10);
  }

  const { data } = await api.post<{ success: boolean; data: any; message: string }>("/submissions/run", body);
  const result = data.data;

  let output = "";
  if (result.stderr) {
    output = `Error:\n${result.stderr}`;
  } else if (typeof result.stdout === "string") {
    output = result.stdout === "" ? "No output" : result.stdout;
    if (result.verdict && result.verdict !== "ACCEPTED") {
      output += `\n\nVerdict: ${result.verdict}`;
    }
  } else if (result.verdict) {
    output = `Verdict: ${result.verdict}`;
  } else {
    output = "No output";
  }

  return { output };
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

  const body = {
    ...payload,
    problemId: parseInt(payload.problemId, 10)
  };

  const { data } = await api.post<{ success: boolean; data: any; message: string }>("/submissions", body);
  const result = data.data;

  // Map backend verdict to frontend VerdictStatus
  let statusStr = "Runtime Error";
  if (result.verdict === "ACCEPTED") statusStr = "Accepted";
  else if (result.verdict === "WRONG_ANSWER") statusStr = "Wrong Answer";
  else if (result.verdict === "TIME_LIMIT_EXCEEDED") statusStr = "Time Limit Exceeded";
  else if (result.verdict === "MEMORY_LIMIT_EXCEEDED") statusStr = "Runtime Error"; // Approximate
  else if (result.verdict === "COMPILATION_ERROR") statusStr = "Compilation Error";
  else if (result.verdict === "RUNTIME_ERROR") statusStr = "Runtime Error";

  // The backend doesn't return full test cases array, just verdict, runtime, etc.
  // We mock the testcases response minimally to satisfy the UI.
  const testCases: TestCaseResult[] = [];
  if (result.failedTestCase) {
    testCases.push({
      index: result.failedTestCase,
      input: "Hidden Input",
      expected: "Correct Output",
      got: result.stdout || "Wrong Output",
      passed: false
    });
  } else if (result.verdict === "ACCEPTED") {
     testCases.push({
      index: 1,
      input: "All inputs",
      expected: "Correct Output",
      got: "Correct Output",
      passed: true
    });
  }

  return {
    status: statusStr as any,
    runtimeMs: result.runtime || 0,
    memoryKb: result.memory || 0,
    testCases
  };
}
