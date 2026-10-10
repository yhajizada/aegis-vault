"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Key, 
  Settings, 
  Zap, 
  LogOut, 
  ArrowLeft 
} from "lucide-react";

const NAVIGATION = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between p-4 shrink-0 h-[calc(100vh-4rem)] sticky top-16 hidden md:flex">
      <div className="space-y-6">
        {/* Workspace info */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
            NX
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              Acme Team
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Pro Plan Workspace</span>
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
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom utility links */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Landing</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
