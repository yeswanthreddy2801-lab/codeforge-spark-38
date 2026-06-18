import { Link } from "@tanstack/react-router";
import { Zap, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-card bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 sm:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg gradient-bg">
            <Zap className="size-3.5 text-background" strokeWidth={3} />
          </span>
          <span className="font-display font-bold gradient-text">CodeForge</span>
          <span className="ml-2 italic text-xs text-text-secondary hidden sm:inline">
            Learn. Code. Compete. Create.
          </span>
        </div>
        <nav className="flex items-center gap-5 text-sm text-text-secondary">
          <Link to="/problems" className="hover:text-text-primary">Problems</Link>
          <Link to="/leaderboard" className="hover:text-text-primary">Leaderboard</Link>
          <Link to="/learn" className="hover:text-text-primary">Learn</Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-text-primary">
            <Github className="size-4" /> GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
