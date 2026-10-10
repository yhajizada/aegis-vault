<div align="center">

# ⚡ Nexus — Enterprise Full-Stack SaaS Starter Kit

**Production-grade, highly modular boilerplate engineered for modern software founders, indie builders, and engineering teams.**

[![CI Quality Pipeline](https://img.shields.io/badge/CI-Passing-22c55e?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.2-2d3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Live Demo](#) · [Features](#-key-features) · [Quick Start](#-quick-start) · [Architecture](#-architecture) · [Contributing](CONTRIBUTING.md)

</div>

---

## 🚀 Overview

**Nexus** is an opinionated, production-ready Full-Stack SaaS boilerplate designed to eliminate boilerplate fatigue. Built around Next.js 15 App Router, React 19, and Tailwind CSS, it packs authentic database schemas, developer API key workflows, interactive analytics telemetry, automated GitHub Actions CI/CD, and multi-stage container deployment out of the box.

---

## 🏗️ Architecture

```mermaid
flowchart TD
    Client["User Browser / Client"] -->|HTTPS / Next.js SSR| NextApp["Next.js 15 App Router"]
    
    subgraph Frontend["Frontend Layer"]
        NextApp --> Landing["Landing (Hero, Features, Pricing)"]
        NextApp --> Dashboard["Interactive Telemetry Dashboard"]
        NextApp --> Settings["Settings & API Key Vault"]
        NextApp --> Theme["Hydration-Safe Theme Provider"]
    end

    subgraph Backend["API & Server Layer"]
        NextApp --> HealthAPI["/api/v1/health"]
        NextApp --> AnalyticsAPI["/api/v1/analytics"]
        NextApp --> ServerActions["Server Actions & Utilities"]
    end

    subgraph Data["Database & DevOps"]
        ServerActions --> Prisma["Prisma ORM Client"]
        Prisma --> SQLite["SQLite (Local Zero-Config)"]
        Prisma -.-> Postgres["PostgreSQL (Docker / Production)"]
        NextApp --> DockerMulti["Multi-Stage Docker Container"]
        NextApp --> GHA["GitHub Actions CI/CD"]
    end
```

---

## ✨ Key Features

- ⚡ **Next.js 15 & React 19**: Modern App Router architecture with server components and streaming support.
- 🎨 **Tailwind CSS & Dark Mode**: Flawless, flicker-free dark and light mode toggle with custom design tokens.
- 📊 **Interactive Analytics Dashboard**: Live metrics for MRR, DAU/MAU, user activity feed, and monthly revenue visualizer.
- 🗄️ **Prisma ORM (Zero-Config)**: Type-safe SQLite default for zero-friction local development, switchable to PostgreSQL with one variable.
- 🔑 **API Key & Security Vault**: Developer API key generator, clipboard utilities, and 2FA policy toggles.
- 🧪 **Vitest & React Testing Library**: Pre-configured unit and component test suites with instant execution.
- 🐳 **Docker & Docker Compose**: Optimized multi-stage production Dockerfile and container orchestration.
- 🤖 **GitHub Actions CI/CD**: Automatic linting, typechecking, Vitest validation, and production build checks on every push and PR.
- 📜 **Full Community Governance**: Issue templates, PR templates, Code of Conduct, Security policy, and MIT license.

---

## 🗂️ Project Structure

```text
nexus-saas-template/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml               # Automated Lint, Test & Build pipeline
│   │   └── codeql.yml           # CodeQL Security static analysis
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml       # Interactive bug report issue form
│   │   └── feature_request.yml  # Feature proposal template
│   └── PULL_REQUEST_TEMPLATE.md # Standard PR review checklist
├── app/
│   ├── api/v1/
│   │   ├── analytics/route.ts   # Platform analytics telemetry endpoint
│   │   └── health/route.ts      # Automated health check route
│   ├── dashboard/
│   │   ├── settings/page.tsx    # Organization settings & API keys
│   │   ├── layout.tsx           # Dashboard shell with sidebar
│   │   └── page.tsx             # Interactive metrics & activity overview
│   ├── globals.css              # Global tokens & theme utilities
│   ├── layout.tsx               # Root HTML wrapper with theme provider
│   └── page.tsx                 # Modern conversion-focused landing page
├── components/
│   ├── dashboard-sidebar.tsx    # Responsive side navigation
│   ├── features.tsx             # Capabilities breakdown grid
│   ├── footer.tsx               # Footer with live status indicator
│   ├── hero.tsx                 # High-impact hero section
│   ├── metric-card.tsx          # Stat card with delta trend badge
│   ├── navbar.tsx               # Navigation bar with dark mode switch
│   ├── pricing.tsx              # Annual/monthly tiered pricing table
│   └── theme-provider.tsx       # Dark & light theme context
├── lib/
│   ├── constants.ts             # Pricing plans, metrics & demo constants
│   ├── db.ts                    # Prisma Client singleton
│   └── utils.ts                 # Formatting, class merging, and key generation
├── prisma/
│   ├── schema.prisma            # Models: User, Organization, Subscription, AuditLog
│   └── seed.js                  # Database demo seeder
├── tests/
│   ├── setup.ts                 # Vitest DOM extensions setup
│   ├── utils.test.ts            # Unit tests for core utilities
│   └── metric-card.test.tsx     # React component test suite
├── Dockerfile                   # Multi-stage production container
├── docker-compose.yml           # App + PostgreSQL container setup
├── package.json                 # Project dependencies & npm scripts
├── tsconfig.json                # TypeScript strict configuration
└── vitest.config.ts             # Vitest test runner configuration
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+ (tested on Node 20 & 24)
- **npm**: v9+ or v11+

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-username/nexus-saas-template.git
cd nexus-saas-template

# Install dependencies
npm install
```

### 3. Environment Configuration

```bash
# Copy example environment configuration
cp .env.example .env.local
```

### 4. Initialize Database

By default, Nexus uses SQLite for instant local development with zero external dependencies required:

```bash
# Synchronize Prisma schema with local database
npm run db:push

# (Optional) Populate with realistic demo data
npm run db:seed
```

### 5. Launch Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 Testing & Code Quality

Run tests and static validation tools with:

```bash
# Run unit & component tests via Vitest
npm run test

# Run Vitest in interactive watch mode
npm run test:watch

# Run ESLint validation
npm run lint

# Build production bundle
npm run build
```

---

## 🐳 Running with Docker

Deploy locally with PostgreSQL using Docker Compose:

```bash
# Build and run containers
docker-compose up --build

# Run detached in background
docker-compose up -d
```

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please review our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
  <sub>Built with ❤️ for founders, developers, and open source creators.</sub>
</div>
