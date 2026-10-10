"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Github, Menu, X, Zap } from "lucide-react";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <span>Nexus<span className="text-indigo-600 dark:text-indigo-400">.</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/#features" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Features
          </Link>
          <Link href="/#pricing" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Pricing
          </Link>
          <Link href="/dashboard" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Dashboard
          </Link>
          <Link href="/api/v1/health" target="_blank" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            API Health
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>Star on GitHub</span>
          </a>

          <Link
            href="/dashboard"
            className="flex h-9 items-center justify-center rounded-lg bg-indigo-600 px-4 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
          >
            Go to App
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-600 dark:text-zinc-400"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-3">
          <Link
            href="/#features"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 py-1"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 py-1"
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 py-1"
          >
            Dashboard
          </Link>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white"
            >
              Go to App
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
