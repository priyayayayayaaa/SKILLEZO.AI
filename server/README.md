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

Current implementation progress: **Phases 1 through 10A Completed + Layered Architecture Refactoring**

- [x] **PHASE 1 — Backend Foundation**: Environment configuration (Zod validation), structure setup, TypeScript setup, base dependencies (`express`, `mongoose`, `zod`).
- [x] **PHASE 2 — MongoDB Connection + Core Infrastructure**: Mongoose connection manager with state management, graceful shutdown listeners (`SIGINT`/`SIGTERM`), CORS origin handling, liveness (`GET /api/health`), and database readiness (`GET /api/health/ready`) endpoints.
- [x] **PHASE 3 — Shared Backend Infrastructure**: Domain enums, machine-readable error codes (`ERROR_CODES`), numeric HTTP status (`HTTP_STATUS`), custom operational `AppError`, generic `apiResponse` contracts, `asyncHandler`, Zod `validate` request middleware, `objectIdSchema`, `userIdSchema`, `paginationQuerySchema`, `notFoundMiddleware`, and central `errorMiddleware`.
- [x] **PHASE 4 — Root Mongoose Models**: `User`, `Role`, `Company` models with indexes, defaults, and schema validations.
- [x] **PHASE 5 — Dependent Mongoose Models**: `Profile` (embedded `skills`, `education`, `experience`, `links`), `Competency` (compound unique `{ roleId, skillName }`), `CompanyMember` (N:M bridge between `User` and `Company`).
- [x] **PHASE 6 — Resume & Job Mongoose Models**: `Resume` (typed `extractedData`), `Job` (multi-references, embedded `location`, `salary`, `requiredSkills`).
- [x] **PHASE 7 — Final Mongoose Models**: `CareerPlan` (typed `gapsData`), `Application` (N:M bridge between `User` and `Job` with `{ userId, jobId }` compound unique constraint). **Total: 10 / 10 Models Complete**.
- [x] **PHASE 8 — Database Model Audit & Freeze**: Programmatic audit of 47 registered indexes across all 10 collections. Model persistence layer frozen with 0 schema drift.
- [x] **PHASE 9 — Repository Layer Foundation**: Generic `IRepository<T>` interface and `BaseRepository<T>` abstract class. Implemented `UserRepository`, `ProfileRepository`, `RoleRepository`, `CompanyRepository`, and custom `RepositoryError` hierarchy (`EntityNotFoundError`, `DuplicateEntityError`, `DatabaseOperationError`).
- [x] **PHASE 9.5 — Better Auth Identity Migration**: Option A identity separation (Better Auth owns identity string `user.id`, SKILLEZO owns domain data). Migrated 9 user-referencing fields to `String`, removed Mongoose `ref: "User"` population dependencies, removed custom `passwordHash` ownership from SKILLEZO models/repositories, and preserved all domain `ObjectId` entity references.
- [x] **PHASE 10A — Better Auth Installation & MongoDB Configuration**: Installed `better-auth` and `mongodb`, configured official `mongodbAdapter(mongoose.connection.db)`, created core `auth.ts` setup with restricted server-owned user fields (`role`, `accountStatus`, `lastLoginAt`), and updated `env.ts` / `.env.example`.
- [ ] **PHASE 10B — Better Auth Express Handler & Session Verification**

---

## 📦 Persistence Layer Overview (10 / 10 Mongoose Models)

| # | Model | Collection | Primary / Compound Unique Indexes | Key References / Embedded Features |
|---|---|---|---|---|
| 01 | **User** | `users` | `{ email: 1 }` (Unique) | `_id: string` (Better Auth User ID), domain projection (`email`, `role`, `accountStatus`) |
| 02 | **Role** | `roles` | `{ slug: 1 }` (Unique) | Normalized `slug`, role status |
| 03 | **Company** | `companies` | `{ slug: 1 }` (Unique) | `location` subdocument, `createdBy` -> `String` (Better Auth User ID) |
| 04 | **Profile** | `profiles` | `{ userId: 1 }` (Unique) | `userId` -> `String`, `targetRoleId` -> `Role`, embedded `skills`, `education`, `experience`, `links` |
| 05 | **Competency** | `competencies` | `{ roleId: 1, skillName: 1 }` (Unique) | `roleId` -> `Role`, `CompetencyImportance` enum |
| 06 | **CompanyMember** | `company_members` | `{ userId: 1, companyId: 1 }` (Unique) | Bridge between User & Company, `userId` -> `String`, `companyId` -> `Company`, `invitedBy` -> `String` |
| 07 | **Resume** | `resumes` | `{ userId: 1, createdAt: -1 }` | `userId` -> `String`, typed `extractedData` |
| 08 | **Job** | `jobs` | `{ companyId: 1, status: 1 }`, `{ roleId: 1, status: 1 }` | `companyId` -> `Company`, `roleId` -> `Role`, `createdBy` -> `String` |
| 09 | **CareerPlan** | `career_plans` | `{ userId: 1, roleId: 1, createdAt: -1 }` | `userId` -> `String`, `roleId` -> `Role`, typed `gapsData` |
| 10 | **Application** | `applications` | `{ userId: 1, jobId: 1 }` (Unique) | Bridge between User & Job, `userId` -> `String`, `jobId` -> `Job`, `resumeId` -> `Resume`, `statusHistory` |

---

## 🏢 Repository Layer Abstraction (`src/database/repositories/`)

| Repository | Extends | Specialty Methods |
|---|---|---|
| **BaseRepository** | `IRepository<T>` | Generic `create`, `findById`, `findOne`, `findMany`, `updateById`, `deleteById`, `exists`, `count`, `paginate`, `aggregate`, `bulkInsert` |
| **UserRepository** | `BaseRepository<IUser>` | `findByEmail`, `existsByEmail`, `findActiveUser`, `updatePassword`, `verifyEmail`, `updateLastLogin`, `changeAccountStatus` |
| **ProfileRepository** | `BaseRepository<IProfile>` | `findByUserId`, `updateSkills`, `updateEducation`, `updateExperience`, `updateTargetRole`, `updateLinks`, `findProfilesByRole` |
| **RoleRepository** | `BaseRepository<IRole>` | `findBySlug`, `findByName`, `findActiveRoles`, `findInactiveRoles` |
| **CompanyRepository** | `BaseRepository<ICompany>` | `findBySlug`, `findVerifiedCompanies`, `findCompaniesByIndustry`, `updateVerificationStatus`, `findCreatedBy` |

---

## 📂 Refactored Project Structure

```text
server/src/
├── core/                               # Core Infrastructure Layer
│   ├── config/                         # Zod environment schema & config
│   ├── constants/                      # Domain enums, error-codes, http-status
│   ├── middleware/                     # Error, Not-Found, and Zod validate middleware
│   ├── types/                          # API & Pagination response contracts
│   ├── utils/                          # AppError, apiResponse, asyncHandler
│   ├── validators/                     # Common Zod schemas (ObjectId, pagination)
│   └── index.ts                        # Central core barrel export
│
├── database/                           # Persistence Layer
│   ├── connection/                     # Mongoose connection manager (db.ts)
│   ├── models/                         # 10 Frozen Mongoose Models
│   │   ├── User.model.ts
│   │   ├── Role.model.ts
│   │   ├── Company.model.ts
│   │   ├── Profile.model.ts
│   │   ├── Competency.model.ts
│   │   ├── CompanyMember.model.ts
│   │   ├── Resume.model.ts
│   │   ├── Job.model.ts
│   │   ├── CareerPlan.model.ts
│   │   ├── Application.model.ts
│   │   └── index.ts                    # Barrel export for all 10 models
│   └── repositories/                   # Abstract Repository Layer
│       ├── base/                       # BaseRepository & IRepository
│       ├── company/                    # CompanyRepository
│       ├── errors/                     # RepositoryError classes
│       ├── profile/                    # ProfileRepository
│       ├── role/                       # RoleRepository
│       ├── types/                      # Pagination & query types
│       ├── user/                       # UserRepository
│       └── index.ts                    # Repositories barrel export
│
├── modules/                            # Future Business Feature Modules (Placeholders)
│   ├── admin/
│   ├── applications/
│   ├── auth/
│   ├── career-plan/
│   ├── company/
│   ├── jobs/
│   ├── profile/
│   ├── resume/
│   └── users/
│
├── routes/                             # API HTTP Routes
│   └── health.routes.ts                # /api/health (Liveness) & /api/health/ready (Readiness)
│
└── server.ts                           # Express Application Entrypoint
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
