"use client";

import { useState } from "react";
import { Check, Shield, CreditCard, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";

export function Pricing() {
  const [currency, setCurrency] = useState<"USD" | "AZN">("USD");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (planId: string) => {
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/v1/payment/epoint/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, currency }),
      });

      const data = await res.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert(data.error || "Ödəniş başladılarkən xəta baş verdi.");
      }
    } catch (e) {
      console.error(e);
      alert("Ödəniş sistemi ilə əlaqə qurulmadı.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const getPrice = (usd: number) => {
    if (currency === "AZN") {
      // 1 USD approx 1.70 AZN rounded cleanly
      return Math.round(usd * 1.7);
    }
    return usd;
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4">
            <CreditCard className="w-3.5 h-3.5" />
            <span>ePoint ilə Təhlükəsiz İllik Abunəlik</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Ailənizin Gələcəyini İndidən Qoruyun
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            Fövqəladə hal seyfinizi qurun. Gizli komissiya yoxdur, istənilən vaxt ləğv edilə bilər.
          </p>

          {/* Currency Toggle */}
          <div className="mt-8 inline-flex items-center rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1 text-xs font-semibold">
            <button
              onClick={() => setCurrency("USD")}
              className={`rounded-lg px-4 py-2 transition-all ${
                currency === "USD"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("AZN")}
              className={`rounded-lg px-4 py-2 transition-all ${
                currency === "AZN"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              AZN (₼)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => {
            const price = getPrice(plan.priceAnnual);
            const isFeatured = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  isFeatured
                    ? "border-2 border-emerald-500 bg-white dark:bg-zinc-900 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/20"
                    : "border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 shadow-sm"
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-1 text-[11px] font-bold text-white shadow-md uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Tövsiyə Olunan (Ən Populyar)</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {currency === "USD" ? `$${price}` : `₼${price}`}
                    </span>
                    <span className="text-xs font-medium text-zinc-500">/il</span>
                  </div>

                  <ul className="mt-8 space-y-3.5 text-xs text-zinc-600 dark:text-zinc-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => handleCheckout(plan.id)}
                    disabled={loadingPlan === plan.id}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      isFeatured
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30"
                        : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                    }`}
                  >
                    {loadingPlan === plan.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>ePoint-ə yönləndirilir...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>ePoint ilə Abunə Ol</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </>
                    )}
                  </button>

                  <div className="mt-3 text-center">
                    <span className="text-[10px] text-zinc-400">
                      Visa • Mastercard • Apple Pay • Google Pay
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security badge at bottom */}
        <div className="mt-16 text-center max-w-xl mx-auto rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 p-5">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Bütün ödənişlər <strong>ePoint.az</strong> lisenziyalı ödəniş prosessinqi vasitəsilə 3D Secure təhlükəsizlik protokolu ilə qəbul olunur.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
