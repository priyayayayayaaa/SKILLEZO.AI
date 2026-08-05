"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Cpu,
  Award,
  BarChart3,
  Settings,
  Bell,
  Search,
  LogOut,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import BrandLogo from "@/components/auth/BrandLogo";
import GlassCard from "@/components/common/GlassCard";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
    { label: "Skill Verification", icon: Cpu, href: "/dashboard", active: false },
    { label: "Proctored Audits", icon: ShieldCheck, href: "/dashboard", active: false },
    { label: "Analytics & Benchmarks", icon: BarChart3, href: "/dashboard", active: false },
    { label: "Credentials & Badges", icon: Award, href: "/dashboard", active: false },
    { label: "Settings", icon: Settings, href: "/dashboard", active: false },
  ];

  const stats = [
    {
      title: "Verified Skill Index",
      value: "92 / 100",
      change: "+4.2% this month",
      icon: Zap,
      accent: "text-[#00D9C0]",
    },
    {
      title: "Active Certifications",
      value: "18 Badges",
      change: "Enterprise level",
      icon: Award,
      accent: "text-blue-400",
    },
    {
      title: "Completed Audits",
      value: "24 Tests",
      change: "100% Integrity score",
      icon: ShieldCheck,
      accent: "text-emerald-400",
    },
    {
      title: "Global Peer Rank",
      value: "Top 2%",
      change: "Senior AI Architect",
      icon: TrendingUp,
      accent: "text-amber-400",
    },
  ];

  const recentVerifications = [
    { skill: "Next.js 15 & React 19 Architecture", score: "98/100", date: "Today, 02:14 PM", status: "Verified" },
    { skill: "TypeScript Strict Type Telemetry", score: "94/100", date: "Yesterday", status: "Verified" },
    { skill: "Distributed Systems & Edge Caching", score: "90/100", date: "Aug 02, 2026", status: "Verified" },
  ];

  return (
    <div className="min-h-screen bg-[#0B1130] text-white flex overflow-x-hidden selection:bg-[#00D9C0] selection:text-[#0B1130]">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[#3D5AFE]/15 blur-[180px]" />
      <div className="pointer-events-none fixed -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-[#00D9C0]/15 blur-[180px]" />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[#0E153B]/90 border-r border-white/10 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col justify-between p-6",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <BrandLogo size="md" href="/" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#8A90A6] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200",
                    item.active
                      ? "bg-[#3D5AFE] text-white shadow-[0_0_20px_rgba(61,90,254,0.4)]"
                      : "text-[#8A90A6] hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Badge at bottom */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.03]">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-[#3D5AFE] to-[#00D9C0] font-bold text-white text-sm shadow-[0_0_10px_rgba(0,217,192,0.4)]">
              AM
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-white truncate">Alex Morgan</span>
              <span className="text-[10px] text-[#8A90A6] truncate">alex.morgan@skillezo.ai</span>
            </div>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-2 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors px-2"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Topbar Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#0B1130]/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Search Input */}
            <div className="relative hidden sm:flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-[#8A90A6]" />
              <input
                type="text"
                placeholder="Search skills, benchmark reports, credentials..."
                className="w-72 sm:w-80 rounded-xl bg-[#141b4d]/80 border border-white/10 py-2.5 pl-10 pr-10 text-xs text-white placeholder-[#8A90A6]/60 focus:outline-none focus:border-[#3D5AFE]"
              />
              <span className="absolute right-3 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-[#8A90A6]">
                ⌘K
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <button className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-[#8A90A6] hover:text-white transition-colors cursor-pointer">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#00D9C0] ring-2 ring-[#0B1130]" />
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-[#3D5AFE] to-[#00D9C0] text-sm font-bold text-white shadow-[0_0_10px_rgba(0,217,192,0.4)]">
                AM
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body Container */}
        <main className="flex-1 space-y-8 p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {/* Welcome Banner Card */}
          <GlassCard glow intensity="strong" className="p-8 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#3D5AFE]/20 px-3 py-1 text-xs font-semibold text-[#00D9C0] border border-[#3D5AFE]/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI Talent Verification Portal</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Welcome back, Alex! 👋
                </h1>
                <p className="text-sm text-[#8A90A6] max-w-xl leading-relaxed">
                  Your AI skill verification portfolio is currently up-to-date. You have completed 24 proctored assessments across Next.js, Cloud Architecture, and TypeScript.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="#assessment"
                  className="rounded-xl bg-[#3D5AFE] px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_0_20px_rgba(61,90,254,0.4)] hover:bg-[#3D5AFE]/90 transition-all"
                >
                  Start New Audit
                </Link>
              </div>
            </div>
          </GlassCard>

          {/* Metric Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <GlassCard key={idx} className="p-5 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#8A90A6]">{stat.title}</span>
                    <div className={cn("grid h-8 w-8 place-items-center rounded-lg bg-white/5", stat.accent)}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">{stat.value}</h3>
                    <p className="text-[11px] text-[#8A90A6] mt-1">{stat.change}</p>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Recent Skill Verifications Table Placeholder */}
          <GlassCard className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-white">Recent Skill Verifications</h3>
                <p className="text-xs text-[#8A90A6]">Latest automated telemetry scores and badge credentials</p>
              </div>
              <span className="text-xs font-medium text-[#00D9C0] cursor-pointer hover:underline">
                View All Reports →
              </span>
            </div>

            <div className="space-y-3">
              {recentVerifications.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#3D5AFE]/15 text-[#00D9C0]">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{row.skill}</h4>
                      <p className="text-xs text-[#8A90A6]">{row.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm font-bold text-[#00D9C0] bg-[#00D9C0]/10 px-2.5 py-1 rounded-lg border border-[#00D9C0]/20">
                      {row.score}
                    </span>
                    <span className="hidden sm:inline-block text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </main>
      </div>
    </div>
  );
}
