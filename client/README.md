# SKILLEZO AI — Client

> AI-Powered Skill Verification Platform — Enterprise-grade Next.js frontend with premium glassmorphic authentication system.

---

## ⚡ Tech Stack

| Layer | Technology |
|:---|:---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Components** | Shadcn UI + Custom Design System |
| **Animations** | Framer Motion |
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

## 🏗️ Architecture Overview

### Design System

The application uses a **premium dark glassmorphic SaaS design** inspired by Linear, Clerk, Stripe, Vercel, and OpenAI.

| Token | Value |
|:---|:---|
| Background | `#0B1130` (Deep Navy) |
| Card Surface | `#141b4d` / glass overlays |
| Primary | `#3D5AFE` (Electric Blue) |
| Accent | `#00D9C0` (Vivid Cyan) |
| Border Radius | `24px` (glass cards) / `12px` (inputs/buttons) |
| Typography | Satoshi (display) + IBM Plex Sans (body) |
| Glass Effect | Backdrop blur + translucent borders + ambient glow orbs |

### Component Architecture

```
components/
├── AuthLayout.tsx          ← Master 2-column auth shell (Brand Panel + Form Card)
├── BrandSection.tsx        ← Enterprise brand showcase with feature badges
├── auth/                   ← Reusable atomic auth components
│   ├── AuthCard.tsx        ← 24px rounded glass card wrapper with Framer Motion entry
│   ├── AuthHeader.tsx      ← Title + subtitle + contextual navigation link
│   ├── BrandLogo.tsx       ← SKILLEZO logo (sm/md/lg variants)
│   ├── PasswordInput.tsx   ← Password field with eye toggle + forwardRef
│   ├── RememberMe.tsx      ← Custom checkbox with right-slot action
│   ├── SocialButton.tsx    ← Google & LinkedIn OAuth buttons (toast feedback)
│   ├── Divider.tsx         ← "Or continue with" separator
│   └── LoadingSpinner.tsx  ← Dual cyan/blue gradient spinner
├── common/                 ← General-purpose UI utilities
│   ├── GlassCard.tsx       ← Configurable glass container (light/medium/strong)
│   ├── PageContainer.tsx   ← Page wrapper with ambient glow mesh
│   ├── SectionHeading.tsx  ← Section header with gradient accents
│   └── EmptyState.tsx      ← Reusable empty/placeholder view
├── site/                   ← Landing page components (Navbar, Hero, Features, etc.)
└── ui/                     ← Shadcn UI primitives (Button, Dialog, etc.)
```

---

## 📐 Application Routes & Navigation Flow

### Route Map

```
app/
├── page.tsx                    ← Landing Page
├── login/                      ← Login Page
│   ├── page.tsx
│   ├── loading.tsx
│   └── components/
│       ├── LoginCard.tsx
│       └── LoginForm.tsx
├── register/                   ← Register Page
│   ├── page.tsx
│   ├── loading.tsx
│   └── components/
│       ├── RegisterCard.tsx
│       └── RegisterForm.tsx
├── forgot-password/            ← Forgot Password (email input + success state)
│   └── page.tsx
├── reset-password/             ← Reset Password (new password + success state)
│   └── page.tsx
├── verify-email/               ← Email Verification (countdown timer + resend)
│   └── page.tsx
├── account-suspended/          ← Account Suspended (warning + support action)
│   └── page.tsx
└── dashboard/                  ← Dashboard Placeholder (sidebar + stats)
    └── page.tsx
```

### User Flow Diagram

```
┌─────────────┐
│  Landing /  │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Login      │────▶│  Dashboard       │     │  Forgot Password│
│  /login     │     │  /dashboard      │     │  /forgot-password│
└──────┬──────┘     └──────────────────┘     └────────┬────────┘
       │                                              │
       │  "Sign Up"                                   ▼
       ▼                                     ┌─────────────────┐
┌─────────────┐                              │  Reset Password │
│  Register   │                              │  /reset-password│
│  /register  │                              └────────┬────────┘
└──────┬──────┘                                       │
       │                                              ▼
       ▼                                     ┌─────────────────┐
┌─────────────┐                              │  Login          │
│ Verify Email│                              │  /login         │
│ /verify-email│                             └─────────────────┘
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Dashboard      │
│  /dashboard     │
└─────────────────┘

┌───────────────────┐
│ Account Suspended │  (standalone security state)
│ /account-suspended│
└───────────────────┘
```

---

## 🔐 Authentication Pages Detail

### Login (`/login`)
- Email + Password validation (React Hook Form + Zod)
- Password show/hide toggle
- "Remember Me" checkbox + "Forgot password?" link
- Google & LinkedIn social buttons (Sonner "Coming Soon" toast)
- Submit → mock redirect to `/dashboard`

### Register (`/register`)
- Full Name (min 3 chars), Email, Password (strength: uppercase + lowercase + number + min 8), Confirm Password (match), Terms & Conditions checkbox
- Submit → mock redirect to `/verify-email`

### Forgot Password (`/forgot-password`)
- Email input with Zod validation
- Submit → inline success card confirming reset link dispatch
- Resend action + "Return to Login" link

### Reset Password (`/reset-password`)
- New Password + Confirm Password with strength validation
- Submit → inline success card with "Sign In to Continue" → `/login`

### Verify Email (`/verify-email`)
- Animated mail icon badge
- 60-second resend countdown timer
- Sonner toast on resend
- "Continue to Dashboard" + "Register again" links

### Account Suspended (`/account-suspended`)
- Amber warning card with suspension reasons
- "Contact Support" button (Sonner toast)
- "Return to Home" secondary action

### Dashboard (`/dashboard`)
- Responsive sidebar navigation (6 items) with mobile hamburger toggle
- Top header bar with search input (`⌘K`), notification bell, user avatar
- Welcome banner with "Start New Audit" CTA
- 4 metric stat cards (Skill Index, Certifications, Audits, Peer Rank)
- Recent Skill Verifications table (3 mock entries)

---

## 📱 Responsive Behavior

| Breakpoint | Layout |
|:---|:---|
| **Desktop** (`lg+`) | 2-column: Brand Panel (left) + Auth Card (right); Dashboard with visible sidebar |
| **Tablet** (`md`) | Centered auth card; Brand panel hidden; Dashboard with collapsible sidebar |
| **Mobile** (`sm`) | Full-width centered card; Brand section hidden; Dashboard with hamburger menu |

---

## 🧪 Form Validation Rules

| Field | Rules |
|:---|:---|
| Email | Required, valid email format |
| Password | Required, min 8 chars, 1 uppercase, 1 lowercase, 1 number |
| Confirm Password | Must match Password |
| Full Name | Required, min 3 characters |
| Terms & Conditions | Must be accepted |

All validation is **client-side only** using Zod schemas resolved through `@hookform/resolvers`.

---

## 🔮 Future Integration

This frontend is architected for seamless **Better Auth** integration:

- All form components use `react-hook-form` with `onSubmit` handlers ready to be wired to server actions / API routes
- Social login buttons are pre-wired with provider identifiers (`google`, `linkedin`)
- Session-dependent UI (dashboard sidebar, user profile badge) uses mock data that maps directly to auth session objects
- No UI changes required when backend authentication is connected

---

## 📁 Key Files Reference

| File | Purpose |
|:---|:---|
| `app/globals.css` | Design tokens, glass classes, gradient utilities, scrollbar styles |
| `lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| `components/AuthLayout.tsx` | Master auth page shell (navbar + 2-column grid + ambient glows) |
| `components/BrandSection.tsx` | Enterprise brand showcase panel |
| `components/auth/*.tsx` | 8 reusable atomic auth UI components |
| `components/common/*.tsx` | 4 general-purpose UI utilities |

---

## 📜 License

Private — SKILLEZO AI
