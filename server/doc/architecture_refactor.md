# Layered Folder Architecture Refactor Documentation

## Objective
Refactor the SKILLEZO backend folder structure into a clean, modular layered architecture without altering any existing business logic, validation rules, error handling, or database schemas.

---

## 1. Refactored Folder Structure

```text
server/src/
├── core/                               # Core Infrastructure Layer
│   ├── config/
│   │   └── env.ts                      # Zod environment schema & export
│   ├── constants/
│   │   ├── enums.ts                    # Centralized domain & database enums
│   │   ├── error-codes.ts              # Machine-readable error codes
│   │   ├── http-status.ts              # Standard numeric HTTP statuses
│   │   └── index.ts                    # Central constants re-export
│   ├── middleware/
│   │   ├── error.middleware.ts         # Centralized Express error handler
│   │   ├── notFound.middleware.ts      # Catch-all 404 route handler
│   │   └── validate.middleware.ts     # Express Zod request validation pipeline
│   ├── types/
│   │   ├── api.types.ts                # Generic ApiSuccess & ApiError response contracts
│   │   └── pagination.types.ts         # PaginationParams & PaginatedResult interfaces
│   ├── utils/
│   │   ├── apiResponse.ts              # Standardized API response formatters
│   │   ├── AppError.ts                 # Custom operational error class
│   │   └── asyncHandler.ts             # Express async promise handler
│   ├── validators/
│   │   └── common.validators.ts        # objectIdSchema & paginationQuerySchema
│   └── index.ts                        # Central core barrel export
│
├── database/                           # Persistence Layer
│   ├── connection/
│   │   └── db.ts                       # Mongoose connection manager & health status
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
│       ├── base/
│       │   ├── BaseRepository.ts
│       │   ├── IRepository.ts
│       │   └── index.ts
│       ├── company/
│       ├── errors/
│       ├── profile/
│       ├── role/
│       ├── types/
│       ├── user/
│       └── index.ts                    # Barrel export for repositories
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
│   └── health.routes.ts                # Liveness (/api/health) & Readiness (/api/health/ready)
│
└── server.ts                           # Express Application Entrypoint
```

---

## 2. Directory Relocations & Import Path Mapping

| Original Location | New Refactored Location | Example Import Path Update |
| :--- | :--- | :--- |
| `src/config/` | `src/core/config/` | `@/config/env` ➔ `@/core/config/env` |
| `src/constants/` | `src/core/constants/` | `@/constants/enums` ➔ `@/core/constants/enums` |
| `src/middleware/` | `src/core/middleware/` | `@/middleware/error.middleware` ➔ `@/core/middleware/error.middleware` |
| `src/types/` | `src/core/types/` | `@/types/api.types` ➔ `@/core/types/api.types` |
| `src/utils/` | `src/core/utils/` | `@/utils/apiResponse` ➔ `@/core/utils/apiResponse` |
| `src/validators/` | `src/core/validators/` | `@/validators/common.validators` ➔ `@/core/validators/common.validators` |
| `src/lib/db.ts` | `src/database/connection/db.ts` | `@/lib/db` ➔ `@/database/connection/db` |
| `src/models/` | `src/database/models/` | `@/models` ➔ `@/database/models` |
| `src/repositories/` | `src/database/repositories/` | `@/repositories` ➔ `@/database/repositories` |

---

## 3. Verification & Compliance
- **TypeScript Type Check**: `npm run type-check` passed with **0 errors**.
- **Build Compilation**: `npm run build` compiled cleanly into `./dist/` using `tsc` and `tsc-alias`.
- **Health Endpoints**: `/api/health` and `/api/health/ready` remain fully functional.
- **Zero Business Logic Modification**: Pure structural refactoring only.
