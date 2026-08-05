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

Current implementation progress: **Phases 1 through 3 Completed**

- [x] **PHASE 1 — Backend Foundation**: Environment configuration (Zod validation), structure setup, TypeScript setup, base dependencies (`express`, `mongoose`, `zod`, `jsonwebtoken`, `bcryptjs`).
- [x] **PHASE 2 — MongoDB Connection + Core Infrastructure**: Mongoose connection manager with state management, graceful shutdown listeners (`SIGINT`/`SIGTERM`), CORS origin handling, liveness (`GET /api/health`), and database readiness (`GET /api/health/ready`) endpoints.
- [x] **PHASE 3 — Shared Backend Infrastructure**: Domain enums, machine-readable error codes (`ERROR_CODES`), numeric HTTP status (`HTTP_STATUS`), custom operational `AppError`, generic `apiResponse` contracts, `asyncHandler`, Zod `validate` request middleware, `objectIdSchema`, `paginationQuerySchema`, `notFoundMiddleware`, and central `errorMiddleware`.
- [ ] **PHASE 4 — Core Mongoose Models**: User, Role, Company.
- [ ] **PHASE 5 — Dependent Mongoose Models**: Profile, Resume, Competency, CareerPlan, CompanyMember, Job, Application.
- [ ] **PHASE 6 — Repository Infrastructure**
- [ ] **PHASE 7 — Authentication Module**

---

## 📂 Project Structure

```text
server/
├── .env                              # Local environment variables (git-ignored)
├── .env.example                      # Template environment variables
├── package.json                      # Build & runner scripts
├── tsconfig.json                     # TypeScript compiler configuration (@/* paths)
│
├── doc/                              # Architectural phase documentation
│   ├── phase1.md
│   ├── phase2.md
│   └── phase3.md
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
# Type checking
npm run type-check

# Production build
npm run build

# Start compiled production build
npm run start
```

---

## 🧪 Health & Readiness Endpoints

- **Liveness Check**: `GET http://localhost:5000/api/health`
  - Returns `200 OK` when process is running: `{ "success": true, "data": { "status": "ok" } }`
- **Readiness Check**: `GET http://localhost:5000/api/health/ready`
  - Returns `200 OK` when MongoDB is connected: `{ "success": true, "data": { "status": "ready", "database": "connected" } }`
  - Returns `503 Service Unavailable` when MongoDB is disconnected: `{ "success": false, "error": { "code": "SERVICE_NOT_READY", "message": "Database connection is not ready" } }`
