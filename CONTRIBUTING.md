# Contributing to Nexus SaaS Starter

First off, thank you for considering contributing to Nexus SaaS! It is people like you that make open source such an incredible tool for developers worldwide.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs
Before creating bug reports, please check the existing issues to ensure it hasn't already been reported. When creating an issue, use our Bug Report template and provide:
- Clear steps to reproduce
- What you expected to happen vs what actually occurred
- Node.js version, OS, and browser

### Suggesting Enhancements
Feature requests are always welcomed! Open an issue using the Feature Request template outlining your use case and desired API or UI implementation.

### Pull Requests
1. Fork the repo and create your branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make your changes and write unit/component tests where applicable.
4. Ensure all checks pass:
   ```bash
   npm run lint
   npm run test
   npm run build
   ```
5. Follow Conventional Commits:
   - `feat: add stripe checkout webhook support`
   - `fix: resolve hydration warning on theme toggle`
   - `docs: update deployment guidelines for railway`
6. Push to your fork and submit a Pull Request!

## Development Guidelines

- **TypeScript**: Strict typing is enabled. Avoid `any`.
- **Styling**: Use Tailwind CSS utilities. Follow consistent color tokens.
- **Components**: Keep components focused, modular, and accessible.
- **Server vs Client**: Use Server Components wherever client interactivity isn't strictly needed. Add `"use client"` at the top of client components.

Thank you for contributing! 🚀
