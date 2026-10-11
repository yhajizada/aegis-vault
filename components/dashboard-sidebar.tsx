"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  HeartPulse, 
  Users, 
  CreditCard, 
  KeyRound, 
  Lock, 
  ArrowLeft,
  Coins,
  FileText,
  Server
} from "lucide-react";

const NAVIGATION = [
  { name: "Seyf Mərkəzi (Bütün Bölmələr)", href: "/dashboard", icon: Shield },
  { name: "Dead Man's Switch Nəzarət", href: "/dashboard?tab=switch", icon: HeartPulse },
  { name: "Qəyyumlar & Shamir Açarları", href: "/dashboard?tab=guardians", icon: Users },
  { name: "ePoint Abunəlik & Faktura", href: "/dashboard/billing", icon: CreditCard },
  { name: "Fövqəladə Giriş Portalı (Test)", href: "/emergency-access", icon: Lock },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between p-4 shrink-0 h-[calc(100vh-4rem)] sticky top-16 hidden md:flex">
      <div className="space-y-6">
        {/* Vault info */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              Alex Mercer
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Family Estate Pro
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1">
          {NAVIGATION.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:text-zinc-100"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Vault Modules Quick Access */}
        <div className="px-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Seyf Bölmələri
          </span>
          <div className="mt-2 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2 py-1">
              <Coins className="w-3.5 h-3.5 text-emerald-500" />
              <span>Maliyyə & Kripto</span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <FileText className="w-3.5 h-3.5 text-pink-500" />
              <span>Rəqəmsal İrs & Məktublar</span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Server className="w-3.5 h-3.5 text-cyan-500" />
              <span>Biznes & IT Girişləri</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom utility links */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Əsas Səhifəyə Qayıt</span>
        </Link>
      </div>
    </aside>
  );
}
