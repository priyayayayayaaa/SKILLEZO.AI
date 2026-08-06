# SKILLEZO AI — Client

> AI-Powered Skill Verification Platform — Enterprise-grade Next.js frontend with premium glassmorphic architecture, complete authentication suite, interactive candidate dashboard, skill audit engine, user profile management, and dedicated settings control.

---

## ⚡ Tech Stack

| Layer | Technology |
|:---|:---|
| **Framework** | Next.js 15 / 16 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Components** | Custom Design System + Shadcn UI primitives |
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
│   ├── dashboard/              # Module Components (MetricCards, Recharts, Filters, Profile)
│   ├── layout/                 # Shell Layout (Sidebar, Topbar, UserMenu, NotificationDropdown)
│   ├── common/                 # Reusable UI (PageHeader, StatusBadge, FilterDropdown)
│   ├── site/                   # Landing Page Sections (Hero, Features, Pricing, CTA)
│   └── ui/                     # Primitives (Button, Dialog, Input, Toaster)
│
├── doc/                        # Project Specifications & Walkthroughs
│   ├── phases/                 # Phase 1 - 5 Implementation Documents
│   └── specs/                  # Technical Specs & Refinement Specs
│
├── mock/                       # Data Layer Mocks (Users, Verification, Dashboard, Notifications)
├── types/                      # TypeScript Interfaces (User, Verification, Dashboard, Notification)
├── lib/                        # Helpers & Utilities (cn, utils)
└── public/                     # Static Assets & Icons
```

---

## 📐 Application Modules & Features

### 1. 🏠 Landing Page (`/`)
- Interactive marketing homepage featuring AI score modal (`ScoreDialog`), hero showcase, feature grid, pricing options, success stories, and CTA section.

### 2. 🔐 Authentication Suite (`app/(auth)`)
- **Login (`/login`):** Email & Password login with Zod validation, OAuth social options, remember-me check.
- **Register (`/register`):** User registration with password complexity scoring and terms acceptance.
- **Forgot Password (`/forgot-password`):** Password reset request workflow with toast confirmation.
- **Reset Password (`/reset-password`):** Secure new password submission.
- **Verify Email (`/verify-email`):** Resend countdown timer and verification flow.
- **Account Suspended (`/account-suspended`):** Standalone security alert screen with support actions.

### 3. 📊 Dashboard Overview (`/dashboard`)
- **Metric Stat Cards:** Verified Skills, Skill Health Score (94%), Pending Audits, Global Benchmark Rank.
- **Skill Growth Chart:** Interactive Recharts line graph tracking score progression over time.
- **Recent Verification Table:** Tabular summary with status badges (`Verified`, `Pending`, `In Review`, `Failed`).
- **AI Skill Insights:** Automated recommendations to optimize candidate audit scores.

### 4. 🏆 Skill Verification Engine (`/dashboard/skill-verification`)
- Filterable candidate skill audit directory by **Status** and **Category**.
- Interactive detail drawer inspecting audit breakdown score, verification timestamp, telemetry data, and verified certificate credentials.

### 5. 👤 User Profile & Portfolio (`/dashboard/profile`)
- **Profile Banner & Hero:** Candidate avatar, status badge, location, title, and social links.
- **Personal Information:** Bio, contact info, emergency contacts.
- **Verified Skills & Certifications:** Categorized skills grid with level metrics, verified badges, and credential IDs.
- **Education & Portfolio:** Academic background and degree verifications.
- **Profile Completion Widget:** Progress meter tracking profile readiness.

### 6. ⚙️ Dedicated Account Settings (`/dashboard/settings`)
- **Profile Settings:** Display name, headline, bio, and contact preferences.
- **Password & Security:** Password changes, security audit log, and 2FA authentication state.
- **Notifications Preferences:** Email alerts, browser push notifications, and SMS audit updates.
- **Appearance & Theme:** Dark mode controls, system theme, and compact display mode.
- **Account Controls:** Data export actions and account deletion workflows.

### 7. 🔔 Notifications Center (`/dashboard/notifications` & Dropdown)
- Header bell icon dropdown with live unread badge, quick preview card, and read/unread status toggle.
- Dedicated `/dashboard/notifications` hub with category filtering (`verification`, `assessment`, `security`, `system`).

---

## 🎨 Design System & Theme

| Token | Value |
|:---|:---|
| **Background** | `#0B1130` (Deep Space Navy) |
| **Sidebar Surface** | `#080D26` / Glassmorphism Backdrop Blur |
| **Card Surface** | `#0F172A` / `#141B4D` |
| **Primary Accent** | `#3D5AFE` (Electric Blue) |
| **Secondary Accent** | `#00D9C0` (Vivid Cyan) |
| **Borders** | `border-slate-800` / `border-white/10` |
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
