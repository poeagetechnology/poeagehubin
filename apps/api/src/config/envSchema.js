import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  WEB_ORIGIN: z.string()
    .default("http://localhost:5173")
    .transform((value) => value.split(",").map((origin) => origin.trim()).filter(Boolean))
    .pipe(z.array(z.string().url().refine((origin) => {
      try {
        const parsed = new URL(origin);
        return ["http:", "https:"].includes(parsed.protocol) && parsed.origin === origin;
      } catch {
        return false;
      }
    }, "Each web origin must be an HTTP(S) origin without a path.")).min(1)),
  DATABASE_URL: z.string().url().refine((connectionString) => {
    try {
      return ["postgres:", "postgresql:"].includes(new URL(connectionString).protocol);
    } catch {
      return false;
    }
  }, "DATABASE_URL must be a PostgreSQL connection URL."),
});
