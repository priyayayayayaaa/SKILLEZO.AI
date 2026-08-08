<div align="center">

# 🚀 SKILLEZO.AI — Enterprise Client Platform

### Next-Generation AI Skill Verification & Student Career Intelligence System

[![Next.js](https://img.shields.io/badge/Next.js-16.3.0-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-FF4081?style=for-the-badge)](LICENSE)
[![Deployment](https://img.shields.io/badge/Vercel-Deployed-00D9C0?style=for-the-badge&logo=vercel&logoColor=white)](https://skillezo-ai.vercel.app)

**SKILLEZO AI** is an enterprise-grade AI-powered platform for candidate skill verification, automated ATS resume intelligence, employability scoring, personalized career roadmapping, and smart job matching. Built with Next.js App Router, React 19, TypeScript, Framer Motion, and Tailwind CSS v4.

[🌐 Live Demo](https://skillezo-ai.vercel.app) • [📖 Documentation](#-application-architecture) • [🚀 Getting Started](#-quick-start)

---

</div>

## 📌 Executive Summary

SKILLEZO AI bridges the gap between candidate skill mastery and recruiter visibility. The client application provides an interactive, glassmorphic student dashboard equipped with:

- **AI Career Intelligence (Modules 20–23):** Automated ATS scoring, skill gap diagnostics, candidate percentile benchmarking, and step-by-step career GPS paths.
- **Smart Job Center (Module 28):** Real-time skill match percentage engine, interactive job drawer, 1-click application modal, and application status tracker.
- **Skill Audit Verification Engine:** Categorized skill verifications, proof-of-work credentials, and telemetry audit inspection drawers.
- **Enterprise Design System:** Sleek dark/light glassmorphic UI components, fluid micro-interactions, responsive sidebars, and customizable theme controls.

---

## 🏗 System Architecture

```text
                               ┌────────────────────────────────────────┐
                               │           SKILLEZO AI CLIENT           │
                               │       Next.js 16 (App Router)          │
                               └──────────────────┬─────────────────────┘
                                                  │
                ┌─────────────────────────────────┴─────────────────────────────────┐
                ▼                                                                   ▼
    ┌───────────────────────┐                                           ┌───────────────────────┐
    │   AUTHENTICATION      │                                           │  STUDENT PORTAL HUB   │
    │   & SECURITY SUITE    │                                           │   & CAREER ENGINE     │
    └───────────┬───────────┘                                           └───────────┬───────────┘
                │                                                                   │
    ┌───────────┴───────────┐                       ┌───────────────────────────────┴───────────────────────────────┐
    │ - Login / Register    │                       │                                                               │
    │ - Password Recovery   │                       ▼                                                               ▼
    │ - Email Verification  │          ┌─────────────────────────┐                                     ┌─────────────────────────┐
    │ - Account Suspended   │          │ CAREER INTELLIGENCE     │                                     │ SMART JOB CENTER        │
    └───────────────────────┘          │ - Resume Intelligence   │                                     │ - Multi-Filter Search   │
                                       │ - Skill Gap Audit       │                                     │ - Match Score Calculator│
                                       │ - Employability Index   │                                     │ - Detail Drawer & Modal │
                                       │ - Career GPS Roadmap    │                                     │ - Application Tracker   │
                                       └─────────────────────────┘                                     └─────────────────────────┘
                                                    │                                                               │
                                                    └───────────────────────────────┬───────────────────────────────┘
                                                                                    │
                                                                                    ▼
                                                                     ┌────────────────────────────┐
                                                                     │ CENTRALIZED MOCK & DATA    │
                                                                     │ TYPESAFE ARCHITECTURE      │
                                                                     └────────────────────────────┘
```

---

## 🗺️ Route Directory & Feature Matrix

| Path | Module Name | Primary Function | Status |
|:---|:---|:---|:---:|
| `/` | Landing Page | Hero showcase, interactive AI score calculator modal, feature highlights | 🟢 Active |
| `/login` | Authentication | Email/password login, OAuth providers, remember me state | 🟢 Active |
| `/register` | Authentication | Account registration with password strength meter | 🟢 Active |
| `/forgot-password` | Authentication | Self-service password recovery workflow | 🟢 Active |
| `/reset-password` | Authentication | Secure password reset submission token handler | 🟢 Active |
| `/verify-email` | Authentication | OTP / Link verification flow with resend countdown | 🟢 Active |
| `/account-suspended` | Security | Standalone security suspension alert page | 🟢 Active |
| `/dashboard` | Dashboard Overview | Key stats, skill growth line charts, recent audits table | 🟢 Active |
| `/dashboard/student-portal` | Student Portal Hub | Glassmorphic hero gauge, AI coach widget, filterable feature grid | 🟢 Active |
| `/dashboard/job-center` | Smart Job Center | Multi-filter job search, AI match scores, application tracker | 🟢 Active |
| `/dashboard/profile` | Career Profile | Target roles, tech stack mastery, verified credential showcase | 🟢 Active |
| `/dashboard/resume-intelligence` | Resume Intelligence | ATS compatibility auditor, skill extraction, formatting checks | 🟢 Active |
| `/dashboard/skill-gap-analysis` | Skill Gap Analysis | Skill deficiency matrix, recommended courses, action items | 🟢 Active |
| `/dashboard/employability-index` | Employability Score | Recruiter readiness score, Top % percentile rank benchmark | 🟢 Active |
| `/dashboard/career-gps` | Career GPS | Step-by-step career path milestones & ETA timeline | 🟢 Active |
| `/dashboard/skill-verification` | Skill Audit Engine | Filterable skill audit directory & telemetry inspection drawer | 🟢 Active |
| `/dashboard/notifications` | Notifications | Unread count badge dropdown & category-filtered inbox | 🟢 Active |
| `/dashboard/settings` | Account Settings | Profile preferences, security controls, theme toggles, data export | 🟢 Active |

---

## 💻 Tech Stack & Dependencies

### Core Frameworks & Libraries
- **Framework:** [Next.js 16.3.0](https://nextjs.org/) (App Router with Turbopack)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
- **UI Engine:** [React 19.0.0](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Form Controls:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Toast Notifications:** [Sonner](https://sonner.emilkowal.si/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📁 Repository Structure

```text
client/
├── app/                        # Next.js App Router Page Handlers & Layouts
│   ├── (auth)/                 # 🔐 Shared Authentication Layout & Pages
│   │   ├── login/              # Sign-In View
│   │   ├── register/           # Registration View
│   │   ├── forgot-password/    # Password Recovery
│   │   ├── reset-password/     # Password Reset
│   │   └── verify-email/       # Email Verification
│   ├── dashboard/              # 📊 Dashboard Pages & Modules
│   │   ├── student-portal/     # 🎓 Student Portal Hub
│   │   ├── job-center/         # 💼 Smart Job Center (Module 28)
│   │   ├── profile/            # 👤 Student Career Profile
│   │   ├── resume-intelligence/# 📄 AI Resume Intelligence (Module 20)
│   │   ├── skill-gap-analysis/ # 🎯 Skill Gap Analysis (Module 21)
│   │   ├── employability-index/# 📊 Employability Score (Module 22)
│   │   ├── career-gps/         # 🧭 Career GPS Roadmap (Module 23)
│   │   ├── skill-verification/ # 🏆 Skill Audit Verification Engine
│   │   ├── notifications/      # Notifications Center
│   │   ├── settings/           # Account Settings
│   │   └── page.tsx            # Main Dashboard Overview
│   ├── account-suspended/      # 🚨 Suspension Guard Screen
│   ├── api/                    # Serverless API Handlers
│   ├── globals.css             # Utility Classes & CSS Tokens
│   ├── layout.tsx              # Root HTML Shell & Motion Providers
│   └── page.tsx                # Marketing Landing Page
│
├── components/                 # Atomic Modular UI Components
│   ├── dashboard/              # Dashboard Feature UI
│   │   ├── job-center/         # Job Center Filters, Match Score, Drawer, Modal
│   │   ├── student-portal/     # Student Portal Hero, AI Coach, Feature Grid
│   │   ├── notifications/      # Inbox & Notification Filters
│   │   ├── profile/            # Profile Header, Skill Badges, Progress Gauge
│   │   ├── settings/           # Preference Tabs & Form Sections
│   │   └── verification/       # Audit Directory & Telemetry Drawer
│   ├── layout/                 # Main Shell (Sidebar, Topbar, MobileNav)
│   ├── common/                 # PageHeader, StatusBadge, MetricCard, Skeleton
│   ├── site/                   # Landing Page (Hero, Features, Pricing, CTA)
│   └── ui/                     # Primitives (Button, Dialog, Input, Toaster)
│
├── doc/                        # Architecture Specs & Walkthrough Handbooks
├── mock/                       # Typesafe Mock Data Layers (Job Center, Career, Audits)
├── types/                      # TypeScript Domain Models & Interfaces
├── lib/                        # Utility Functions & Helper Classes (cn, formatters)
└── public/                     # Static Assets, Vectors & Favicons
```

---

## ⚡ Quick Start

### Prerequisites

Ensure your environment meets the following requirements:
- **Node.js:** `>= 18.17.0` (LTS recommended)
- **npm:** `>= 9.0.0` or **pnpm:** `>= 8.0.0`

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/priyayayayayaaa/Skillezo.AI.git
   cd Skillezo.AI/client
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the `client/` root directory:
   ```env
   NEXT_PUBLIC_APP_NAME="SKILLEZO AI"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_API_BASE_URL="http://localhost:5000/api"
   ```

4. **Launch Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Quality Control & Verification

To maintain production standards, execute the following commands prior to committing changes:

```bash
# 1. Strict TypeScript Compile Check (Zero Warnings)
npx tsc --noEmit

# 2. ESLint Static Code Analysis
npm run lint

# 3. Next.js Turbopack Production Build Verification
npm run build
```

---

## 🎨 Design Tokens & UI Architecture

| Token Class | Light Mode | Dark Mode (Deep Space) | Visual Role |
|:---|:---|:---|:---|
| **Background** | `#F8FAFC` | `#0B1130` | Main canvas surface |
| **Sidebar Surface** | `#FFFFFF` | `#080D26` | Fixed layout side panel |
| **Card Container** | `#FFFFFF` | `#111736` / `#131B3E` | Elevation surface cards |
| **Primary Accent** | `#3D5AFE` | `#3D5AFE` (Electric Blue) | Buttons, active borders, links |
| **Secondary Accent** | `#00897B` | `#00D9C0` (Vivid Cyan) | Skill badges, success gauges |
| **Borders** | `#E2E8F0` | `#1E293B` | Structural divider lines |

---

## 🔒 Security & Performance Guidelines

- **Zero Hydration Mismatch:** Strict client component mounting checks for SSR compatibility.
- **Route Guards:** Client-side layout route validation for dashboard modules.
- **Bundle Optimization:** Tree-shakeable Lucide icon imports and lightweight Framer Motion dynamic imports.
- **Accessibility (a11y):** Semantic HTML5 landmarks, unique interactive element IDs, and full keyboard navigation support.

---

## 📄 License & Intellectual Property

Copyright © 2026 **SKILLEZO AI**. All rights reserved.  
*Proprietary software — unauthorized copying, distribution, or modifications are strictly prohibited.*
