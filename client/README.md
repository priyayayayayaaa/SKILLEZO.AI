# SKILLEZO AI — Client

> AI-Powered Skill Verification & Student Career Platform — Enterprise-grade Next.js frontend with premium glassmorphic architecture, complete authentication suite, interactive candidate dashboard, dedicated AI Student Portal, skill audit engine, user profile management, and account settings.

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
│   │   │   └── page.tsx
│   │   ├── notifications/      # Notifications Hub
│   │   ├── profile/            # User Profile & Portfolio
│   │   ├── settings/           # Dedicated Account Settings
│   │   ├── skill-verification/ # Skill Verification Engine
│   │   └── page.tsx            # Main Dashboard Overview
│   ├── account-suspended/      # Standalone Security Route
│   ├── api/                    # API Handlers
│   ├── globals.css             # Design Tokens & Utilities
│   ├── layout.tsx              # Root HTML Shell & Providers
│   └── page.tsx                # Landing Page
│
├── components/                 # UI Components
│   ├── auth/                   # Auth Layout, Brand Panel & Form Cards
│   ├── dashboard/              # Module Components
│   │   ├── student-portal/     # 🎓 Student Portal UI (Header, AI Coach, Grid)
│   │   │   ├── StudentPortalHeader.tsx
│   │   │   ├── AICareerCoachWidget.tsx
│   │   │   └── StudentPortalGrid.tsx
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
├── mock/                       # Data Layer Mocks (Users, Verification, Dashboard, Notifications)
├── types/                      # TypeScript Interfaces (User, Verification, Dashboard, Notification)
├── lib/                        # Helpers & Utilities (cn, utils)
└── public/                     # Static Assets & Icons
```

---

## 📐 Application Modules & Features

### 1. 🎓 Dedicated Student Portal Dashboard (`/dashboard/student-portal`)
- **Glassmorphic Hero Banner ([StudentPortalHeader.tsx](file:///c:/Users/PRIYA/vs%20codes/Skillezo.AI/client/components/dashboard/student-portal/StudentPortalHeader.tsx)):** Personalized greeting, target career role indicator (`Full-Stack Engineer`), Employability Index gauge (`78/100`), top rank badge, and quick AI actions.
- **AI Career Coach Assistant ([AICareerCoachWidget.tsx](file:///c:/Users/PRIYA/vs%20codes/Skillezo.AI/client/components/dashboard/student-portal/AICareerCoachWidget.tsx)):** Live status pulse badge, click-to-ask prompt chips, and a quick query launcher.
- **Categorized Tabbed Feature Grid ([StudentPortalGrid.tsx](file:///c:/Users/PRIYA/vs%20codes/Skillezo.AI/client/components/dashboard/student-portal/StudentPortalGrid.tsx)):** Filterable tabs (**All Modules**, **Core AI & Analytics**, **Skills & Learning**, **Jobs & Mentoring**) unifying 12 student portal tools:
  1. **Career Profile**: Target roles, tech stack, and background preferences.
  2. **Resume Intelligence**: AI resume audit, skill extraction, and ATS scoring.
  3. **Skill Gap Analysis**: High-impact skill missing competencies identification.
  4. **Employability Index**: Job-readiness metric evaluating skills & projects.
  5. **Career GPS**: Step-by-step personalized career path roadmap.
  6. **Learning Hub**: AI-curated learning paths tailored to skill gaps.
  7. **Projects & Portfolio**: Hands-on projects with AI code mentor guidance.
  8. **Skill Assessments**: Technical evaluations & verified certificates.
  9. **AI Career Coach**: 24/7 AI mentor for mock interviews and advice.
  10. **Job Center**: Smart job matching based on skill match scores.
  11. **Progress & Analytics**: Growth charts tracking learning curves over time.
  12. **Wallet & Tokens**: AI token credit balance and subscription tier management.

### 2. 🏠 Landing Page (`/`)
- Interactive marketing homepage featuring AI score modal (`ScoreDialog`), hero showcase, feature grid, pricing options, success stories, and CTA section.

### 3. 🔐 Authentication Suite (`app/(auth)`)
- **Login (`/login`):** Email & Password login with Zod validation, OAuth social options, remember-me check.
- **Register (`/register`):** User registration with password complexity scoring and terms acceptance.
- **Forgot Password (`/forgot-password`):** Password reset request workflow with toast confirmation.
- **Reset Password (`/reset-password`):** Secure new password submission.
- **Verify Email (`/verify-email`):** Resend countdown timer and verification flow.
- **Account Suspended (`/account-suspended`):** Standalone security alert screen with support actions.

### 4. 📊 Dashboard Overview (`/dashboard`)
- **Metric Stat Cards:** Verified Skills, Skill Health Score (94%), Pending Audits, Global Benchmark Rank.
- **Skill Growth Chart:** Interactive Recharts line graph tracking score progression over time.
- **Recent Verification Table:** Tabular summary with status badges (`Verified`, `Pending`, `In Review`, `Failed`).

### 5. 🏆 Skill Verification Engine (`/dashboard/skill-verification`)
- Filterable candidate skill audit directory by **Status** and **Category**.
- Interactive detail drawer inspecting audit breakdown score, verification timestamp, telemetry data, and verified certificate credentials.

### 6. 👤 User Profile & Portfolio (`/dashboard/profile`)
- **Profile Banner & Hero:** Candidate avatar, status badge, location, title, and social links.
- **Verified Skills & Certifications:** Categorized skills grid with level metrics and credential IDs.
- **Profile Completion Widget:** Progress meter tracking profile readiness.

### 7. ⚙️ Dedicated Account Settings (`/dashboard/settings`)
- Profile preferences, security/password controls, notifications toggles, theme options, and account export.

### 8. 🔔 Notifications Center (`/dashboard/notifications` & Dropdown)
- Header bell icon dropdown with live unread badge and dedicated notifications page with category filters.

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
