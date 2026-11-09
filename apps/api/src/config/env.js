import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { envSchema } from "./envSchema.js";

const rootEnvPath = fileURLToPath(new URL("../../../../.env", import.meta.url));
dotenv.config({ path: rootEnvPath });

export const env = envSchema.parse(process.env);
export const allowedOrigins = env.WEB_ORIGIN;
