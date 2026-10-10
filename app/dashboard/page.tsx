"use client";

import { useState } from "react";
import { MetricCard } from "@/components/metric-card";
import { MOCK_METRICS, RECENT_ACTIVITY } from "@/lib/constants";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Activity, 
  Plus, 
  Download, 
  Filter, 
  CheckCircle,
  Clock
} from "lucide-react";

export default function DashboardPage() {
  const [activityList, setActivityList] = useState(RECENT_ACTIVITY);
  const [filter, setFilter] = useState("all");

  const revenueBars = [
    { month: "Jan", height: "45%", value: "$12.4k" },
    { month: "Feb", height: "55%", value: "$14.8k" },
    { month: "Mar", height: "50%", value: "$13.9k" },
    { month: "Apr", height: "68%", value: "$18.2k" },
    { month: "May", height: "75%", value: "$20.5k" },
    { month: "Jun", height: "60%", value: "$17.1k" },
    { month: "Jul", height: "82%", value: "$22.8k" },
    { month: "Aug", height: "90%", value: "$24.9k" },
  ];

  const handleSimulateNewEvent = () => {
    const newEvent = {
      id: Date.now().toString(),
      user: "Jordan Peterson",
      email: "jordan@startup.dev",
      action: "New Subscription Added",
      amount: "$29.00",
      date: "Just now",
      status: "Completed",
    };
    setActivityList([newEvent, ...activityList]);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Analytics Overview
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Real-time platform performance and business telemetry metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Telemetry export report generated (Nexus-Report-2026.csv)")}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleSimulateNewEvent}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Simulate Event</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Monthly Recurring Revenue"
          value={`$${MOCK_METRICS.mrr.toLocaleString()}`}
          change={MOCK_METRICS.mrrGrowth}
          isPositive={true}
          icon={DollarSign}
          subtitle="Compared to previous 30 days"
        />
        <MetricCard
          title="Active Users"
          value={MOCK_METRICS.activeUsers.toLocaleString()}
          change={MOCK_METRICS.activeUsersGrowth}
          isPositive={true}
          icon={Users}
          subtitle="DAU/MAU engagement score: 78%"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${MOCK_METRICS.conversionRate}%`}
          change={MOCK_METRICS.conversionRateGrowth}
          isPositive={true}
          icon={TrendingUp}
          subtitle="Visitor-to-paid conversion"
        />
        <MetricCard
          title="Net Churn Rate"
          value={`${MOCK_METRICS.churnRate}%`}
          change={MOCK_METRICS.churnRateGrowth}
          isPositive={true}
          icon={Activity}
          subtitle="Industry benchmark: < 3%"
        />
      </div>

      {/* Chart & Quick Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Performance Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Revenue Trajectory
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Monthly gross volume</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
              <span className="text-zinc-500 dark:text-zinc-400">Current Year</span>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-zinc-100 dark:border-zinc-800/60">
            {revenueBars.map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-medium text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.value}
                </span>
                <div className="w-full max-w-[42px] bg-indigo-50 dark:bg-indigo-950/40 rounded-t-lg overflow-hidden flex items-end h-48">
                  <div
                    style={{ height: bar.height }}
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-500 rounded-t-lg group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick System Status & Health */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              System Telemetry
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Live status & connectivity</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">API Gateway</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" /> 99.98% Healthy
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Prisma Database</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" /> Connected
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Average Response Latency</span>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">24 ms</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Active Node Version</span>
                <span className="font-mono text-zinc-700 dark:text-zinc-300">Node v20+</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-900/40 p-4">
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              ⚡ Production Ready
            </span>
            <p className="mt-1 text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              This dashboard is powered by Next.js Server Components, client state hooks, and Prisma ORM models.
            </p>
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Live Event Activity
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Recent user transactions, events, and audit logs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-zinc-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-700 dark:text-zinc-300 focus:outline-none"
            >
              <option value="all">All Events</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-950/50 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Action</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {activityList.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">{item.user}</div>
                    <div className="text-zinc-400 text-[11px]">{item.email}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-700 dark:text-zinc-300">
                    {item.action}
                  </td>
                  <td className="px-6 py-4 font-mono text-zinc-900 dark:text-zinc-100">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
