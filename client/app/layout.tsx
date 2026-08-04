import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SKILLEZO.AI — Know Your Employability Score. Get Hired.",
  description: "AI career intelligence that benchmarks your profile against live hiring data, calculates your Employability Index, and provides a step-by-step Career GPS.",
  keywords: ["AI Career Intelligence", "Employability Score", "Resume Analyzer", "Career GPS", "Job Readiness"],
  openGraph: {
    title: "SKILLEZO.AI — AI Career Intelligence",
    description: "Know your score, close the gap, get hired.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0B1130] text-white selection:bg-[#00D9C0] selection:text-[#0B1130]">
        {children}
      </body>
    </html>
  );
}
