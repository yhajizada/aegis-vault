import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "AegisVault — Zero-Knowledge Digital Estate & In Case of Emergency (ICE) Vault",
  description:
    "Client-side encrypted emergency safe for bank accounts, crypto seed phrases, policies, and digital inheritance. Protected by AES-256-GCM, Shamir's Secret Sharing, and Dead Man's Switch.",
  keywords: [
    "Digital Estate",
    "In Case of Emergency",
    "ICE Vault",
    "Zero-Knowledge Encryption",
    "Shamir Secret Sharing",
    "Dead Mans Switch",
    "ePoint Azerbaijan",
    "Crypto Inheritance",
  ],
  authors: [{ name: "AegisVault Security Team" }],
  openGraph: {
    title: "AegisVault — Zero-Knowledge Digital Estate & Emergency Safeguard",
    description: "Protect your family and assets when unexpected emergencies happen.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased selection:bg-emerald-500 selection:text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
