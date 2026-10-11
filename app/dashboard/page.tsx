"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  HeartPulse, 
  Lock, 
  Unlock, 
  Plus, 
  Users, 
  KeyRound, 
  Coins, 
  FileText, 
  Server, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Copy, 
  Trash2, 
  Eye, 
  EyeOff,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { encryptData, decryptData } from "@/lib/vault-crypto";

export default function DashboardPage() {
  // State
  const [activeTab, setActiveTab] = useState<"vault" | "switch" | "guardians">("vault");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [items, setItems] = useState<any[]>([]);
  const [guardians, setGuardians] = useState<any[]>([]);
  const [switchData, setSwitchData] = useState<any>({
    switchStatus: "ACTIVE",
    frequencyDays: 60,
    daysRemaining: 58,
    lastCheckInAt: new Date().toISOString(),
    nextCheckInDue: new Date(Date.now() + 58 * 86400000).toISOString(),
    checkInLogs: [],
  });

  // Client-side Zero-Knowledge Master Password state
  const [masterPassword, setMasterPassword] = useState("AiləmÜçünGüclüŞifrə#2026");
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [decryptedCache, setDecryptedCache] = useState<Record<string, string>>({});

  // Loading & Action states
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // New Item Form
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("FINANCIAL");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemSecret, setNewItemSecret] = useState("");
  const [newItemHint, setNewItemHint] = useState("");
  const [isSavingItem, setIsSavingItem] = useState(false);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [vaultRes, switchRes, guardianRes] = await Promise.all([
        fetch("/api/v1/vault"),
        fetch("/api/v1/switch"),
        fetch("/api/v1/guardians"),
      ]);

      const vaultData = await vaultRes.json();
      const swData = await switchRes.json();
      const gData = await guardianRes.json();

      if (vaultData.items) setItems(vaultData.items);
      if (swData.success) setSwitchData(swData);
      if (gData.guardians) setGuardians(gData.guardians);
    } catch (e) {
      console.error("Data load error:", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle "I am alive" Heartbeat
  const handleHeartbeat = async () => {
    setIsCheckingIn(true);
    try {
      const res = await fetch("/api/v1/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check_in" }),
      });
      const data = await res.json();
      if (data.success) {
        setCheckInSuccess(true);
        setTimeout(() => setCheckInSuccess(false), 4000);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingIn(false);
    }
  };

  // Simulate Escalation Tier
  const handleSimulateStatus = async (status: string) => {
    try {
      await fetch("/api/v1/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "simulate_tier", status }),
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  // Zero-Knowledge Decryption of items in memory
  const handleUnlockVault = async () => {
    if (!masterPassword) {
      alert("Zəhmət olmasa əsas şifrənizi daxil edin.");
      return;
    }

    const decryptedMap: Record<string, string> = {};
    for (const item of items) {
      try {
        const payload = JSON.parse(item.encryptedPayload);
        const clearText = await decryptData(payload, masterPassword);
        decryptedMap[item.id] = clearText;
      } catch (err) {
        decryptedMap[item.id] = "⚠️ Şifrə açma xətası (Yanlış master şifrə)";
      }
    }

    setDecryptedCache(decryptedMap);
    setIsVaultUnlocked(true);
  };

  const handleLockVault = () => {
    setIsVaultUnlocked(false);
    setDecryptedCache({});
  };

  // Add Item with client-side Zero-Knowledge encryption
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle || !newItemSecret || !masterPassword) {
      alert("Bütün vacib xanaları və master şifrənizi daxil edin.");
      return;
    }

    setIsSavingItem(true);
    try {
      // 1. Encrypt client-side in browser memory
      const encrypted = await encryptData(newItemSecret, masterPassword);

      // 2. Send only ciphertext to server
      const res = await fetch("/api/v1/vault", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newItemTitle,
          category: newItemCategory,
          description: newItemDescription,
          encryptedPayload: JSON.stringify(encrypted),
          hint: newItemHint,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAddingItem(false);
        setNewItemTitle("");
        setNewItemSecret("");
        setNewItemDescription("");
        setNewItemHint("");
        fetchData();
      }
    } catch (e) {
      console.error(e);
      alert("Şifrələmə zamanı xəta baş verdi.");
    } finally {
      setIsSavingItem(false);
    }
  };

  // Delete item
  const handleDeleteItem = async (id: string) => {
    if (!confirm("Bu qeydi silmək istədiyinizdən əminsiniz?")) return;
    await fetch(`/api/v1/vault?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  // Copy Emergency Link
  const handleCopyLink = (token: string) => {
    const link = `${window.location.origin}/emergency-access?token=${token}`;
    navigator.clipboard.writeText(link);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  // Filter items
  const filteredItems = items.filter((item) =>
    categoryFilter === "ALL" ? true : item.category === categoryFilter
  );

  return (
    <div className="space-y-8 pb-16">
      {/* 1. DEAD MAN'S SWITCH COMMAND BANNER */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  switchData.switchStatus === "ACTIVE" ? "bg-emerald-400" : "bg-amber-400"
                }`} />
                <span className={`relative inline-flex rounded-full h-3 w-3 ${
                  switchData.switchStatus === "ACTIVE" ? "bg-emerald-500" : "bg-amber-500"
                }`} />
              </span>
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-400">
                Dead Man's Switch: {switchData.switchStatus === "ACTIVE" ? "Aktiv & Nəzarətdə" : switchData.switchStatus}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
              Növbəti Təsdiqə:{" "}
              <span className="text-emerald-400 font-mono">
                {switchData.daysRemaining} gün
              </span>{" "}
              qalıb
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Dövr: hər {switchData.frequencyDays} gündən bir. Əgər təyin olunmuş müddətdə "Mən sağam" təsdiqi verilməsə, sistem pilləli bildiriş və fövqəladə ötürmə rejiminə keçəcək.
            </p>
          </div>

          {/* Large Heartbeat Action Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleHeartbeat}
              disabled={isCheckingIn}
              className={`w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-lg transition-all ${
                checkInSuccess
                  ? "bg-emerald-500 text-white shadow-emerald-500/30 scale-105"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:-translate-y-0.5"
              }`}
            >
              {isCheckingIn ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : checkInSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <HeartPulse className="w-5 h-5 text-emerald-200 animate-pulse" />
              )}
              <span>{checkInSuccess ? "Təsdiqləndi! Vaxt Yeniləndi" : "MƏN SAĞAM (I AM ALIVE)"}</span>
            </button>
          </div>
        </div>

        {/* Live Simulator Toggles for Testing Escalation Tiers */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <span className="text-zinc-400 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pilləli Trigger Simulyasiyası (Test üçün):</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleSimulateStatus("ACTIVE")}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                switchData.switchStatus === "ACTIVE"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Normal (Aktiv)
            </button>
            <button
              onClick={() => handleSimulateStatus("GRACE_TIER_1")}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                switchData.switchStatus === "GRACE_TIER_1"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Pillə 1: E-poçt & SMS
            </button>
            <button
              onClick={() => handleSimulateStatus("URGENT_TIER_2")}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                switchData.switchStatus === "URGENT_TIER_2"
                  ? "bg-orange-500/20 text-orange-300 border border-orange-500/40"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Pillə 2: Təcili Push
            </button>
            <button
              onClick={() => handleSimulateStatus("ESCALATED_TIER_3")}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                switchData.switchStatus === "ESCALATED_TIER_3"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Pillə 3: Qəyyum Təsdiqi
            </button>
            <button
              onClick={() => handleSimulateStatus("TRIGGERED")}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                switchData.switchStatus === "TRIGGERED"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Seyf Açıldı (Triggered)
            </button>
          </div>
        </div>
      </div>

      {/* 2. ZERO-KNOWLEDGE MASTER PASSWORD & DECRYPTION BAR */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
              isVaultUnlocked 
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            }`}>
              {isVaultUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span>Seyf Şifrələmə Statusu:</span>
                <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                  isVaultUnlocked 
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}>
                  {isVaultUnlocked ? "AÇIQ (Brauzer Yaddaşında)" : "KİLİDLİ (AES-256-GCM Şifrəli)"}
                </span>
              </h3>
              <p className="text-[11px] text-zinc-500">
                {isVaultUnlocked 
                  ? "Məlumatlar brauzerinizdə açıldı. Server açıq mətni görə bilmir." 
                  : "Hazırda bütün qeydlər sıfır-bilgi (Zero-Knowledge) ilə kilidlidir."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {!isVaultUnlocked ? (
              <div className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="password"
                  value={masterPassword}
                  onChange={(e) => setMasterPassword(e.target.value)}
                  placeholder="Master Şifrəniz..."
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
                />
                <button
                  onClick={handleUnlockVault}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Seyfi Aç</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleLockVault}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Yaddaşı Təmizlə və Kilidlə</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. TABS HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("vault")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "vault"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Seyf Qeydləri ({items.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("guardians")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "guardians"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Qəyyumlar & Shamir Açarları ({guardians.length})</span>
          </button>
        </div>

        {activeTab === "vault" && (
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 focus:outline-none"
            >
              <option value="ALL">Bütün Bölmələr</option>
              <option value="FINANCIAL">Maliyyə & Kripto</option>
              <option value="LEGACY">Rəqəmsal İrs</option>
              <option value="BUSINESS_IT">Biznes & IT</option>
            </select>

            <button
              onClick={() => setIsAddingItem(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni Şifrəli Qeyd</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. MODAL: ADD NEW ITEM */}
      {isAddingItem && (
        <div className="rounded-3xl border border-emerald-500/30 bg-white dark:bg-zinc-900 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-500" />
              <span>Yeni Şifrəli Seyf Qeydi Əlavə Et</span>
            </h4>
            <button
              onClick={() => setIsAddingItem(false)}
              className="text-xs text-zinc-400 hover:text-zinc-600"
            >
              Bağla
            </button>
          </div>

          <form onSubmit={handleSaveItem} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Başlıq / Xidmət Adı
                </label>
                <input
                  type="text"
                  required
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="Məs: Chase Bank Hesabı və ya Ledger Seed Fraza"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Bölmə (Granular Modul)
                </label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
                >
                  <option value="FINANCIAL">Maliyyə & Kripto Seyfi</option>
                  <option value="LEGACY">Rəqəmsal İrs & Xatirələr</option>
                  <option value="BUSINESS_IT">Biznes & IT İnfrastruktur</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Təsvir (Ailəniz üçün qısa izahat)
              </label>
              <input
                type="text"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
                placeholder="Məs: Əsas ailə yığım hesabı, şifrə aşağıda şifrələnib"
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Gizli Məlumat (Client-side AES-256-GCM ilə şifrələnəcək)
              </label>
              <textarea
                required
                rows={3}
                value={newItemSecret}
                onChange={(e) => setNewItemSecret(e.target.value)}
                placeholder="Parollar, 24-sözlük kripto bərpa sözləri, PIN kodlar, vəsiyyət qeydləri..."
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3 text-xs text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingItem(false)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                disabled={isSavingItem}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {isSavingItem ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Lock className="w-3.5 h-3.5" />
                )}
                <span>Şifrələ və Yaddaşa Yaz</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. TAB: VAULT ITEMS LIST */}
      {activeTab === "vault" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map((item) => {
            const isFinancial = item.category === "FINANCIAL";
            const isLegacy = item.category === "LEGACY";
            const isIT = item.category === "BUSINESS_IT";
            const clearText = decryptedCache[item.id];

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        isFinancial
                          ? "bg-emerald-500/10 text-emerald-500"
                          : isLegacy
                          ? "bg-pink-500/10 text-pink-500"
                          : "bg-cyan-500/10 text-cyan-500"
                      }`}>
                        {isFinancial ? <Coins className="w-4 h-4" /> : isLegacy ? <FileText className="w-4 h-4" /> : <Server className="w-4 h-4" />}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                        {isFinancial ? "Maliyyə & Kripto" : isLegacy ? "Rəqəmsal İrs" : "Biznes & IT"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-zinc-400 hover:text-rose-500 p-1 transition-colors"
                      title="Qeydi sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Secret Payload View */}
                  <div className="mt-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 p-3 border border-zinc-100 dark:border-zinc-800/80">
                    {isVaultUnlocked && clearText ? (
                      <div className="space-y-1">
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <Eye className="w-3 h-3" /> Açılmış Mətn:
                        </span>
                        <p className="text-xs font-mono text-zinc-900 dark:text-zinc-100 break-all select-all bg-emerald-500/5 p-2 rounded border border-emerald-500/20">
                          {clearText}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Lock className="w-3 h-3 text-zinc-500" /> Şifrələnmiş Məlumat (Ciphertext):
                          </span>
                          <span className="font-mono text-emerald-500">AES-256</span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate">
                          {item.encryptedPayload}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {item.hint && (
                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-400 flex items-center gap-1.5">
                    <span className="font-medium text-zinc-500">İpucu:</span>
                    <span>{item.hint}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 6. TAB: GUARDIANS & SHAMIR'S SECRET SHARING */}
      {activeTab === "guardians" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-emerald-500" />
                  <span>Shamir's Secret Sharing (2-of-3 Ehtiyat Açarları)</span>
                </h3>
                <p className="mt-1 text-xs text-zinc-500 max-w-2xl">
                  Əsas fövqəladə bərpa açarı 3 müstəqil hissəyə bölünüb. Fövqəladə halda seyfi açmaq üçün ən azı <strong>2 açar hissəsi (Threshold: 2)</strong> birləşməlidir. Bu, təkcə bir şəxsin sui-istifadə etməsinin qarşısını alır.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
                <span>Threshold: 2 of 3</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {guardians.map((g) => {
              const isCopied = copiedToken === g.emergencyAccessToken;
              return (
                <div
                  key={g.id}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
                        Açar Hissəsi #{g.shamirShareId || 1}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {g.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {g.name}
                    </h4>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {g.relationship === "SPOUSE" ? "Həyat Yoldaşı" : g.relationship === "BUSINESS_PARTNER" ? "Biznes Ortağı / CTO" : "Vəkil / Notarius"}
                    </span>
                    <p className="text-xs text-zinc-500 mt-1">
                      {g.email}
                    </p>

                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                      <span className="text-[11px] font-semibold text-zinc-400 block mb-1">
                        İcazə Verilmiş Bölmələr:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {g.allowedCategories.split(",").map((cat: string) => (
                          <span
                            key={cat}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                          >
                            {cat.trim() === "FINANCIAL" ? "Maliyyə" : cat.trim() === "LEGACY" ? "Rəqəmsal İrs" : "Biznes IT"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                    <button
                      onClick={() => handleCopyLink(g.emergencyAccessToken)}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Link Kopyalandı!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Fövqəladə Linki Kopyala</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`/emergency-access?token=${g.emergencyAccessToken}`}
                      target="_blank"
                      className="w-full py-1.5 text-center block text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Fövqəladə Girişi Portalda Yoxla &rarr;
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
