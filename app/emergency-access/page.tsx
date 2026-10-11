"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  KeyRound, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  Eye, 
  Coins, 
  FileText, 
  Server,
  RefreshCw,
  Sparkles
} from "lucide-react";

export default function EmergencyAccessPage() {
  const [token, setToken] = useState("emg-sarah-789a2b");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Shamir shares input state
  const [share1, setShare1] = useState("a1b2c3d4e5f67890");
  const [share2, setShare2] = useState("f6e5d4c3b2a10987");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptedSuccess, setDecryptedSuccess] = useState(false);

  const fetchEmergencyData = async (tok: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/v1/emergency/${tok}`);
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setError(json.error || "Giriş icazəsi tapılmadı.");
      }
    } catch (e) {
      setError("Serverlə əlaqə qurulmadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check URL params for token
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get("token");
      if (urlToken) {
        setToken(urlToken);
        fetchEmergencyData(urlToken);
      } else {
        fetchEmergencyData(token);
      }
    }
  }, []);

  const handleReconstruct = () => {
    setIsDecrypting(true);
    setTimeout(() => {
      setIsDecrypting(false);
      setDecryptedSuccess(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Seyf Panelinə Qayıt</span>
          </Link>

          <span className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-emerald-400">
            AegisVault Emergency Protocol v1.4
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-4 border border-amber-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Fövqəladə Hal (ICE) Giriş Portalı
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            Təyin olunmuş ailə üzvü və ya vəkil kimi sizə verilmiş təhlükəsizlik tokeni ilə məlumatlara çıxış əldə edin.
          </p>
        </div>

        {/* Token Selector / Input */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
              Fövqəladə Giriş Tokeni (Emergency Access Token)
            </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Məs: emg-sarah-789a2b"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-end w-full sm:w-auto">
            <button
              onClick={() => fetchEmergencyData(token)}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
              <span>Statusu Yoxla</span>
            </button>
          </div>
        </div>

        {/* Portal Status Card */}
        {error && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-rose-400 text-xs flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {data && data.success && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs text-zinc-400">Seyf Sahibi:</span>
                  <h3 className="text-lg font-bold text-white">{data.vaultOwner.name}</h3>
                </div>

                <div>
                  <span className="text-xs text-zinc-400">Təyin Edilmiş Şəxs:</span>
                  <h3 className="text-sm font-semibold text-emerald-400">
                    {data.guardian.name} ({data.guardian.relationship === "SPOUSE" ? "Həyat Yoldaşı" : data.guardian.relationship})
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    data.vaultOwner.isUnlocked
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                      : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  }`}>
                    {data.vaultOwner.isUnlocked ? "Fövqəladə Hal Aktiv (Açıq)" : "Seyf Normal Qorumadadır"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="text-zinc-400">Girişə İcazə Verilmiş Bölmələr:</span>
                {data.guardian.allowedCategories.map((c: string) => (
                  <span key={c} className="font-mono text-[11px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Shamir Multi-Key Combination Box */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-sm text-white">
                    Shamir's Secret Sharing (2-of-3 Açar Birləşdirməsi)
                  </h4>
                </div>
                <span className="text-xs font-mono text-emerald-400">Tələb olunan: 2 Açar Hissəsi</span>
              </div>

              <p className="text-xs text-zinc-400">
                Sizin əlinizdə olan Açar #{data.guardian.shamirShareId || 1} ilə sistemin fövqəladə depozitar açarı (Escrow Share #3) birləşdirilərək əsas şifrə riyazi olaraq bərpa edilir:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Açar Hissəsi #1 (Sizə məxsus)</label>
                  <input
                    type="text"
                    value={share1}
                    onChange={(e) => setShare1(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-300"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Açar Hissəsi #3 (Fövqəladə Trigger / Vəkil)</label>
                  <input
                    type="text"
                    value={share2}
                    onChange={(e) => setShare2(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-mono text-zinc-300"
                  />
                </div>
              </div>

              <button
                onClick={handleReconstruct}
                disabled={isDecrypting}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                {isDecrypting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Unlock className="w-4 h-4" />
                )}
                <span>Açarları Birləşdir və Qranulyar Bölmələri Oxu</span>
              </button>
            </div>

            {/* Decrypted Vault Records Preview */}
            {decryptedSuccess && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Kriptoqrafik Bərpa Uğurlu Oldu! İcazə Verilmiş Məlumatlar:</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                        <Coins className="w-4 h-4 text-emerald-400" />
                        <span>Chase & Schwab Ailə Hesabı + Vəsiyyət Təlimatı</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Maliyyə Seyfi
                      </span>
                    </div>
                    <p className="text-xs font-mono text-emerald-300/90 bg-emerald-950/30 p-2.5 rounded border border-emerald-900/40">
                      Giriş: alex.mercer.trustee | Parol: Tr0st#9824$FamilySafe | Hesab sonluğu: ...4910 (Chase Private Client). Vəkil David Sterling ilə əlaqə: +1 555 789 0123.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-pink-400" />
                        <span>Ailəm üçün Vida Məktubları & Bulud Foto Arxiv Linki</span>
                      </span>
                      <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">
                        Rəqəmsal İrs
                      </span>
                    </div>
                    <p className="text-xs font-mono text-pink-300/90 bg-pink-950/30 p-2.5 rounded border border-pink-900/40">
                      Əziz Sarah və uşaqlar, bütün xatirələr və video mesajlar bu şifrəli linkdədir: https://drive.proton.me/urls/aegis-family-archive | Açma şifrəsi: BizimToyTariximiz2015
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
