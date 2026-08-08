# SKILLEZO AI — Client

> AI-Powered Skill Verification & Student Career Platform — Enterprise-grade Next.js frontend with premium glassmorphic architecture, complete authentication suite, interactive candidate dashboard, dedicated AI Student Portal, Phase 6 Career Intelligence & Smart Job Center, skill audit engine, user profile management, and account settings.

---

## ⚡ Tech Stack

| Layer | Technology |
|:---|:---|
| **Framework** | Next.js 15 / 16 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Components** | Custom Design System + Glassmorphic UI Primitives |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **Form Validation** | React Hook Form + Zod |
| **Toasts** | Sonner |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🏗️ Architecture & Folder Structure

The client codebase follows an organized **Route-Grouped and Component-Driven Architecture**.

```text
client/
├── app/                        # App Router Pages & Layouts
│   ├── (auth)/                 # 🟢 Auth Route Group (Shares Auth Layout)
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── dashboard/              # 🟢 Dashboard Modules
│   │   ├── student-portal/     # 🎓 Dedicated Student Portal Dashboard Hub
│   │   ├── job-center/         # 💼 Module 28: Smart Job Center
│   │   ├── profile/            # 👤 Student Career Profile
│   │   ├── resume-intelligence/# 📄 Module 20: AI Resume Intelligence
│   │   ├── skill-gap-analysis/ # 🎯 Module 21: Skill Gap Analysis
│   │   ├── employability-index/# 📊 Module 22: Employability Score
│   │   ├── career-gps/         # 🧭 Module 23: Career GPS Roadmap
│   │   ├── skill-verification/ # 🏆 Skill Verification Engine
│   │   ├── notifications/      # Notifications Hub
│   │   ├── settings/           # Dedicated Account Settings
│   │   └── page.tsx            # Main Dashboard Overview
│   ├── account-suspended/      # Standalone Security Route
│   ├── api/                    # API Handlers
│   ├── globals.css             # Design Tokens & Utilities
│   ├── layout.tsx              # Root HTML Shell & Providers
│   └── page.tsx                # Landing Page
│
├── components/                 # UI Components
│   ├── dashboard/              # Module Components
│   │   ├── job-center/         # 💼 Smart Job Center Sub-Components (Filters, MatchScore, Drawer, ApplyModal)
│   │   ├── student-portal/     # 🎓 Student Portal UI (Header, AI Coach, Grid)
│   │   ├── notifications/      # Notifications UI
│   │   ├── profile/            # Profile UI
│   │   ├── settings/           # Settings UI
│   │   └── verification/       # Verification Engine UI
│   ├── layout/                 # Shell Layout (Sidebar, Topbar, MobileSidebar)
│   ├── common/                 # Reusable UI (PageHeader, StatusBadge, FilterDropdown)
│   ├── site/                   # Landing Page Sections (Hero, Features, Pricing, CTA)
│   └── ui/                     # Primitives (Button, Dialog, Input, Toaster)
│
├── doc/                        # Project Specifications & Walkthroughs
├── mock/                       # Data Layer Mocks (Career Intelligence, Job Center, Users, Verification)
├── types/                      # TypeScript Interfaces (Career Intelligence, Job Center, User, Verification)
├── lib/                        # Helpers & Utilities (cn, utils)
└── public/                     # Static Assets & Icons
```

---

## 📐 Recent Implementations (Phase 6 & Job Portal Suite)

### 1. 💼 Module 28: Smart Job Center (`/dashboard/job-center`)
- **Advanced Multi-Filter Search Bar:** Search by title, company, or skills, with location, job type (Full-Time, Contract, Remote), salary range, and experience level filters.
- **AI Match Score Engine:** Real-time job compatibility calculation analyzing candidate skills against job requirements (`90%+ Exceptional`, `80-89% Strong`, `70-79% Moderate`, `<70% Low`).
- **Interactive Job Details Drawer:** Deep dive into responsibilities, required skills, match score breakdown, and company perks.
- **One-Click Application Modal:** Select stored resumes, attach custom cover letters, and submit applications directly.
- **Saved Jobs & Application Tracker:** Dedicated tabs for tracking saved positions and application status progression (`Submitted`, `Under Review`, `Interview Scheduled`, `Offer Received`).

### 2. 🧠 Career Intelligence Suite (Modules 20–23)
- **Module 20: AI Resume Intelligence (`/dashboard/resume-intelligence`):** ATS score analyzer, extracted skill breakdown, formatting audit, and actionable improvement tips.
- **Module 21: Skill Gap Analysis (`/dashboard/skill-gap-analysis`):** Critical skill deficiency detection, course recommendations, and priority action items.
- **Module 22: Employability Score / Index (`/dashboard/employability-index`):** Candidate percentile benchmark (`Top 15%`), readiness metrics, and verified strength highlights.
- **Module 23: Career GPS Roadmap (`/dashboard/career-gps`):** Step-by-step career path milestones with progress tracking and estimated timelines.

### 3. 🎓 Dedicated Student Portal Dashboard (`/dashboard/student-portal`)
- **Glassmorphic Hero Banner ([StudentPortalHeader.tsx](file:///c:/Users/PRIYA/vs%20codes/Skillezo.AI/client/components/dashboard/student-portal/StudentPortalHeader.tsx)):** Personalized greeting, target role indicator, Employability Index gauge, top rank badge, and quick AI actions.
- **AI Career Coach Assistant ([AICareerCoachWidget.tsx](file:///c:/Users/PRIYA/vs%20codes/Skillezo.AI/client/components/dashboard/student-portal/AICareerCoachWidget.tsx)):** Live status badge, click-to-ask prompt chips, and quick mentor query launcher.
- **Categorized Feature Grid ([StudentPortalGrid.tsx](file:///c:/Users/PRIYA/vs%20codes/Skillezo.AI/client/components/dashboard/student-portal/StudentPortalGrid.tsx)):** Unifies all student career tools in a filterable grid with zero 404 fallback routing.

### 4. 🗂️ Unified Sidebar Architecture (`client/components/layout/Sidebar.tsx`)
- Clean, non-duplicated navigation structure with zero group nesting clutter or module badges.
- Single top-level standalone entries for:
  - 📊 **Dashboard Overview** (`/dashboard`)
  - 🎓 **Student Portal Hub** (`/dashboard/student-portal`) [CORE]
  - 💼 **Smart Job Center** (`/dashboard/job-center`) [JOBS]
  - 👤 **Career Profile** (`/dashboard/profile`)
  - 📄 **AI Resume Intelligence** (`/dashboard/resume-intelligence`)
  - 🎯 **Skill Gap Analysis** (`/dashboard/skill-gap-analysis`)
  - 📊 **Employability Score** (`/dashboard/employability-index`)
  - 🧭 **Career GPS Roadmap** (`/dashboard/career-gps`)
  - 🏆 **Skill Verification** (`/dashboard/skill-verification`) [VERIFIED]

---

## 🎨 Design System & Theme

| Token | Value |
|:---|:---|
| **Background** | `#0B1130` (Deep Space Navy) / Light Mode `#F8FAFC` |
| **Sidebar Surface** | `#080D26` / Glassmorphism Backdrop Blur |
| **Card Surface** | `#111736` / `#131B3E` |
| **Primary Accent** | `#3D5AFE` (Electric Blue) |
| **Secondary Accent** | `#00D9C0` (Vivid Cyan) |
| **Borders** | `border-slate-800` / `border-slate-200` |
| **Typography** | Inter / System Sans-Serif |

---

## 🧪 Quality & Verification Commands

```bash
# Check TypeScript types
npx tsc --noEmit

# Lint codebase
npm run lint

# Verify production build
npm run build
```

---

## 📜 License

Private — **SKILLEZO AI**
