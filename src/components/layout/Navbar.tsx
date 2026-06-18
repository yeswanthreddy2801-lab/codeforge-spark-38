import { Link } from "@tanstack/react-router";
import { Menu, Zap, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/problems", label: "Problems" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/learn", label: "Learn MyLang" },
  { to: "/english-to-code", label: "English To Code" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const isAuth = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-card/60 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg gradient-bg shadow-lg shadow-primary/30">
            <Zap className="size-4 text-background" strokeWidth={3} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight gradient-text">
            CodeForge
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{
                className: "text-text-primary after:scale-x-100",
              }}
              inactiveProps={{
                className: "text-text-secondary hover:text-text-primary",
              }}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300",
                "hover:after:scale-x-100",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isAuth && user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile/$username"
                params={{ username: user.username }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-card px-2 py-1 hover:border-primary/40 transition-colors"
              >
                <img
                  src={user.avatarUrl ?? `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`}
                  alt={user.username}
                  className="size-7 rounded-full"
                />
                <span className="pr-1 text-sm">{user.username}</span>
              </Link>
              <button
                onClick={logout}
                className="rounded-lg px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary">
                Sign In
              </button>
              <button className="rounded-lg gradient-bg px-4 py-1.5 text-sm font-semibold text-background shadow-md shadow-primary/20 transition-transform hover:scale-[1.03]">
                Sign Up
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="md:hidden grid size-9 place-items-center rounded-lg bg-card text-text-primary"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 z-50 h-full w-72 border-l border-card bg-surface p-6 md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold gradient-text">
                  CodeForge
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-9 place-items-center rounded-lg bg-card"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-text-secondary hover:bg-card hover:text-text-primary"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-2">
                <button className="rounded-xl bg-card px-4 py-3 text-sm font-medium">
                  Sign In
                </button>
                <button className="rounded-xl gradient-bg px-4 py-3 text-sm font-semibold text-background">
                  Sign Up
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
