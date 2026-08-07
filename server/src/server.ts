import express, { Application, Request, Response } from "express";
import cors from "cors";
import healthRouter from "@/routes/health.routes";
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
app.use(express.json({ limit: "1mb" }));

// Routes
app.use("/api", healthRouter);

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
