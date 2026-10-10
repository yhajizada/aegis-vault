"use client";

import { useState } from "react";
import { PRICING_PLANS } from "@/lib/constants";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Pricing Plans
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Predictable, transparent pricing
          </p>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Choose the tier that matches your product stage. Switch anytime.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 p-1.5 text-xs font-medium">
            <button
              onClick={() => setIsAnnual(false)}
              className={`rounded-full px-4 py-1.5 transition-all ${
                !isAnnual
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all ${
                isAnnual
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <span>Annual</span>
              <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.priceYearly : plan.priceMonthly;
            const period = isAnnual ? "/year" : "/month";

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl border p-8 transition-all ${
                  plan.popular
                    ? "border-indigo-600 bg-white dark:bg-zinc-900 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-600"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-[11px] font-semibold text-white shadow-md">
                    <Sparkles className="h-3 w-3" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{plan.name}</h3>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 min-h-[40px]">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                      ${price}
                    </span>
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{period}</span>
                  </div>

                  <div className="my-8 h-px bg-zinc-200 dark:bg-zinc-800" />

                  <ul className="space-y-3.5 text-sm text-zinc-600 dark:text-zinc-300">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href="/dashboard"
                    className={`flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                      plan.popular
                        ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-500/25"
                        : "border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    Get started with {plan.name}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
