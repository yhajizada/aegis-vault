import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Nexus — Modern Next.js Full-Stack SaaS Starter",
  description:
    "Production-grade, enterprise-ready full-stack SaaS boilerplate with Next.js 15, TypeScript, Tailwind CSS, Prisma, Docker, and GitHub Actions.",
  keywords: [
    "Next.js 15",
    "React 19",
    "SaaS Starter",
    "TypeScript",
    "Tailwind CSS",
    "Prisma",
    "Docker",
    "CI/CD",
  ],
  authors: [{ name: "Nexus Open Source Team" }],
  openGraph: {
    title: "Nexus — Modern Next.js Full-Stack SaaS Starter",
    description: "Launch your next SaaS in hours instead of months.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased selection:bg-indigo-500 selection:text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
