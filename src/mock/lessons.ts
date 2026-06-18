export interface Lesson {
  id: string;
  title: string;
  icon: string;
  estimatedMinutes: number;
  body: LessonSection[];
  comparison?: { mylang: string; cpp: string };
  starterCode: string;
}

export interface LessonSection {
  heading?: string;
  paragraphs: string[];
}

export const LESSONS: Lesson[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: "BookOpen",
    estimatedMinutes: 4,
    body: [
      {
        paragraphs: [
          "Welcome to **MyLang**, the custom educational language built into CodeForge. MyLang is designed to teach algorithmic thinking without the ceremony of traditional languages.",
          "In this lesson you'll write your first MyLang program and understand the basic syntax.",
        ],
      },
      {
        heading: "Hello, World!",
        paragraphs: [
          "Every MyLang program starts with a `fn main()` block. The `print` builtin writes to standard output.",
        ],
      },
    ],
    comparison: {
      mylang: `fn main() {\n  print("Hello, World!")\n}`,
      cpp: `#include <iostream>\nint main() {\n  std::cout << "Hello, World!";\n  return 0;\n}`,
    },
    starterCode: `fn main() {\n  print("Hello, MyLang!")\n}\n`,
  },
  {
    id: "variables",
    title: "Variables",
    icon: "Variable",
    estimatedMinutes: 5,
    body: [
      {
        paragraphs: [
          "Variables in MyLang are declared with `let`. Types are inferred automatically.",
        ],
      },
    ],
    comparison: {
      mylang: `fn main() {\n  let x = 10\n  let name = "Ada"\n  print(x + 5)\n}`,
      cpp: `int main() {\n  int x = 10;\n  std::string name = "Ada";\n  std::cout << x + 5;\n}`,
    },
    starterCode: `fn main() {\n  let x = 10\n  print(x)\n}\n`,
  },
  {
    id: "io",
    title: "Input / Output",
    icon: "Terminal",
    estimatedMinutes: 4,
    body: [
      {
        paragraphs: [
          "Use `read()` to grab a line of input, and `print()` to display a value.",
        ],
      },
    ],
    comparison: {
      mylang: `fn main() {\n  let n = read()\n  print(n * 2)\n}`,
      cpp: `int main() {\n  int n; std::cin >> n;\n  std::cout << n * 2;\n}`,
    },
    starterCode: `fn main() {\n  let n = read()\n  print(n)\n}\n`,
  },
  {
    id: "conditions",
    title: "Conditions",
    icon: "GitBranch",
    estimatedMinutes: 5,
    body: [
      {
        paragraphs: [
          "MyLang uses familiar `if` / `else` syntax with braces.",
        ],
      },
    ],
    comparison: {
      mylang: `if x > 0 {\n  print("positive")\n} else {\n  print("non-positive")\n}`,
      cpp: `if (x > 0) std::cout << "positive";\nelse std::cout << "non-positive";`,
    },
    starterCode: `fn main() {\n  let x = 5\n  if x > 0 {\n    print("positive")\n  }\n}\n`,
  },
  {
    id: "loops",
    title: "Loops",
    icon: "Repeat",
    estimatedMinutes: 6,
    body: [
      {
        paragraphs: [
          "MyLang offers `for` and `while`. The `for i in 0..n` form iterates from `0` up to (but not including) `n`.",
        ],
      },
    ],
    comparison: {
      mylang: `for i in 0..5 {\n  print(i)\n}`,
      cpp: `for (int i = 0; i < 5; i++) {\n  std::cout << i << '\\n';\n}`,
    },
    starterCode: `fn main() {\n  for i in 0..5 {\n    print(i)\n  }\n}\n`,
  },
  {
    id: "functions",
    title: "Functions",
    icon: "FunctionSquare",
    estimatedMinutes: 6,
    body: [
      {
        paragraphs: ["Define reusable logic with `fn name(args) { ... }`."],
      },
    ],
    comparison: {
      mylang: `fn square(x) {\n  return x * x\n}\n\nfn main() {\n  print(square(7))\n}`,
      cpp: `int square(int x) { return x * x; }\nint main() { std::cout << square(7); }`,
    },
    starterCode: `fn double(x) {\n  return x * 2\n}\n\nfn main() {\n  print(double(21))\n}\n`,
  },
  {
    id: "arrays",
    title: "Arrays",
    icon: "Brackets",
    estimatedMinutes: 6,
    body: [
      { paragraphs: ["Arrays are zero-indexed and grow dynamically."] },
    ],
    comparison: {
      mylang: `let xs = [1, 2, 3]\nxs.push(4)\nprint(xs[0])`,
      cpp: `std::vector<int> xs = {1,2,3};\nxs.push_back(4);\nstd::cout << xs[0];`,
    },
    starterCode: `fn main() {\n  let xs = [1, 2, 3]\n  for x in xs {\n    print(x)\n  }\n}\n`,
  },
  {
    id: "strings",
    title: "Strings",
    icon: "Type",
    estimatedMinutes: 5,
    body: [{ paragraphs: ["Strings are first-class and support slicing."] }],
    comparison: {
      mylang: `let s = "hello"\nprint(s.length)\nprint(s[0..3])`,
      cpp: `std::string s = "hello";\nstd::cout << s.size();\nstd::cout << s.substr(0,3);`,
    },
    starterCode: `fn main() {\n  let s = "CodeForge"\n  print(s.length)\n}\n`,
  },
  {
    id: "practice",
    title: "Practice Problems",
    icon: "Dumbbell",
    estimatedMinutes: 10,
    body: [
      {
        paragraphs: [
          "Apply what you've learned. Head to **Problems** and filter for the *Beginner* tag.",
        ],
      },
    ],
    starterCode: `fn main() {\n  // your solution\n}\n`,
  },
];
