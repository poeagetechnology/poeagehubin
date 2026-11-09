import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import { createApp } from "../src/app.js";
import { envSchema } from "../src/config/envSchema.js";

test("liveness endpoint returns service status and a request id", async () => {
  const app = createApp();
  const response = await request(app).get("/api/v1/health/live");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
  assert.equal(response.body.service, "poeage-ecom-api");
  assert.equal(response.headers["x-request-id"], response.body.requestId);
});

test("readiness endpoint confirms the database check", async () => {
  const app = createApp({ checkDatabase: async () => true });
  const response = await request(app).get("/api/v1/health/ready");

  assert.equal(response.status, 200);
  assert.equal(response.body.dependencies.database, "ok");
});

test("readiness endpoint surfaces database unavailability", async () => {
  const app = createApp({
    checkDatabase: async () => {
      throw new Error("database unavailable");
    },
  });
  const response = await request(app).get("/api/v1/health/ready");

  assert.equal(response.status, 503);
  assert.equal(response.body.error.code, "DATABASE_UNAVAILABLE");
  assert.equal(response.body.error.message, "Database is unavailable.");
  assert.equal(response.body.requestId, response.headers["x-request-id"]);
});

test("API routes not implemented yet return a consistent 404", async () => {
  const app = createApp();
  const response = await request(app).get("/api/v1/not-implemented");

  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "ROUTE_NOT_FOUND");
});

test("CORS rejects origins outside the configured allowlist", async () => {
  const app = createApp({
    allowedOrigins: ["https://shop.example.test"],
  });
  const response = await request(app)
    .get("/api/v1/health/live")
    .set("Origin", "https://untrusted.example.test");

  assert.equal(response.status, 403);
  assert.equal(response.body.error.code, "ORIGIN_NOT_ALLOWED");
});

test("configuration accepts multiple validated frontend origins", () => {
  const result = envSchema.safeParse({
    NODE_ENV: "test",
    API_PORT: "4000",
    WEB_ORIGIN: "https://shop.example.test,https://admin.example.test",
    DATABASE_URL: "postgresql://user:password@localhost:5432/poeage_ecom",
  });

  assert.equal(result.success, true);
  assert.deepEqual(result.data.WEB_ORIGIN, [
    "https://shop.example.test",
    "https://admin.example.test",
  ]);
});

test("configuration rejects invalid frontend origins", () => {
  const result = envSchema.safeParse({
    NODE_ENV: "test",
    WEB_ORIGIN: "https://shop.example.test,not-an-origin",
    DATABASE_URL: "postgresql://user:password@localhost:5432/poeage_ecom",
  });

  assert.equal(result.success, false);
});

test("configuration requires a PostgreSQL connection URL", () => {
  const result = envSchema.safeParse({
    NODE_ENV: "test",
    WEB_ORIGIN: "https://shop.example.test",
    DATABASE_URL: "https://example.test/not-a-database",
  });

  assert.equal(result.success, false);
});
