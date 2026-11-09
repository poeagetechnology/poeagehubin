# Local setup and deployment

## Prerequisites

- Node.js 20.19+ and npm.
- PostgreSQL 16 or newer. Docker Compose is optional for local database setup.
- A copy of the root `.env.example` saved as `.env`, with a development `DATABASE_URL`.

## Local development

1. Install dependencies: `npm install`.
2. Copy `.env.example` to `.env`; keep this file out of Git.
3. Start PostgreSQL locally. If Docker Compose is installed, `docker compose up -d postgres` starts an isolated development database. The example database password must be changed before exposing the database beyond localhost.
4. Create/apply the development migration: `npm run db:migrate`.
5. Generate Prisma Client: `npm run db:generate`.
6. Seed baseline roles, permissions, and categories: `npm run db:seed`.
7. Start the frontend: `npm run dev:web`.
8. In another terminal, start the API: `npm run dev:api`.
9. Check `GET http://localhost:4000/api/v1/health/live` and `/ready`.

The web app is configured to proxy `/api` to the local API in development. `VITE_API_BASE_URL` in `apps/web/.env` (copy `apps/web/.env.example`) is intended for future API integration; this phase does not yet connect the storefront to API routes. This is public configuration; never put secrets in `VITE_` variables.

## Deployment outline

- Build and deploy `apps/web` as a Vercel project with root directory `apps/web`. Set `VITE_API_BASE_URL` to the public API origin.
- Deploy `apps/api` as a Node service with a managed PostgreSQL database. Set secrets in the hosting provider's secret manager, `NODE_ENV=production`, `API_PORT`, `WEB_ORIGIN`, and `DATABASE_URL`.
- Run `npm run db:deploy` as a controlled release step before serving API traffic. Do not use `prisma migrate dev` in production.
- Configure the API CORS allowlist for the deployed web origin, TLS, a trusted proxy, request/error monitoring, encrypted database backups, and tested restore procedures.
- Provider credentials for Razorpay, Shiprocket, Cloudinary, email, SMS, and WhatsApp belong only in the backend secret store. Integrations are not enabled by Phase 1.
- Keep staging separate from production data and credentials. Use payment/shipping test accounts for integration testing.

## Current limitation

No PostgreSQL server or Docker executable was detected in the development environment. The schema and migration can be generated and validated here, but applying migrations and testing database readiness requires a running PostgreSQL instance.
