import Link from "next/link";
import { Shield, Lock, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                AegisVault
              </span>
              <p className="text-[11px] text-zinc-500">
                Zero-Knowledge Digital Estate & Emergency Safeguard
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600 dark:text-zinc-400">
            <Link href="/#how-it-works" className="hover:text-emerald-500 transition-colors">
              İş Prinsipi
            </Link>
            <Link href="/#security" className="hover:text-emerald-500 transition-colors">
              Shamir SSS Arxitekturası
            </Link>
            <Link href="/#pricing" className="hover:text-emerald-500 transition-colors">
              Qiymətlər & ePoint
            </Link>
            <Link href="/emergency-access" className="text-amber-500 hover:text-amber-400 font-semibold flex items-center gap-1 transition-colors">
              <Lock className="w-3 h-3" />
              <span>Fövqəladə Portal</span>
            </Link>
            <Link href="/dashboard" className="hover:text-emerald-500 transition-colors">
              İdarəetmə Paneli
            </Link>
          </div>

          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-1.5 text-[11px] text-zinc-500">
              <CreditCard className="w-3.5 h-3.5 text-blue-500" />
              <span>ePoint Ödəniş Sistemi ilə Mühafizə Olunur</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              &copy; {new Date().getFullYear()} AegisVault. Bütün hüquqlar qorunur.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
