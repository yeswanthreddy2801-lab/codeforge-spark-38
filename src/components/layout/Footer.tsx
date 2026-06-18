import { Link } from "@tanstack/react-router";
import { Zap, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-card bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg gradient-bg">
                <Zap className="size-4 text-background" strokeWidth={3} />
              </span>
              <span className="font-display text-xl font-bold gradient-text">
                CodeForge
              </span>
            </Link>
            <p className="mt-3 text-sm italic text-text-secondary">
              Learn. Code. Compete. Create.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li><Link to="/problems" className="hover:text-text-primary">Problems</Link></li>
              <li><Link to="/leaderboard" className="hover:text-text-primary">Leaderboard</Link></li>
              <li><Link to="/learn" className="hover:text-text-primary">Learn MyLang</Link></li>
              <li><Link to="/english-to-code" className="hover:text-text-primary">English to Code</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-text-primary">Docs</a></li>
              <li><a href="#" className="hover:text-text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-text-primary">Changelog</a></li>
              <li><a href="#" className="hover:text-text-primary">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary">Social</h4>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="GitHub" className="grid size-9 place-items-center rounded-lg bg-card text-text-secondary hover:text-text-primary">
                <Github className="size-4" />
              </a>
              <a href="#" aria-label="Twitter" className="grid size-9 place-items-center rounded-lg bg-card text-text-secondary hover:text-text-primary">
                <Twitter className="size-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="grid size-9 place-items-center rounded-lg bg-card text-text-secondary hover:text-text-primary">
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-card pt-6 text-xs text-text-secondary sm:flex-row">
          <span>© {new Date().getFullYear()} CodeForge. All rights reserved.</span>
          <span>Built with ❤️ and MyLang</span>
        </div>
      </div>
    </footer>
  );
}
