# 🚀 SKILLEZO AI Backend

> **Express.js + TypeScript Backend Service for SKILLEZO AI**

The SKILLEZO AI backend is built using **Node.js, Express.js, TypeScript, MongoDB Atlas (via Mongoose), and Better Auth** following a strict multi-layered architecture:

```text
Next.js Frontend
       ↓ HTTP
Express Backend (/server)
       ↓
Better Auth (/api/auth/*)   ← Identity & Session Layer
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

Current implementation progress: **Phases 1 through 10C Completed + Layered Architecture Refactoring**

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
- [x] **PHASE 10B — Better Auth Express Handler & Session Verification**: Integrated `toNodeHandler(auth)` in Express middleware pipeline (`/api/auth`) before `express.json()`, enabled `emailAndPassword` auth, verified server-side session resolution via `auth.api.getSession`, and implemented temporary verification endpoint (`/api/auth-test/session`).
- [x] **PHASE 10C — Authentication Middleware & Protected Route Foundation**: Implemented `requireAuth` middleware using Better Auth `auth.api.getSession`, defined `AuthenticatedUserContext` (`user.id: string`), extended Express Request typing, implemented account status checks (`SUSPENDED`/`DEACTIVATED` → 403), and verified protected test route (`/api/auth-test/protected`).
- [ ] **PHASE 11 — Core Application Layer Foundation (Profile Business Module)**

---

## 🔐 Authentication (Better Auth)

SKILLEZO uses **[Better Auth](https://better-auth.com/)** for all identity management. This is a clean separation of concerns:

| Layer           | Owns                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------- |
| **Better Auth** | User identity (`user.id: string`), password hashing, sessions, accounts, email verification |
| **SKILLEZO**    | Domain entities (`profiles`, `resumes`, `companies`, `jobs`, `applications`, etc.)          |

### Auth Configuration (`src/core/auth/auth.ts`)

```typescript
betterAuth({
  database: mongodbAdapter(mongoose.connection.db),  // Shares the same MongoDB Atlas DB
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  advanced: { disableCSRFCheck: true },              // Disabled for API-only usage
  checkOrigin: () => true,                           // Trusts all origins (API server)
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      role,           // "candidate" | "recruiter" | "admin" (default: "candidate")
      accountStatus,  // "active" | "suspended" | "deactivated" (default: "active")
      lastLoginAt,    // date | null
    }
  }
})
```

> **Note:** `authHandler` includes an automatic origin fallback — if no `Origin` header is present (e.g. Postman requests), it defaults to `http://localhost:5000` so Better Auth's origin check does not reject the request.

Better Auth auto-creates and manages the following collections in MongoDB Atlas:

| Collection     | Purpose                                                                     |
| -------------- | --------------------------------------------------------------------------- |
| `user`         | Core identity (id, email, name, emailVerified) + SKILLEZO additional fields |
| `session`      | Active sessions with expiry                                                 |
| `account`      | OAuth / credential provider links                                           |
| `verification` | Email verification tokens                                                   |

### Auth Endpoints (mounted at `/api/auth`)

| Method | Endpoint                  | Description                    |
| ------ | ------------------------- | ------------------------------ |
| `POST` | `/api/auth/sign-up/email` | Register a new user            |
| `POST` | `/api/auth/sign-in/email` | Sign in with email & password  |
| `POST` | `/api/auth/sign-out`      | Sign out (invalidates session) |
| `GET`  | `/api/auth/get-session`   | Retrieve current session       |

### `requireAuth` Middleware

All protected routes use the `requireAuth` middleware located at `src/core/auth/middleware/requireAuth.ts`.

It:
1. Resolves the session from the incoming cookie via `auth.api.getSession`
2. Attaches `req.user` (`AuthenticatedUserContext`) to the Express request:
   - `id: string` — Better Auth user ID
   - `email: string`
   - `role: UserRole`
   - `emailVerified: boolean`
   - `accountStatus: AccountStatus`
3. Returns `401 UNAUTHORIZED` if no valid session exists
4. Returns `403 FORBIDDEN` if account is `SUSPENDED` or `DEACTIVATED`

The Express `Request` type is extended globally via `src/types/express.d.ts` to include `req.user?: AuthenticatedUserContext`.

---

## 📦 Persistence Layer Overview (10 / 10 Mongoose Models)

| #   | Model             | Collection        | Primary / Compound Unique Indexes                         | Key References / Embedded Features                                                                      |
| --- | ----------------- | ----------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 01  | **User**          | `users`           | `{ email: 1 }` (Unique)                                   | `_id: string` (Better Auth User ID), domain projection (`email`, `role`, `accountStatus`)               |
| 02  | **Role**          | `roles`           | `{ slug: 1 }` (Unique)                                    | Normalized `slug`, role status                                                                          |
| 03  | **Company**       | `companies`       | `{ slug: 1 }` (Unique)                                    | `location` subdocument, `createdBy` → `String` (Better Auth User ID)                                    |
| 04  | **Profile**       | `profiles`        | `{ userId: 1 }` (Unique)                                  | `userId` → `String`, `targetRoleId` → `Role`, embedded `skills`, `education`, `experience`, `links`     |
| 05  | **Competency**    | `competencies`    | `{ roleId: 1, skillName: 1 }` (Unique)                    | `roleId` → `Role`, `CompetencyImportance` enum                                                          |
| 06  | **CompanyMember** | `company_members` | `{ userId: 1, companyId: 1 }` (Unique)                    | Bridge between User & Company, `userId` → `String`, `companyId` → `Company`, `invitedBy` → `String`     |
| 07  | **Resume**        | `resumes`         | `{ userId: 1, createdAt: -1 }`                            | `userId` → `String`, typed `extractedData`                                                              |
| 08  | **Job**           | `jobs`            | `{ companyId: 1, status: 1 }`, `{ roleId: 1, status: 1 }` | `companyId` → `Company`, `roleId` → `Role`, `createdBy` → `String`                                      |
| 09  | **CareerPlan**    | `career_plans`    | `{ userId: 1, roleId: 1, createdAt: -1 }`                 | `userId` → `String`, `roleId` → `Role`, typed `gapsData`                                                |
| 10  | **Application**   | `applications`    | `{ userId: 1, jobId: 1 }` (Unique)                        | Bridge between User & Job, `userId` → `String`, `jobId` → `Job`, `resumeId` → `Resume`, `statusHistory` |

---

## 🏢 Repository Layer Abstraction (`src/database/repositories/`)

| Repository            | Extends                    | Specialty Methods                                                                                                                         |
| --------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **BaseRepository**    | `IRepository<T>`           | Generic `create`, `findById`, `findOne`, `findMany`, `updateById`, `deleteById`, `exists`, `count`, `paginate`, `aggregate`, `bulkInsert` |
| **UserRepository**    | `BaseRepository<IUser>`    | `findByEmail`, `existsByEmail`, `findActiveUser`, `updatePassword`, `verifyEmail`, `updateLastLogin`, `changeAccountStatus`               |
| **ProfileRepository** | `BaseRepository<IProfile>` | `findByUserId`, `updateSkills`, `updateEducation`, `updateExperience`, `updateTargetRole`, `updateLinks`, `findProfilesByRole`            |
| **RoleRepository**    | `BaseRepository<IRole>`    | `findBySlug`, `findByName`, `findActiveRoles`, `findInactiveRoles`                                                                        |
| **CompanyRepository** | `BaseRepository<ICompany>` | `findBySlug`, `findVerifiedCompanies`, `findCompaniesByIndustry`, `updateVerificationStatus`, `findCreatedBy`                             |

---

## 📂 Project Structure

```text
server/src/
├── core/                               # Core Infrastructure Layer
│   ├── auth/                           # Better Auth & Authentication Boundary
│   │   ├── middleware/                 # requireAuth middleware
│   │   ├── auth.ts                     # betterAuth setup, mongodbAdapter, additionalFields
│   │   ├── auth.types.ts               # AuthenticatedUserContext interface
│   │   └── index.ts                    # Auth barrel export
│   ├── config/                         # Zod environment schema & config
│   ├── constants/                      # Domain enums, error-codes, http-status
│   ├── middleware/                     # Error, Not-Found, and Zod validate middleware
│   ├── types/                          # API & Pagination response contracts
│   ├── utils/                          # AppError, apiResponse, asyncHandler
│   ├── validators/                     # Common Zod schemas (ObjectId, userId, pagination)
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
├── modules/                            # Business Feature Modules (Placeholders)
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
│   ├── health.routes.ts                # /api/health & /api/health/ready
│   └── testAuth.routes.ts              # /api/auth-test/session & /api/auth-test/protected (temporary)
│
├── types/                              # Global TypeScript Type Augmentations
│   └── express.d.ts                    # Extends Express Request with req.user?: AuthenticatedUserContext
│
└── server.ts                           # Express Application Entrypoint
```

---

## 🛠 Prerequisites & Installation

### 1. Environment Configuration

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/skillezo?retryWrites=true&w=majority
CLIENT_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key_min_32_chars
BETTER_AUTH_URL=http://localhost:5000
```

> **Note**: `MONGODB_URI` must point to MongoDB Atlas. Direct connection strings (bypassing SRV) use the format:
> `mongodb://<user>:<pass>@<primary-node>:27017/skillezo?ssl=true&authSource=admin&directConnection=true`

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

## 🧪 API Endpoints

### Health Checks

| Method | Endpoint            | Description                                            |
| ------ | ------------------- | ------------------------------------------------------ |
| `GET`  | `/api/health`       | Liveness — returns `200 OK` when process is running    |
| `GET`  | `/api/health/ready` | Readiness — returns `200 OK` when MongoDB is connected |

**Responses:**
```json
// GET /api/health
{ "success": true, "data": { "status": "ok" } }

// GET /api/health/ready — connected
{ "success": true, "data": { "status": "ready", "database": "connected" } }

// GET /api/health/ready — disconnected
{ "success": false, "error": { "code": "SERVICE_NOT_READY", "message": "Database connection is not ready" } }
```

### Authentication Endpoints

| Method | Endpoint                  | Description                               |
| ------ | ------------------------- | ----------------------------------------- |
| `POST` | `/api/auth/sign-up/email` | Register a new user with email & password |
| `POST` | `/api/auth/sign-in/email` | Sign in with email & password             |
| `POST` | `/api/auth/sign-out`      | Sign out current session                  |
| `GET`  | `/api/auth/get-session`   | Get current session info                  |

**Sign-Up Request Body:**
```json
{
  "email": "user@example.com",
  "password": "YourPassword123!",
  "name": "Full Name"
}
```

**Sign-In Request Body:**
```json
{
  "email": "user@example.com",
  "password": "YourPassword123!"
}
```

### Test Routes (Temporary — Phase 10B/10C Verification)

| Method | Endpoint                   | Auth Required | Description                                                         |
| ------ | -------------------------- | ------------- | ------------------------------------------------------------------- |
| `GET`  | `/api/auth-test/session`   | ❌ No          | Returns raw Better Auth session object (or null if unauthenticated) |
| `GET`  | `/api/auth-test/protected` | ✅ Yes         | Verifies `requireAuth` middleware — returns `req.user` or `401`     |

---

## 🏛 Express Middleware Pipeline Order

```text
CORS
  ↓
/api/auth  →  Better Auth (toNodeHandler)     ← Mounted BEFORE express.json() — needs raw body
  ↓
express.json({ limit: "1mb" })
  ↓
/api/health  →  Health Router
/api/auth-test  →  Test Auth Router
  ↓
notFoundMiddleware
  ↓
errorMiddleware
```

> **Why auth is before `express.json()`**: Better Auth uses the Web Fetch API internally via `toNodeHandler`. It reads the raw request body itself. If `express.json()` runs first, it consumes and parses the body stream — leaving nothing for Better Auth to read. Mounting auth first ensures the body stream is intact.

> **Origin fallback**: When `Origin` header is absent (e.g. Postman, curl, server-to-server), `authHandler` automatically injects `origin: http://localhost:5000` before delegating to `toNodeHandler`, preventing Better Auth's origin check from rejecting non-browser clients during development.
