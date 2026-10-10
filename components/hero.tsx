import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Release tag pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/30 px-3.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-8 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Next.js 15 App Router & React 19 Ready</span>
          <ArrowRight className="h-3 w-3" />
        </div>

        {/* Main Headline */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl md:text-7xl">
          Build & Ship SaaS Products <br />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            at 10x Velocity
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
          A production-grade, enterprise boilerplate complete with TypeScript, Tailwind CSS,
          Prisma ORM, mock Auth, responsive dashboard analytics, Docker, and GitHub Actions CI/CD.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="flex h-12 items-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 hover:shadow-indigo-500/35 transition-all"
          >
            <span>Live Interactive Demo</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-6 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-all backdrop-blur-sm"
          >
            <Terminal className="h-4 w-4 text-zinc-500" />
            <span>git clone repo</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>100% TypeScript Strict Mode</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-indigo-500" />
            <span>Production CI/CD Automated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Zero Config SQLite / Postgres Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
