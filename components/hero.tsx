"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  HeartPulse, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Terminal,
  CreditCard
} from "lucide-react";
import { encryptData, decryptData } from "@/lib/vault-crypto";

export function Hero() {
  // Live Zero-Knowledge Simulator State
  const [testSecret, setTestSecret] = useState("Chase Bank Account #4819 | BTC Seed: apple banana desert ...");
  const [testPassword, setTestPassword] = useState("AiləmÜçünGüclüŞifrə#2026");
  const [encryptedResult, setEncryptedResult] = useState<any>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [showCleartext, setShowCleartext] = useState(false);

  const handleTestEncrypt = async () => {
    setIsEncrypting(true);
    try {
      const payload = await encryptData(testSecret, testPassword);
      setEncryptedResult(payload);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <div className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust Pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 backdrop-blur-md shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Sıfır-Bilgi (Zero-Knowledge) & Shamir's Secret Sharing Memarlığı</span>
          </div>
        </div>

        {/* Headline */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl sm:leading-[1.15]">
            Rəqəmsal İrsiniz və Fövqəladə Hal{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
              (ICE) Seyfi
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto">
            Qəfil xəstələndikdə və ya həyatınızı itirdikdə ailəniz bank hesabları, kripto cüzdanlar və vacib sənədlər
            barədə çaşqınlıq içində qalmasın. Müəyyən müddət cavab vermədikdə, təyin etdiyiniz şəxslərə yalnız onların ehtiyacı olan məlumatlar avtomatik və təhlükəsiz ötürülür.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
            >
              <span>Seyf Qur və İdarə Et</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/emergency-access"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 px-6 py-3.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
            >
              <Lock className="h-4 w-4 text-amber-500" />
              <span>Fövqəladə Giriş Portalını Test Et</span>
            </Link>
          </div>

          {/* ePoint Accepted Banner */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <CreditCard className="w-4 h-4 text-emerald-500" />
            <span>ePoint ilə təhlükəsiz ödəniş: Visa, Mastercard, Apple Pay & Google Pay</span>
          </div>
        </div>

        {/* Live Zero-Knowledge Cryptography Simulator Widget */}
        <div className="mt-14 max-w-3xl mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/90 shadow-2xl backdrop-blur-xl p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span>Canlı Zero-Knowledge Şifrələmə Simulyatoru</span>
                <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
                  AES-256-GCM
                </span>
              </h3>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Brauzerinizdə İcra Olunur
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                Həssas Məlumat (Yalnız cihazınızda şifrələnir)
              </label>
              <input
                type="text"
                value={testSecret}
                onChange={(e) => setTestSecret(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                placeholder="Bank parolu, kripto cüzdan sözləri..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                  Əsas Şifrəniz (Master Password)
                </label>
                <input
                  type="password"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleTestEncrypt}
                  disabled={isEncrypting}
                  className="w-full sm:w-auto h-[42px] px-5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  {isEncrypting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <KeyRound className="w-4 h-4 text-emerald-500" />
                  )}
                  <span>Şifrələməni Test Et</span>
                </button>
              </div>
            </div>

            {/* Ciphertext Output Terminal */}
            {encryptedResult && (
              <div className="mt-4 rounded-xl bg-zinc-950 p-4 border border-zinc-800 text-xs font-mono text-zinc-300 space-y-2">
                <div className="flex items-center justify-between text-zinc-500 border-b border-zinc-800 pb-1.5">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Terminal className="w-3.5 h-3.5" /> Serverə Gedən Şifrələnmiş Məlumat (Ciphertext):
                  </span>
                  <span className="text-[10px] text-zinc-400">PBKDF2-SHA256 (100,000 dövr)</span>
                </div>
                <div className="break-all text-emerald-400/90 bg-zinc-900/60 p-2.5 rounded border border-emerald-950">
                  {encryptedResult.ciphertext}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-1">
                  <div>
                    <span className="text-zinc-500">Təsadüfi IV:</span> {encryptedResult.iv}
                  </div>
                  <div>
                    <span className="text-zinc-500">Kriptoqrafik Salt:</span> {encryptedResult.salt}
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 pt-1 italic">
                  🛡️ <strong>Sıfır-Bilgi Zəmanəti:</strong> Serverimizə heç vaxt açıq mətn və ya əsas şifrəniz çatmır. Hətta sistemimiz sındırılsa belə, AES-256-GCM riyazi olaraq qırılmazdır!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
