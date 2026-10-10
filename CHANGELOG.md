# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-10

### Added
- Complete Next.js 15 App Router architecture with React 19 support.
- Tailwind CSS setup with seamless light/dark mode theme provider.
- Prisma ORM schemas (Users, Organizations, Subscriptions, AuditLog) with SQLite local & Postgres production support.
- Real-time Analytics Dashboard with responsive metric cards, monthly revenue graph, and dynamic event activity feed.
- Settings page with API token generator, clipboard copy, and security preferences.
- REST API health-check (`/api/v1/health`) and telemetry (`/api/v1/analytics`) routes.
- Vitest unit and React Testing Library component test suite.
- Multi-stage production `Dockerfile` and `docker-compose.yml` service configs.
- GitHub Actions automated CI/CD pipeline (`ci.yml`) and CodeQL security scanning (`codeql.yml`).
- Open source community templates: bug report, feature request, pull request, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY.
