import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Zap, X, LogOut } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE } from "@/data/profile";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { logout } from "@/api/auth";

const LINKS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/problems/", label: "Problems" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/learn/", label: "Learn MyLang" },
  { to: "/english-to-code", label: "English to Code" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout: authLogout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    authLogout();
    navigate({ to: "/login" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-card/60 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg gradient-bg shadow-lg shadow-primary/30">
            <Zap className="size-4 text-background" strokeWidth={3} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight gradient-text">CodeForge</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary after:scale-x-100" }}
              inactiveProps={{ className: "text-text-secondary hover:text-text-primary" }}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile/"
                className="grid size-9 place-items-center rounded-full bg-secondary text-sm font-bold text-background hover:ring-2 hover:ring-primary/50 transition-all"
                aria-label="Profile"
              >
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </Link>
              <button
                onClick={handleLogout}
                className="grid size-9 place-items-center rounded-lg border border-card bg-surface text-text-secondary hover:text-text-primary hover:bg-card transition-colors"
                aria-label="Log out"
              >
                <LogOut className="size-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="lg:hidden grid size-9 place-items-center rounded-lg bg-card text-text-primary"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 z-50 h-full w-72 border-l border-card bg-surface p-6 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold gradient-text">CodeForge</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-9 place-items-center rounded-lg bg-card">
                  <X className="size-5" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1 flex-1">
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
                
                {isAuthenticated && (
                  <Link
                    to="/profile/"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-text-secondary hover:bg-card hover:text-text-primary"
                  >
                    Profile
                  </Link>
                )}
              </nav>

              <div className="pt-6 border-t border-card mt-auto flex flex-col gap-2">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-card px-4 py-3 text-base font-medium text-text-primary hover:bg-red-500/10 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="size-5" />
                    Log out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-center rounded-xl border border-card px-4 py-3 text-base font-medium text-text-primary hover:bg-card transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-base font-semibold text-background hover:bg-primary/90 transition-colors"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
