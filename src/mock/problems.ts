import type { Problem, ProblemTag } from "@/types/problem";

const TAGS: ProblemTag[] = [
  "Arrays",
  "Strings",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Linked List",
  "Stack",
  "Queue",
  "Binary Search",
  "Greedy",
];

const titles = [
  "Two Sum",
  "Reverse String",
  "Valid Parentheses",
  "Merge Two Sorted Lists",
  "Maximum Subarray",
  "Climbing Stairs",
  "Best Time to Buy and Sell Stock",
  "Single Number",
  "Linked List Cycle",
  "Binary Tree Inorder Traversal",
  "Symmetric Tree",
  "Maximum Depth of Binary Tree",
  "Convert Sorted Array to BST",
  "Pascal's Triangle",
  "Valid Palindrome",
  "Word Break",
  "House Robber",
  "Number of Islands",
  "Course Schedule",
  "Coin Change",
];

const difficulties: Array<Problem["difficulty"]> = ["Easy", "Medium", "Hard"];

function pickTags(seed: number): ProblemTag[] {
  const out: ProblemTag[] = [];
  for (let i = 0; i < 3; i++) {
    const tag = TAGS[(seed + i * 3) % TAGS.length]!;
    if (!out.includes(tag)) out.push(tag);
  }
  return out.slice(0, 1 + (seed % 3));
}

export const MOCK_PROBLEMS: Problem[] = titles.map((title, i) => ({
  id: String(i + 1),
  number: i + 1,
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  difficulty: difficulties[i % 3]!,
  tags: pickTags(i),
  acceptance: 30 + ((i * 7) % 60),
  solved: i % 4 === 0,
  description: `Given a problem related to "${title}", design an efficient algorithm that solves it within the given constraints. Consider edge cases such as empty input, single element input, and very large inputs.\n\nThink carefully about the **time complexity** and **space complexity** of your solution.`,
  examples: [
    {
      input: "nums = [2, 7, 11, 15], target = 9",
      output: "[0, 1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3, 2, 4], target = 6",
      output: "[1, 2]",
    },
  ],
  constraints: [
    "1 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "Only one valid answer exists.",
  ],
  starterCode: {
    mylang: `// Write your MyLang solution\nfn solve() {\n  // your code here\n}\n`,
    c: `#include <stdio.h>\n\nint main() {\n  // your code here\n  return 0;\n}\n`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // your code here\n  return 0;\n}\n`,
    java: `public class Main {\n  public static void main(String[] args) {\n    // your code here\n  }\n}\n`,
    python: `def solve():\n    # your code here\n    pass\n\nsolve()\n`,
  },
}));
