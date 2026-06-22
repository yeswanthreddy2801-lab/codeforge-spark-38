import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-black gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-text-primary">Page not found</h2>
        <p className="mt-2 text-sm text-text-secondary">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-background"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-text-primary">This page didn't load</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Something went wrong. Try refreshing or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-background"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-lg border border-card bg-surface px-4 py-2 text-sm font-medium text-text-primary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CodeForge — Learn. Code. Compete. Create." },
      {
        name: "description",
        content:
          "AI-powered competitive coding platform. Solve problems, learn MyLang, and turn plain English into working code.",
      },
      { name: "author", content: "CodeForge" },
      { name: "theme-color", content: "#0F172A" },
      { property: "og:title", content: "CodeForge — Learn. Code. Compete. Create." },
      {
        property: "og:description",
        content:
          "AI-powered competitive coding platform. Solve problems, learn MyLang, and turn plain English into working code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CodeForge" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4'%3E%3Cpath d='M13 2L3 14h7l-1 8 10-12h-7l1-8z'/%3E%3C/svg%3E",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-text-primary">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const authLogin = useAuthStore((s) => s.login);
  const authLogout = useAuthStore((s) => s.logout);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log("Initial getSession:", { session, error });
      if (session) {
        authLogin(session.access_token, {
          id: session.user.id,
          username: session.user.user_metadata?.username || session.user.email?.split("@")[0] || "User",
          email: session.user.email || "",
          joinedAt: session.user.created_at,
        });
      }
    });

    // Listen for auth changes (like email verification redirect)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Supabase onAuthStateChange:", event, session);
        if (event === "SIGNED_IN" && session) {
          authLogin(session.access_token, {
            id: session.user.id,
            username: session.user.user_metadata?.username || session.user.email?.split("@")[0] || "User",
            email: session.user.email || "",
            joinedAt: session.user.created_at,
          });
        } else if (event === "SIGNED_OUT") {
          authLogout();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [authLogin, authLogout]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#f8fafc",
          },
        }}
      />
    </QueryClientProvider>
  );
}
