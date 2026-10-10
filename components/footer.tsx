import Link from "next/link";
import { Zap, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/50 py-12 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Zap className="h-4 w-4 fill-current" />
            </div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Nexus SaaS Starter
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/#features" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Pricing
            </Link>
            <Link href="/dashboard" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Dashboard
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              GitHub
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} Nexus SaaS Template. Open-source under MIT License.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="h-3 w-3 text-red-500 fill-current" /> for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
