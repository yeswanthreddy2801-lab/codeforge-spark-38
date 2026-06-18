export interface Translation {
  trigger: string[];
  english: string;
  mylang: string;
  cpp: string;
  java: string;
}

export const TRANSLATIONS: Translation[] = [
  {
    trigger: ["create a variable", "declare variable", "make a variable"],
    english: "Create a variable x and store 10 in it.",
    mylang: `let x = 10\nprint(x)`,
    cpp: `int x = 10;\nstd::cout << x;`,
    java: `int x = 10;\nSystem.out.println(x);`,
  },
  {
    trigger: ["print", "display", "output"],
    english: "Print the message Hello World.",
    mylang: `print("Hello World")`,
    cpp: `std::cout << "Hello World";`,
    java: `System.out.println("Hello World");`,
  },
  {
    trigger: ["read input", "take input", "user input"],
    english: "Read a number from input and print it.",
    mylang: `let n = int(input())\nprint(n)`,
    cpp: `int n;\nstd::cin >> n;\nstd::cout << n;`,
    java: `Scanner sc = new Scanner(System.in);\nint n = sc.nextInt();\nSystem.out.println(n);`,
  },
  {
    trigger: ["if condition", "check if", "if statement"],
    english: "If x is greater than 0, print positive, otherwise print non-positive.",
    mylang: `if (x > 0) {\n  print("positive")\n} else {\n  print("non-positive")\n}`,
    cpp: `if (x > 0) std::cout << "positive";\nelse std::cout << "non-positive";`,
    java: `if (x > 0) System.out.println("positive");\nelse System.out.println("non-positive");`,
  },
  {
    trigger: ["for loop", "repeat", "iterate"],
    english: "Print numbers from 0 to 9.",
    mylang: `for i in range(0, 10) {\n  print(i)\n}`,
    cpp: `for (int i = 0; i < 10; ++i) std::cout << i << "\\n";`,
    java: `for (int i = 0; i < 10; i++) System.out.println(i);`,
  },
  {
    trigger: ["while loop"],
    english: "Print n while n is greater than 0, decreasing each time.",
    mylang: `let n = 5\nwhile (n > 0) {\n  print(n)\n  n = n - 1\n}`,
    cpp: `int n = 5;\nwhile (n > 0) { std::cout << n << "\\n"; --n; }`,
    java: `int n = 5;\nwhile (n > 0) { System.out.println(n); n--; }`,
  },
  {
    trigger: ["define function", "create function", "function"],
    english: "Define a function that adds two numbers.",
    mylang: `func add(a, b) {\n  return a + b\n}\nprint(add(2, 3))`,
    cpp: `int add(int a, int b) { return a + b; }\nstd::cout << add(2, 3);`,
    java: `static int add(int a, int b) { return a + b; }\nSystem.out.println(add(2, 3));`,
  },
  {
    trigger: ["create array", "make array", "array of"],
    english: "Create an array of five numbers and print it.",
    mylang: `let arr = [1, 2, 3, 4, 5]\nprint(arr)`,
    cpp: `std::vector<int> arr = {1,2,3,4,5};\nfor (int x : arr) std::cout << x << " ";`,
    java: `int[] arr = {1,2,3,4,5};\nSystem.out.println(Arrays.toString(arr));`,
  },
  {
    trigger: ["sum of two numbers", "add two numbers"],
    english: "Read two numbers from input and print their sum.",
    mylang: `let a = int(input())\nlet b = int(input())\nprint(a + b)`,
    cpp: `int a, b;\nstd::cin >> a >> b;\nstd::cout << a + b;`,
    java: `Scanner sc = new Scanner(System.in);\nint a = sc.nextInt(), b = sc.nextInt();\nSystem.out.println(a + b);`,
  },
  {
    trigger: ["find maximum", "max in array", "largest"],
    english: "Find the maximum value in an array.",
    mylang: `let arr = [3, 1, 4, 1, 5, 9, 2, 6]\nlet best = arr[0]\nfor x in arr {\n  if (x > best) { best = x }\n}\nprint(best)`,
    cpp: `int best = arr[0];\nfor (int x : arr) if (x > best) best = x;\nstd::cout << best;`,
    java: `int best = arr[0];\nfor (int x : arr) if (x > best) best = x;\nSystem.out.println(best);`,
  },
  {
    trigger: ["fibonacci"],
    english: "Print the n-th Fibonacci number using recursion.",
    mylang: `func fib(n) {\n  if (n < 2) { return n }\n  return fib(n - 1) + fib(n - 2)\n}\nprint(fib(10))`,
    cpp: `int fib(int n) { return n < 2 ? n : fib(n-1) + fib(n-2); }\nstd::cout << fib(10);`,
    java: `static int fib(int n) { return n < 2 ? n : fib(n-1) + fib(n-2); }\nSystem.out.println(fib(10));`,
  },
  {
    trigger: ["factorial"],
    english: "Compute the factorial of n.",
    mylang: `func fact(n) {\n  if (n <= 1) { return 1 }\n  return n * fact(n - 1)\n}\nprint(fact(5))`,
    cpp: `int fact(int n) { return n <= 1 ? 1 : n * fact(n-1); }\nstd::cout << fact(5);`,
    java: `static int fact(int n) { return n <= 1 ? 1 : n * fact(n-1); }\nSystem.out.println(fact(5));`,
  },
  {
    trigger: ["reverse a string", "reverse string"],
    english: "Reverse a string.",
    mylang: `func reverse(s) {\n  let out = ""\n  for i in range(len(s) - 1, -1) {\n    out = out + s[i]\n  }\n  return out\n}\nprint(reverse("hello"))`,
    cpp: `std::string s = "hello";\nstd::reverse(s.begin(), s.end());\nstd::cout << s;`,
    java: `String s = "hello";\nSystem.out.println(new StringBuilder(s).reverse());`,
  },
  {
    trigger: ["check palindrome", "palindrome"],
    english: "Check if a string is a palindrome.",
    mylang: `func isPalin(s) {\n  let n = len(s)\n  for i in range(0, n / 2) {\n    if (s[i] != s[n - 1 - i]) { return false }\n  }\n  return true\n}\nprint(isPalin("madam"))`,
    cpp: `bool isPalin(std::string s) {\n  int n = s.size();\n  for (int i = 0; i < n/2; ++i) if (s[i] != s[n-1-i]) return false;\n  return true;\n}`,
    java: `static boolean isPalin(String s) {\n  return s.equals(new StringBuilder(s).reverse().toString());\n}`,
  },
  {
    trigger: ["bubble sort"],
    english: "Sort an array using bubble sort.",
    mylang: `let arr = [5, 1, 4, 2, 8]\nlet n = len(arr)\nfor i in range(0, n) {\n  for j in range(0, n - i - 1) {\n    if (arr[j] > arr[j + 1]) {\n      let t = arr[j]\n      arr[j] = arr[j + 1]\n      arr[j + 1] = t\n    }\n  }\n}\nprint(arr)`,
    cpp: `for (int i = 0; i < n; ++i)\n  for (int j = 0; j < n-i-1; ++j)\n    if (a[j] > a[j+1]) std::swap(a[j], a[j+1]);`,
    java: `for (int i = 0; i < n; i++)\n  for (int j = 0; j < n-i-1; j++)\n    if (a[j] > a[j+1]) { int t=a[j]; a[j]=a[j+1]; a[j+1]=t; }`,
  },
  {
    trigger: ["binary search"],
    english: "Search for a target in a sorted array using binary search.",
    mylang: `func bs(arr, target) {\n  let lo = 0\n  let hi = len(arr) - 1\n  while (lo <= hi) {\n    let m = (lo + hi) / 2\n    if (arr[m] == target) { return m }\n    if (arr[m] < target) { lo = m + 1 } else { hi = m - 1 }\n  }\n  return -1\n}\nprint(bs([1,3,5,7,9], 5))`,
    cpp: `int bs(std::vector<int>& a, int t) {\n  int lo=0, hi=a.size()-1;\n  while (lo<=hi) { int m=(lo+hi)/2; if (a[m]==t) return m; if (a[m]<t) lo=m+1; else hi=m-1; }\n  return -1;\n}`,
    java: `static int bs(int[] a, int t) {\n  int lo=0, hi=a.length-1;\n  while (lo<=hi) { int m=(lo+hi)/2; if (a[m]==t) return m; if (a[m]<t) lo=m+1; else hi=m-1; }\n  return -1;\n}`,
  },
  {
    trigger: ["count vowels"],
    english: "Count the number of vowels in a string.",
    mylang: `func countVowels(s) {\n  let count = 0\n  for c in s {\n    if (c == "a" || c == "e" || c == "i" || c == "o" || c == "u") {\n      count = count + 1\n    }\n  }\n  return count\n}\nprint(countVowels("education"))`,
    cpp: `int count = 0;\nfor (char c : s) if (std::string("aeiou").find(c) != std::string::npos) count++;`,
    java: `int count = 0;\nfor (char c : s.toCharArray()) if ("aeiou".indexOf(c) >= 0) count++;`,
  },
  {
    trigger: ["calculate average", "average"],
    english: "Calculate the average of an array of numbers.",
    mylang: `let arr = [10, 20, 30, 40, 50]\nlet sum = 0\nfor x in arr {\n  sum = sum + x\n}\nprint(sum / len(arr))`,
    cpp: `double sum = 0;\nfor (int x : arr) sum += x;\nstd::cout << sum / arr.size();`,
    java: `double sum = 0;\nfor (int x : arr) sum += x;\nSystem.out.println(sum / arr.length);`,
  },
  {
    trigger: ["check prime", "is prime", "prime"],
    english: "Check whether a number is prime.",
    mylang: `func isPrime(n) {\n  if (n < 2) { return false }\n  for i in range(2, n) {\n    if (i * i > n) { break }\n    if (n % i == 0) { return false }\n  }\n  return true\n}\nprint(isPrime(17))`,
    cpp: `bool isPrime(int n) {\n  if (n < 2) return false;\n  for (int i = 2; i*i <= n; ++i) if (n%i == 0) return false;\n  return true;\n}`,
    java: `static boolean isPrime(int n) {\n  if (n < 2) return false;\n  for (int i = 2; i*i <= n; i++) if (n%i == 0) return false;\n  return true;\n}`,
  },
  {
    trigger: ["fizzbuzz"],
    english: "Print FizzBuzz from 1 to 15.",
    mylang: `for i in range(1, 16) {\n  if (i % 15 == 0) { print("FizzBuzz") }\n  else if (i % 3 == 0) { print("Fizz") }\n  else if (i % 5 == 0) { print("Buzz") }\n  else { print(i) }\n}`,
    cpp: `for (int i = 1; i <= 15; ++i) {\n  if (i%15==0) std::cout << "FizzBuzz\\n";\n  else if (i%3==0) std::cout << "Fizz\\n";\n  else if (i%5==0) std::cout << "Buzz\\n";\n  else std::cout << i << "\\n";\n}`,
    java: `for (int i = 1; i <= 15; i++) {\n  if (i%15==0) System.out.println("FizzBuzz");\n  else if (i%3==0) System.out.println("Fizz");\n  else if (i%5==0) System.out.println("Buzz");\n  else System.out.println(i);\n}`,
  },
];
