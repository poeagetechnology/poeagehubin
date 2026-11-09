import { PrismaClient } from "@prisma/client";
import { createApp } from "./app.js";
import { allowedOrigins, env } from "./config/env.js";

const prisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});
const app = createApp({
  allowedOrigins,
  checkDatabase: () => prisma.$queryRaw`SELECT 1`,
});

const server = app.listen(env.API_PORT, () => {
  console.info(`Poeage E-com API listening on port ${env.API_PORT} (${env.NODE_ENV}).`);
});

let isShuttingDown = false;
const shutdown = (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.info(`Received ${signal}; shutting down API.`);
  server.close((error) => {
    if (error) {
      console.error("HTTP server shutdown failed.", error);
      process.exitCode = 1;
    }
    prisma.$disconnect()
      .then(() => process.exit())
      .catch((disconnectError) => {
        console.error("Database shutdown failed.", disconnectError);
        process.exitCode = 1;
        process.exit();
      });
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
