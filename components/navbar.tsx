"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Shield, Lock, Menu, X, ArrowRight, CreditCard } from "lucide-react";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/85 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Shield className="h-5 w-5 fill-current/20" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span>Aegis<span className="text-emerald-500">Vault</span></span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                Zero-Knowledge
              </span>
            </div>
            <span className="text-[10px] font-normal text-zinc-500 dark:text-zinc-400">
              Digital Estate & ICE Safeguard
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <Link href="/#how-it-works" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Necə İşləyir?
          </Link>
          <Link href="/#security" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Təhlükəsizlik & Shamir
          </Link>
          <Link href="/#pricing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
            <span>Qiymətlər</span>
            <span className="text-[10px] px-1 bg-blue-500/10 text-blue-500 font-semibold rounded">ePoint</span>
          </Link>
          <Link href="/emergency-access" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Fövqəladə Giriş Portalı</span>
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

          <Link
            href="/dashboard"
            className="flex h-9 items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 text-xs font-semibold text-white shadow-sm shadow-emerald-600/25 transition-all"
          >
            <span>Seyf İdarəetmə Paneli</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
            href="/#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 py-1"
          >
            Necə İşləyir?
          </Link>
          <Link
            href="/#security"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 py-1"
          >
            Təhlükəsizlik & Shamir SSS
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 py-1"
          >
            Qiymətlər & ePoint Ödəniş
          </Link>
          <Link
            href="/emergency-access"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-semibold text-amber-500 py-1"
          >
            Fövqəladə Giriş Portalı
          </Link>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center rounded-lg bg-emerald-600 py-2.5 text-xs font-semibold text-white"
            >
              Seyf İdarəetmə Panelinə Keç
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
