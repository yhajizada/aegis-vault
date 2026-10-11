"use client";

import { useState } from "react";
import { 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  Clock
} from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";

export default function BillingPage() {
  const [currency, setCurrency] = useState<"USD" | "AZN">("USD");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  // Check URL query parameters for return status from ePoint
  if (typeof window !== "undefined" && !paymentStatus) {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    if (status) {
      setPaymentStatus(status);
    }
  }

  const handleEpointCheckout = async (planId: string) => {
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
      alert("ePoint ödəniş sistemi ilə əlaqə qurulmadı.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const getPrice = (usd: number) => {
    return currency === "AZN" ? Math.round(usd * 1.7) : usd;
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Abunəlik və ePoint Ödənişləri
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Seyfinizin aktiv qalması və Dead Man's Switch bildirişlərinin fasiləsiz işləməsi üçün illik planınızı idarə edin.
        </p>
      </div>

      {/* Payment Success Banner */}
      {paymentStatus === "success" && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-bold">Ödəniş ePoint vasitəsilə uğurla tamamlandı!</p>
              <p className="text-[11px] text-zinc-500">
                AegisVault abunəliyiniz 1 il müddətinə aktivləşdirildi.
              </p>
            </div>
          </div>
          <button
            onClick={() => setPaymentStatus(null)}
            className="text-xs font-semibold underline"
          >
            Bağla
          </button>
        </div>
      )}

      {/* Current Active Plan Card */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Family Estate Pro
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  Aktiv Abunəlik
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Növbəti yenilənmə tarixi: 320 gün sonra • İllik $69 (və ya ₼117 AZN)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500">ePoint Merchant: Aktiv</span>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Mövcud Abunəlik Paketləri (ePoint ilə Ödəniş)
          </h3>

          <div className="inline-flex items-center rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1 text-xs font-semibold">
            <button
              onClick={() => setCurrency("USD")}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                currency === "USD" ? "bg-white dark:bg-zinc-900 shadow-sm" : "text-zinc-500"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("AZN")}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                currency === "AZN" ? "bg-white dark:bg-zinc-900 shadow-sm" : "text-zinc-500"
              }`}
            >
              AZN (₼)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRICING_PLANS.map((plan) => {
            const price = getPrice(plan.priceAnnual);
            const isCurrent = plan.id === "family_pro";

            return (
              <div
                key={plan.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between ${
                  isCurrent
                    ? "border-emerald-500/50 bg-emerald-500/5 dark:bg-emerald-500/5"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60"
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {plan.name}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-500 min-h-[32px]">
                    {plan.description}
                  </p>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
                      {currency === "USD" ? `$${price}` : `₼${price}`}
                    </span>
                    <span className="text-xs text-zinc-500">/illik</span>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => handleEpointCheckout(plan.id)}
                    disabled={loadingPlan === plan.id}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      isCurrent
                        ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                    }`}
                  >
                    {loadingPlan === plan.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CreditCard className="w-4 h-4" />
                    )}
                    <span>{isCurrent ? "Planı Yenilə (ePoint)" : "Seç və Ödə (ePoint)"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
