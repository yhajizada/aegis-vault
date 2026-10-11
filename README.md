# 🛡️ AegisVault — Zero-Knowledge Digital Estate & "In Case of Emergency" (ICE) Vault

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.2-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Web Crypto API](https://img.shields.io/badge/Security-Zero--Knowledge-emerald?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
[![Payment Gateway](https://img.shields.io/badge/Payments-ePoint.az-blue?style=flat-square)](https://epoint.az)
[![Tests Passing](https://img.shields.io/badge/Vitest-Passing-brightgreen?style=flat-square&logo=vitest)](https://vitest.dev/)

> **AegisVault** is a privacy-first, zero-knowledge digital estate safeguard designed to prevent catastrophic loss of bank accounts, crypto seed phrases, vital documents, business credentials, and digital legacy when sudden emergencies or death occur.

---

## 💡 The Problem & The Solution

* **The Problem:** When individuals pass away or face medical emergencies, their family members are left in complete chaos—unable to locate private bank accounts, crypto cold storage keys (BIP-39 seeds), cloud drives, or business server credentials. Billions in assets are permanently lost every year.
* **The Solution:** A zero-knowledge encrypted vault governed by a **Tiered Dead Man's Switch** and **Shamir's Secret Sharing (2-of-3 threshold)**. The user confirms "I am alive" periodically. If no response is received, pre-designated beneficiaries receive only their authorized modules without anyone having unilateral access.

---

## 🔒 Security & Trust Architecture

```
                                  +---------------------------------------+
                                  |     User Browser / Client Device     |
                                  +---------------------------------------+
                                                     |
                    [ Master Password + Salt ] ----> | PBKDF2 (100,000 Iterations)
                                                     v
                                          [ Derived AES-256 Key ]
                                                     |
                     [ Sensitive Cleartext ] ------> | AES-GCM (12-byte random IV)
                                                     v
                                           [ Encrypted Ciphertext ]
                                                     |
                                   (Only Ciphertext sent over the wire)
                                                     v
                                  +---------------------------------------+
                                  |    Zero-Knowledge Server & Database   |
                                  |      (Cannot decrypt user records)    |
                                  +---------------------------------------+
```

### 1. Client-Side Zero-Knowledge Encryption (`lib/vault-crypto.ts`)
* **PBKDF2 Key Derivation:** 100,000 SHA-256 iterations with cryptographic 16-byte random salt.
* **AES-256-GCM:** 256-bit symmetric encryption with authenticated data tags and unique 12-byte IVs.
* **Zero-Knowledge Guarantee:** The master password and unencrypted plaintext **never leave the user's browser**. The server database only stores opaque ciphertext blobs.

### 2. Shamir's Secret Sharing (2-of-3 Threshold)
* Implemented over Galois Field $\text{GF}(2^8)$ with generator polynomial $0\times 11\text{d}$.
* The emergency recovery key is split into 3 mathematical shares:
  * **Share #1:** Primary Beneficiary (e.g. Spouse)
  * **Share #2:** Secondary Guardian / CTO (e.g. Business Partner)
  * **Share #3:** Emergency Escrow / Legal Trustee
* Any **2 of the 3 shares** can mathematically reconstruct the key via Lagrange interpolation; 1 share alone reveals zero information (information-theoretic security).

---

## ⏱️ Tiered "Dead Man's Switch" Protocol

1. **Active State (Green):** User clicks *"I AM ALIVE"* within their interval (e.g., 60 days). The timer safely extends.
2. **Tier 1 — Grace Period (Days 1–7 overdue):** Automated SMS and email ping notifications are sent to the user.
3. **Tier 2 — Urgent Escalation (Days 8–14 overdue):** High-priority push notifications and emergency automated calls.
4. **Tier 3 — Guardian Verification (Days 15–21 overdue):** Designated primary contact receives a verification request: *"User has not responded. Please confirm emergency status."*
5. **Triggered Release:** Once the grace countdown expires, beneficiaries gain time-locked zero-knowledge decryption access.

---

## 🗂️ Granular Modular Vaults

| Module | Use Case & Secrets Stored | Typical Designated Guardian |
| :--- | :--- | :--- |
| **Financial & Crypto** | Bank accounts, brokerages, Ledger/Trezor BIP-39 seed phrases, life insurance | Spouse / Heirs |
| **Digital Legacy** | Farewell letters, personal memorial video links, cloud photo albums | Children / Family |
| **Business & IT** | Cloudflare DNS, AWS root credentials, GitHub recovery codes, domain registrars | Co-founder / CTO |

---

## 💳 ePoint (epoint.az) Payment Gateway Integration

AegisVault includes built-in integration with **ePoint.az** to process annual subscriptions via **Visa, Mastercard, Apple Pay, and Google Pay**:

* **Currencies Supported:** Both **USD ($)** and **AZN (₼)** with real-time toggle.
* **Security:** Base64 payload encoding with SHA1 private key signature generation.
* **Subscription Tiers:**
  * **Solo Guardian:** $39 / year (₼69 AZN)
  * **Family Estate Pro:** $69 / year (₼117 AZN) — *Recommended*
  * **Crypto & Wealth Elite:** $129 / year (₼219 AZN)
* **Sandbox Simulation:** Runs in automatic test sandbox mode when live credentials are not set, providing instant checkout testing.

---

## 🚀 Quickstart & Installation

### Prerequisites
* **Node.js:** v18.x or v20+ (tested on Node 24)
* **npm:** v9+

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/aegis-vault.git
cd aegis-vault
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-secret-key-min-32-chars-long"
NEXT_PUBLIC_APP_NAME="AegisVault"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ePoint.az Merchant Credentials (epoint.az/merchant)
EPOINT_PUBLIC_KEY="your_epoint_public_key"
EPOINT_PRIVATE_KEY="your_epoint_private_key"
```

### 4. Initialize Database & Seed Demo Data
```bash
npx prisma db push
npm run db:seed
```

### 5. Run Cryptographic Tests
```bash
npm run test
```
*Runs Vitest suite verifying Galois Field $\text{GF}(256)$ Lagrange interpolation and AES-256-GCM.*

### 6. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📁 Project Structure

```
ice-vault/
├── app/
│   ├── api/v1/
│   │   ├── emergency/[token]/   # Beneficiary token verification API
│   │   ├── guardians/           # Beneficiaries & Shamir shares API
│   │   ├── payment/epoint/      # ePoint create checkout & callback webhooks
│   │   ├── switch/              # Heartbeat & escalation simulation API
│   │   └── vault/               # Zero-Knowledge encrypted CRUD API
│   ├── dashboard/
│   │   ├── billing/             # ePoint subscription & invoices page
│   │   ├── settings/            # Security & 2FA preferences
│   │   └── page.tsx             # Main Command Center & Dead Man's Switch
│   ├── emergency-access/        # Beneficiary Emergency Portal
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # High-converting cybersecurity landing page
├── components/
│   ├── dashboard-sidebar.tsx
│   ├── features.tsx             # 3 Architecture pillars showcase
│   ├── footer.tsx
│   ├── hero.tsx                 # Live browser-based Zero-Knowledge simulator
│   ├── navbar.tsx
│   ├── pricing.tsx              # ePoint subscription pricing cards
│   └── theme-provider.tsx
├── lib/
│   ├── constants.ts             # Pricing tiers, categories
│   ├── db.ts                    # Prisma Client instance
│   ├── epoint.ts                # ePoint.az API & signature generator
│   └── vault-crypto.ts          # Web Crypto AES-GCM + Shamir's SSS
├── prisma/
│   ├── schema.prisma            # VaultItems, Guardians, Subscriptions
│   └── seed.js                  # Seed script with realistic encrypted records
└── tests/
    └── vault-crypto.test.ts     # Cryptography unit tests
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
