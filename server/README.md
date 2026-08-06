# 🚀 SKILLEZO AI Backend

> **Express.js + TypeScript Backend Service for SKILLEZO AI**

The SKILLEZO AI backend is built using **Node.js, Express.js, TypeScript, and MongoDB Atlas (via Mongoose)** following a strict multi-layered architecture:

```text
Next.js Frontend
       ↓ HTTP
Express Backend (/server)
       ↓
Routes
       ↓
Validators (Zod)
       ↓
Controllers
       ↓
Services
       ↓
Repositories
       ↓
Mongoose Models
       ↓
MongoDB Atlas
```

---

## 📌 Implementation Status

Current implementation progress: **Phases 1 through 7 Completed (Complete 10/10 Persistence Model Layer)**

- [x] **PHASE 1 — Backend Foundation**: Environment configuration (Zod validation), structure setup, TypeScript setup, base dependencies (`express`, `mongoose`, `zod`, `jsonwebtoken`, `bcryptjs`).
- [x] **PHASE 2 — MongoDB Connection + Core Infrastructure**: Mongoose connection manager with state management, graceful shutdown listeners (`SIGINT`/`SIGTERM`), CORS origin handling, liveness (`GET /api/health`), and database readiness (`GET /api/health/ready`) endpoints.
- [x] **PHASE 3 — Shared Backend Infrastructure**: Domain enums, machine-readable error codes (`ERROR_CODES`), numeric HTTP status (`HTTP_STATUS`), custom operational `AppError`, generic `apiResponse` contracts, `asyncHandler`, Zod `validate` request middleware, `objectIdSchema`, `paginationQuerySchema`, `notFoundMiddleware`, and central `errorMiddleware`.
- [x] **PHASE 4 — Root Mongoose Models**: `User`, `Role`, `Company` models with indexes, defaults, and schema validations.
- [x] **PHASE 5 — Dependent Mongoose Models**: `Profile` (embedded `skills`, `education`, `experience`, `links`), `Competency` (compound unique `{ roleId, skillName }`), `CompanyMember` (N:M bridge between `User` and `Company`).
- [x] **PHASE 6 — Resume & Job Mongoose Models**: `Resume` (typed `extractedData`), `Job` (multi-references, embedded `location`, `salary`, `requiredSkills`).
- [x] **PHASE 7 — Final Mongoose Models**: `CareerPlan` (typed `gapsData`), `Application` (N:M bridge between `User` and `Job` with `{ userId, jobId }` compound unique constraint). **Total: 10 / 10 Models Complete**.
- [ ] **PHASE 8 — Database Model Audit & Freeze**
- [ ] **PHASE 9 — Repository Layer**
- [ ] **PHASE 10 — Service Layer & Business Logic**

---

## 📦 Persistence Layer Overview (10 / 10 Mongoose Models)

| # | Model | Collection | Primary / Compound Unique Indexes | Key References / Embedded Features |
|---|---|---|---|---|
| 01 | **User** | `users` | `{ email: 1 }` (Unique) | `passwordHash` (`select: false`), normalized `email` |
| 02 | **Role** | `roles` | `{ slug: 1 }` (Unique) | Normalized `slug`, role status |
| 03 | **Company** | `companies` | `{ slug: 1 }` (Unique) | `location` subdocument, `createdBy` -> `User` |
| 04 | **Profile** | `profiles` | `{ userId: 1 }` (Unique) | Embedded `skills`, `education`, `experience`, `links` |
| 05 | **Competency** | `competencies` | `{ roleId: 1, skillName: 1 }` (Unique) | `roleId` -> `Role`, `CompetencyImportance` enum |
| 06 | **CompanyMember** | `company_members` | `{ userId: 1, companyId: 1 }` (Unique) | Bridge between `User` & `Company`, `invitedBy` -> `User` |
| 07 | **Resume** | `resumes` | `{ userId: 1, createdAt: -1 }` | `userId` -> `User`, typed `extractedData` |
| 08 | **Job** | `jobs` | `{ companyId: 1, status: 1 }`, `{ roleId: 1, status: 1 }` | `companyId` -> `Company`, `roleId` -> `Role`, `createdBy` -> `User` |
| 09 | **CareerPlan** | `career_plans` | `{ userId: 1, roleId: 1, createdAt: -1 }` | `userId` -> `User`, `roleId` -> `Role`, typed `gapsData` |
| 10 | **Application** | `applications` | `{ userId: 1, jobId: 1 }` (Unique) | Bridge between `User` & `Job`, `resumeId` -> `Resume`, `statusHistory` |

---

## 📂 Project Structure

```text
server/
├── .env                              # Local environment variables (git-ignored)
├── .env.example                      # Template environment variables
├── package.json                      # Build & runner scripts
├── tsconfig.json                     # TypeScript compiler configuration (@/* paths)
│
├── doc/                              # Architectural phase documentation & walkthroughs
│   ├── planes/
│   │   ├── phase1.md ... phase7.md
│   └── walkthrough/
│       ├── phase4walkthrough.md
│       ├── phase5walkthrough.md
│       ├── phase6walkthrough.md
│       └── phase7walkthrough.md
│
└── src/
    ├── config/
    │   └── env.ts                    # Zod environment variable schema & export
    │
    ├── constants/
    │   ├── enums.ts                  # Domain & database enums
    │   ├── error-codes.ts            # Machine-readable error codes
    │   ├── http-status.ts            # Standard numeric HTTP statuses
    │   └── index.ts                  # Central constants re-export
    │
    ├── lib/
    │   └── db.ts                     # Mongoose connection manager & event handlers
    │
    ├── middleware/
    │   ├── error.middleware.ts       # Centralized Express error handler
    │   ├── notFound.middleware.ts    # Catch-all 404 route handler
    │   └── validate.middleware.ts   # Express Zod request validation pipeline
    │
    ├── models/                       # 10 / 10 Mongoose Persistence Models
    │   ├── User.model.ts
    │   ├── Role.model.ts
    │   ├── Company.model.ts
    │   ├── Profile.model.ts
    │   ├── Competency.model.ts
    │   ├── CompanyMember.model.ts
    │   ├── Resume.model.ts
    │   ├── Job.model.ts
    │   ├── CareerPlan.model.ts
    │   ├── Application.model.ts
    │   └── index.ts                  # Barrel re-export for all 10 models
    │
    ├── routes/
    │   └── health.routes.ts          # /api/health (Liveness) & /api/health/ready (Readiness)
    │
    ├── types/
    │   ├── api.types.ts              # Generic ApiSuccess & ApiError response contracts
    │   └── pagination.types.ts       # PaginationParams & PaginatedResult interfaces
    │
    ├── utils/
    │   ├── apiResponse.ts            # Standardized API response formatters
    │   ├── AppError.ts               # Custom operational error class
    │   └── asyncHandler.ts           # Express async promise handler
    │
    ├── validators/
    │   └── common.validators.ts      # objectIdSchema & paginationQuerySchema
    │
    └── server.ts                     # Express application entrypoint
```

---

## 🛠 Prerequisites & Installation

### 1. Environment Configuration

Create a `.env` file inside `/server`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/skillezo
JWT_ACCESS_SECRET=your_jwt_access_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

### 2. Install Dependencies

```bash
cd server
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build & Type Check

```bash
# Type checking (0 errors)
npm run type-check

# Production build compilation
npm run build

# Start compiled production server
npm run start
```

---

## 🧪 Health & Readiness Endpoints

- **Liveness Check**: `GET http://localhost:5000/api/health`
  - Returns `200 OK` when process is running: `{ "success": true, "data": { "status": "ok" } }`
- **Readiness Check**: `GET http://localhost:5000/api/health/ready`
  - Returns `200 OK` when MongoDB is connected: `{ "success": true, "data": { "status": "ready", "database": "connected" } }`
  - Returns `503 Service Unavailable` when MongoDB is disconnected: `{ "success": false, "error": { "code": "SERVICE_NOT_READY", "message": "Database connection is not ready" } }`
