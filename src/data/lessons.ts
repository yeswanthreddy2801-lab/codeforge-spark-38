export interface LessonSection {
  heading: string;
  body: string;
  code?: string;
  output?: string;
  cppEquivalent?: string;
}

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  estimatedMinutes: number;
  sections: LessonSection[];
}

export const LESSONS: Lesson[] = [
  {
    id: "introduction", title: "Introduction", icon: "BookOpen", estimatedMinutes: 5,
    sections: [
      { heading: "What is MyLang?", body: "MyLang is a small, expressive programming language designed for learning. It looks like Python but borrows ideas from Rust and JavaScript." },
      { heading: "Hello, World", body: "Every MyLang program starts here. Use the print function to write to standard output.",
        code: `print("Hello, World!")`, output: "Hello, World!",
        cppEquivalent: `#include <iostream>\nint main() {\n  std::cout << "Hello, World!";\n}` },
      { heading: "Comments", body: "Single-line comments start with //. Block comments use /* ... */.",
        code: `// this is a comment\n/* multi\n   line */`, cppEquivalent: `// same in C++` },
    ],
  },
  {
    id: "variables", title: "Variables", icon: "Box", estimatedMinutes: 8,
    sections: [
      { heading: "Declaring Variables", body: "MyLang uses let to declare a variable. Types are inferred from the value.",
        code: `let x = 10\nlet name = "Ada"\nlet pi = 3.14`,
        cppEquivalent: `int x = 10;\nstd::string name = "Ada";\ndouble pi = 3.14;` },
      { heading: "Reassignment", body: "Variables can be reassigned. The new value must be the same type.",
        code: `let count = 0\ncount = count + 1\nprint(count)`, output: "1" },
      { heading: "Constants", body: "Use the const keyword for values that must not change.",
        code: `const MAX = 100`, cppEquivalent: `const int MAX = 100;` },
    ],
  },
  {
    id: "data-types", title: "Data Types", icon: "Layers", estimatedMinutes: 7,
    sections: [
      { heading: "Numbers", body: "Integers and floats are both stored in number values.",
        code: `let a = 42\nlet b = 3.14` },
      { heading: "Strings", body: "Strings are wrapped in double quotes and support concatenation with +.",
        code: `let g = "Hello, " + "world"\nprint(g)`, output: "Hello, world" },
      { heading: "Booleans", body: "true and false are the two boolean literals.",
        code: `let ok = true\nlet broken = false` },
      { heading: "Null", body: "The null value represents the absence of a value.",
        code: `let nothing = null` },
    ],
  },
  {
    id: "input-output", title: "Input & Output", icon: "Terminal", estimatedMinutes: 6,
    sections: [
      { heading: "Reading Input", body: "input() reads a line from standard input as a string. Use int(...) to convert.",
        code: `let line = input()\nlet n = int(line)\nprint(n * 2)` },
      { heading: "Printing", body: "print accepts any number of arguments separated by spaces.",
        code: `print("x =", 10, "y =", 20)`, output: "x = 10 y = 20",
        cppEquivalent: `std::cout << "x = " << 10 << " y = " << 20;` },
    ],
  },
  {
    id: "conditions", title: "Conditions", icon: "GitBranch", estimatedMinutes: 8,
    sections: [
      { heading: "If / Else", body: "Conditions use parentheses around the test and braces for the body.",
        code: `if (x > 0) {\n  print("positive")\n} else {\n  print("non-positive")\n}`,
        cppEquivalent: `if (x > 0) {\n  std::cout << "positive";\n} else {\n  std::cout << "non-positive";\n}` },
      { heading: "Else If", body: "Chain conditions with else if.",
        code: `if (n < 0) { print("neg") }\nelse if (n == 0) { print("zero") }\nelse { print("pos") }` },
      { heading: "Logical Operators", body: "Combine conditions with && (and), || (or), and ! (not).",
        code: `if (age >= 18 && hasId) { print("welcome") }` },
    ],
  },
  {
    id: "loops", title: "Loops", icon: "RotateCw", estimatedMinutes: 9,
    sections: [
      { heading: "For Loop", body: "for i in range(start, end) iterates from start to end-1.",
        code: `for i in range(0, 5) {\n  print(i)\n}`, output: "0\n1\n2\n3\n4",
        cppEquivalent: `for (int i = 0; i < 5; ++i) {\n  std::cout << i << "\\n";\n}` },
      { heading: "While Loop", body: "Run a block while a condition is true.",
        code: `let n = 5\nwhile (n > 0) {\n  print(n)\n  n = n - 1\n}` },
      { heading: "Break and Continue", body: "Exit a loop with break, skip an iteration with continue.",
        code: `for i in range(0, 10) {\n  if (i == 5) { break }\n  if (i % 2 == 0) { continue }\n  print(i)\n}` },
    ],
  },
  {
    id: "functions", title: "Functions", icon: "Code2", estimatedMinutes: 10,
    sections: [
      { heading: "Defining Functions", body: "Use the func keyword. Parameters need no type annotation.",
        code: `func add(a, b) {\n  return a + b\n}\nprint(add(2, 3))`, output: "5",
        cppEquivalent: `int add(int a, int b) {\n  return a + b;\n}\nstd::cout << add(2, 3);` },
      { heading: "Default Values", body: "Parameters can have defaults.",
        code: `func greet(name = "world") {\n  print("Hello, " + name)\n}\ngreet()\ngreet("Ada")` },
      { heading: "Recursion", body: "Functions may call themselves.",
        code: `func fact(n) {\n  if (n <= 1) { return 1 }\n  return n * fact(n - 1)\n}\nprint(fact(5))`, output: "120" },
    ],
  },
  {
    id: "arrays", title: "Arrays", icon: "List", estimatedMinutes: 9,
    sections: [
      { heading: "Creating Arrays", body: "Arrays are written with square brackets and can hold any type.",
        code: `let arr = [1, 2, 3, 4, 5]\nprint(arr[0])\nprint(len(arr))`, output: "1\n5",
        cppEquivalent: `std::vector<int> arr = {1,2,3,4,5};\nstd::cout << arr[0];` },
      { heading: "Modifying", body: "Add with push, remove with pop, or assign by index.",
        code: `let a = [1, 2]\npush(a, 3)\na[0] = 10\nprint(a)`, output: "[10, 2, 3]" },
      { heading: "Iteration", body: "Loop with for...in or by index.",
        code: `for x in [10, 20, 30] {\n  print(x)\n}` },
    ],
  },
  {
    id: "strings", title: "Strings", icon: "Type", estimatedMinutes: 7,
    sections: [
      { heading: "String Basics", body: "Strings are immutable. Use + to concatenate and len(s) for length.",
        code: `let s = "MyLang"\nprint(len(s))`, output: "6" },
      { heading: "Indexing & Slicing", body: "Index with brackets, slice with s[start:end].",
        code: `let s = "Hello"\nprint(s[0])\nprint(s[1:4])`, output: "H\nell" },
      { heading: "Useful Functions", body: "upper(s), lower(s), split(s, sep), and join(arr, sep) cover most needs.",
        code: `print(upper("hi"))\nprint(split("a,b,c", ","))` },
    ],
  },
  {
    id: "classes", title: "Classes", icon: "Box", estimatedMinutes: 12,
    sections: [
      { heading: "Defining a Class", body: "Classes group state and behavior. Methods are declared with func.",
        code: `class Dog {\n  let name = ""\n  func bark() {\n    print(name + " says Woof!")\n  }\n}`,
        cppEquivalent: `class Dog {\npublic:\n  std::string name;\n  void bark() {\n    std::cout << name << " says Woof!";\n  }\n};` },
      { heading: "Constructors", body: "init runs when an instance is created.",
        code: `class Point {\n  let x = 0\n  let y = 0\n  func init(px, py) {\n    x = px\n    y = py\n  }\n}` },
      { heading: "Using Classes", body: "Create an instance with new and call methods with a dot.",
        code: `let d = new Dog()\nd.name = "Rex"\nd.bark()`, output: "Rex says Woof!" },
    ],
  },
  {
    id: "practice-problems", title: "Practice Problems", icon: "Target", estimatedMinutes: 15,
    sections: [
      { heading: "Sum of an Array", body: "A classic warm-up: read an array and print its sum.",
        code: `let arr = [3, 1, 4, 1, 5, 9, 2, 6]\nlet total = 0\nfor x in arr {\n  total = total + x\n}\nprint(total)`, output: "31" },
      { heading: "Reverse a String", body: "Walk the string from the end to the beginning.",
        code: `func reverse(s) {\n  let out = ""\n  for i in range(len(s) - 1, -1) {\n    out = out + s[i]\n  }\n  return out\n}\nprint(reverse("MyLang"))`, output: "gnaLyM" },
      { heading: "Check Palindrome", body: "Compare the string to its reverse.",
        code: `func isPalin(s) {\n  return s == reverse(s)\n}\nprint(isPalin("madam"))`, output: "true" },
      { heading: "FizzBuzz", body: "The interview classic in pure MyLang.",
        code: `for i in range(1, 16) {\n  if (i % 15 == 0) { print("FizzBuzz") }\n  else if (i % 3 == 0) { print("Fizz") }\n  else if (i % 5 == 0) { print("Buzz") }\n  else { print(i) }\n}` },
    ],
  },
];
