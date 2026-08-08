import express, { Application, Request, Response } from "express";
import cors from "cors";
import { authHandler } from "@/core/auth";
import healthRouter from "@/routes/health.routes";
import testAuthRouter from "@/routes/testAuth.routes";
import { notFoundMiddleware } from "@/core/middleware/notFound.middleware";
import { errorMiddleware } from "@/core/middleware/error.middleware";
import { env } from "@/core/config/env";
import { connectDatabase, disconnectDatabase } from "@/database/connection/db";
import { Server } from "http";

const app: Application = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

// Better Auth handler mounted BEFORE express.json() for raw body access
app.all("/api/auth/*path", (req, res) => {
  authHandler(req, res);
});

app.use(express.json({ limit: "1mb" }));

// Routes
app.use("/api", healthRouter);
app.use("/api", testAuthRouter);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "🚀 Welcome to SKILLEZO AI API",
  });
});

// Middleware pipeline order: Not Found -> Global Error
app.use(notFoundMiddleware);
app.use(errorMiddleware);

let server: Server;

async function bootstrap() {
  try {
    await connectDatabase();

    const PORT = parseInt(env.PORT, 10) || 5000;
    server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Bootstrap failed";
    console.error(`[Server] Startup aborted: ${message}`);
    process.exit(1);
  }
}

async function gracefulShutdown(signal: string) {
  console.log(`[Server] Received ${signal}. Starting graceful shutdown...`);

  if (server) {
    server.close(async () => {
      console.log("[Server] HTTP server closed.");
      await disconnectDatabase();
      console.log("[Server] Graceful shutdown complete.");
      process.exit(0);
    });
  } else {
    await disconnectDatabase();
    process.exit(0);
  }
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

if (process.env.NODE_ENV !== "test") {
  bootstrap();
}

export default app;
