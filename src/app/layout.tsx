import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "VeritasAI - Fake News Detector",
  description: "Detect fake news articles using an ensemble of Machine Learning models.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased">{children}</body>
    </html>
  );
}
