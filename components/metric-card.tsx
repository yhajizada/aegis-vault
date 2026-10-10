import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  subtitle: string;
}

export function MetricCard({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  subtitle,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {value}
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
            isPositive
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
              : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
          }`}
        >
          {change}
        </span>
      </div>

      <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">{subtitle}</p>
    </div>
  );
}
