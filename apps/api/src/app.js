import { randomUUID } from "node:crypto";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

export function createApp({ checkDatabase, allowedOrigins = ["http://localhost:5173"] } = {}) {
  const app = express();

  app.disable("x-powered-by");
  app.use((req, res, next) => {
    req.id = randomUUID();
    res.setHeader("X-Request-Id", req.id);
    next();
  });
  app.use(helmet());
  app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      const error = new Error("Origin is not allowed by CORS.");
      error.status = 403;
      error.code = "ORIGIN_NOT_ALLOWED";
      callback(error);
    },
    credentials: true,
  }));
  app.use("/api", rateLimit({
    windowMs: 60_000,
    limit: 120,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler(req, res) {
      res.status(429).json({
        error: { code: "TOO_MANY_REQUESTS", message: "Too many requests. Try again later." },
        requestId: req.id,
      });
    },
  }));
  app.use(express.json({ limit: "1mb", strict: true }));
  app.get("/api/v1/health/live", (req, res) => {
    res.json({
      status: "ok",
      service: "poeage-ecom-api",
      requestId: req.id,
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/api/v1/health/ready", async (req, res, next) => {
    if (typeof checkDatabase !== "function") {
      res.status(503).json({
        status: "not_ready",
        error: { code: "DATABASE_CHECK_UNAVAILABLE", message: "Database readiness check is not configured." },
        requestId: req.id,
      });
      return;
    }

    try {
      await checkDatabase();
      res.json({
        status: "ready",
        service: "poeage-ecom-api",
        dependencies: { database: "ok" },
        requestId: req.id,
      });
    } catch (error) {
      const readinessError = new Error("Database is unavailable.", { cause: error });
      readinessError.status = 503;
      readinessError.code = "DATABASE_UNAVAILABLE";
      next(readinessError);
    }
  });

  app.use("/api", (req, res) => {
    res.status(404).json({
      error: { code: "ROUTE_NOT_FOUND", message: "API route not found." },
      requestId: req.id,
    });
  });

  app.use((error, req, res, next) => {
    if (res.headersSent) {
      next(error);
      return;
    }

    const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 600
      ? error.status
      : 500;
    if (status >= 500) {
      console.error(JSON.stringify({
        level: "error",
        requestId: req.id,
        message: error.message,
        stack: error.stack,
      }));
    }
    res.status(status).json({
      error: {
        code: error.code || (status === 500 ? "INTERNAL_SERVER_ERROR" : "REQUEST_ERROR"),
        message: status === 500 ? "An unexpected error occurred." : error.message,
      },
      requestId: req.id,
    });
  });

  return app;
}
