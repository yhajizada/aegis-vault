"use client";

import { useState } from "react";
import { generateApiKey } from "@/lib/utils";
import { Key, Copy, Check, Shield, Bell, Save } from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("nx_live_98a72f0c3d4b1a");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    if (confirm("Are you sure you want to regenerate this API key? Existing requests using the old key will fail.")) {
      setApiKey(generateApiKey());
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Organization Settings
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Manage workspace settings, developer API tokens, and team preferences.
        </p>
      </div>

      {/* General Settings Form */}
      <form onSubmit={handleSave} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-6 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">General Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Workspace Name
            </label>
            <input
              type="text"
              defaultValue="Acme Innovations"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Workspace Slug
            </label>
            <input
              type="text"
              defaultValue="acme-innovations"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Billing & Notification Email
          </label>
          <input
            type="email"
            defaultValue="billing@acme.com"
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{saved ? "Changes Saved!" : "Save Changes"}</span>
          </button>
        </div>
      </form>

      {/* Developer API Key Card */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Key className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Developer API Key</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Use this key to authenticate server-to-server requests.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <div className="flex-1 font-mono text-xs bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2.5 rounded-xl text-zinc-800 dark:text-zinc-200 select-all overflow-x-auto">
            {apiKey}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3.5 py-2.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={handleRegenerate}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-3.5 py-2.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            Regenerate
          </button>
        </div>
      </div>

      {/* Security & Audit Preferences */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Security & Two-Factor (2FA)</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Enforce enterprise-grade security controls.</p>
          </div>
        </div>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800 pt-2 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">Enforce 2-Factor Authentication</div>
              <div className="text-zinc-500 dark:text-zinc-400">Require all members to authenticate with OTP authenticator apps.</div>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded text-indigo-600" />
          </div>
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">Audit Logging</div>
              <div className="text-zinc-500 dark:text-zinc-400">Record all administrative changes to the immutable audit log table.</div>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded text-indigo-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
