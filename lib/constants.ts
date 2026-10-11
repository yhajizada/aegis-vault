export interface PlanTier {
  id: string;
  name: string;
  priceAnnual: number;
  priceMonthlyEquivalent: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export const PRICING_PLANS: PlanTier[] = [
  {
    id: "solo",
    name: "Solo Guardian",
    priceAnnual: 39,
    priceMonthlyEquivalent: 3.25,
    description: "Essential zero-knowledge protection for individuals & single beneficiaries.",
    features: [
      "1 Master Vault with AES-256-GCM encryption",
      "Up to 2 Designated Guardians",
      "Configurable Heartbeat (60 or 90 days)",
      "Standard Email ping notifications",
      "Financial or Digital Legacy Vault (1 Category)",
      "Client-side Zero-Knowledge Proof guarantee",
    ],
  },
  {
    id: "family_pro",
    name: "Family Estate Pro",
    priceAnnual: 69,
    priceMonthlyEquivalent: 5.75,
    description: "Complete family peace-of-mind with Shamir's Secret Sharing & multi-tier triggers.",
    popular: true,
    features: [
      "All 3 Vault Modules (Financial, Legacy & Business/IT)",
      "Up to 5 Family Guardians & Trustees",
      "Shamir's Secret Sharing (2-of-3 threshold keys)",
      "Tiered Dead Man's Switch (SMS + Voice + Email)",
      "Granular Beneficiary Permissions (Who sees what)",
      "Printable Offline Paper Keycard Recovery Kits",
      "Priority 24/7 Guardian Onboarding Assistance",
    ],
  },
  {
    id: "crypto_elite",
    name: "Crypto & Wealth Elite",
    priceAnnual: 129,
    priceMonthlyEquivalent: 10.75,
    description: "Institutional-grade digital estate protection for crypto portfolios & high-net-worth founders.",
    features: [
      "Everything in Family Estate Pro",
      "Unlimited Guardians & Legal Representatives",
      "Threshold Cryptography (3-of-5 Shamir split)",
      "Hardware Key & BIP-39 Cold Storage Guides",
      "Notary / Legal Escrow integration support",
      "Custom Multi-Signature trigger delays",
      "Concierge Onboarding & Zero-Knowledge Audit Certificate",
    ],
  },
];

export const VAULT_CATEGORIES = [
  {
    id: "FINANCIAL",
    title: "Financial & Crypto Vault",
    description: "Bank accounts, crypto seed phrases, brokerages, and life insurance policies.",
    icon: "ShieldAlert",
    color: "emerald",
  },
  {
    id: "LEGACY",
    title: "Digital Legacy & Memories",
    description: "Farewell video notes, private letters to spouse & children, cloud photo archives.",
    icon: "HeartHandshake",
    color: "pink",
  },
  {
    id: "BUSINESS_IT",
    title: "Business & IT Infrastructure",
    description: "Domain registrars, AWS/Cloud root credentials, 2FA backup codes, server SSH keys.",
    icon: "Server",
    color: "cyan",
  },
];
