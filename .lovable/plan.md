# CodeForge Frontend Build Plan

## Stack adaptation (important)
Your spec calls for **React Router v6 + Vite**, but this project runs on **TanStack Start** (file-based TanStack Router + Vite + Tailwind v4). Swapping to plain Vite/RR6 would require demolishing the project shell. I'll keep TanStack Start and adapt 1:1:

- `src/pages/*` → `src/routes/*.tsx` (file-based routes, same URLs)
- `react-router-dom` `<Link>`, `useNavigate`, `<Outlet>` → `@tanstack/react-router` equivalents
- React Query, Zustand, Zod, RHF, Framer Motion, Monaco — installed as requested
- Tailwind v4: design tokens go in `src/styles.css` `@theme` block (not `tailwind.config.ts`); same color names/usage
- Fonts loaded via `<link>` in `__root.tsx` head (Tailwind v4 + Lightning CSS can't `@import` remote URLs)

Everything else — colors, typography, components, pages, animations, mock data, store shapes, API layer — matches your spec exactly.

## Scope
All 7 pages, all listed components, mock data toggle (`VITE_USE_MOCK`), Zustand stores, typed React Query hooks, Axios layer with auth interceptor, Framer Motion transitions, responsive breakpoints, dark-only.

## Build order
1. **Design system & deps** — install axios, @tanstack/react-query, zustand, framer-motion, @monaco-editor/react, zod, react-hook-form, sonner, canvas-confetti, lucide (already in); add fonts via `__root.tsx`; write color tokens in `src/styles.css`.
2. **Types** — `problem.ts`, `user.ts`, `submission.ts`, `leaderboard.ts`.
3. **API layer** — `axios.ts` with interceptors, per-domain modules, mock-mode branching.
4. **Mock data** — problems, leaderboard, profile, 3 lessons.
5. **Stores** — auth, editor, learn (+ persist auth/learn to localStorage).
6. **Hooks** — React Query wrappers for every endpoint.
7. **Layout** — Navbar (sticky, gradient logo, mobile drawer), Footer, root providers (QueryClient already wired).
8. **Atoms** — DifficultyBadge, StatusIndicator, LoadingSkeleton, custom Badge.
9. **Pages** in order: Home → Problems → ProblemDetail (Monaco lazy) → Leaderboard → Learn → EnglishToCode → Profile.
10. **Polish** — page transitions, toast wiring, focus rings, skeletons, empty/error states.

## Key technical notes
- Monaco is `React.lazy` + Suspense to keep initial bundle small and dodge SSR `window` issues.
- Resizable split panes: lightweight custom drag handle (no extra dep).
- Activity heatmap: pure CSS grid + custom tooltip.
- "English to Code" streaming: simulated line-by-line reveal via `setInterval` over mock response when `VITE_USE_MOCK=true`.
- Auth pages (Sign In/Sign Up) are out of scope per your spec — buttons in navbar are visual only / route stubs.
- No real backend — all hooks return mock data by default; flipping `VITE_USE_MOCK=false` makes them hit `VITE_API_BASE_URL`.

## Out of scope (call out)
- Real auth, real code execution, real AI translation — UI + API contracts only.
- Backend / Lovable Cloud — not enabled (frontend-only per your request).
- Light mode.

## Estimated output
~50 new files. Single build pass. After it ships you can iterate page-by-page.

Reply **approve** to build, or tell me what to trim (e.g. "skip Profile + Learn for v1").