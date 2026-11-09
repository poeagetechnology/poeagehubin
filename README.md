# Poeage E-com

**Every Seller. Every Product. One Marketplace.**

Poeage E-com is being developed as a secure, India-focused, multi-vendor marketplace owned by Poeage Technology Private Limited. The repository is a phased work in progress: Phase 1 establishes the web/API workspaces, database foundation, and engineering documentation. Real authentication, payments, shipping, and shared marketplace operations are not yet implemented.

## Stack

- Web: React 19, Vite, Tailwind CSS, React Router, Lucide React, Framer Motion
- API: Node.js, Express, REST, Zod environment validation
- Data: PostgreSQL, Prisma ORM
- Planned integrations: backend-managed JWT sessions, Razorpay, Shiprocket, Cloudinary, email/SMS/WhatsApp

## Development setup

Requirements: Node.js 20+, npm, PostgreSQL 16+. Docker Compose is optional.

```sh
npm install
Copy-Item .env.example .env
```

Set `DATABASE_URL` in the root `.env`. To run local PostgreSQL with Docker, use `docker compose up -d postgres`. Then run:

```sh
npm run db:migrate
npm run db:generate
npm run db:seed
```

Start the web and API in separate terminals:

```sh
npm run dev:web
npm run dev:api
```

The web app is served at `http://localhost:5173`; the API listens on `http://localhost:4000`. API health endpoints are `GET /api/v1/health/live` and `GET /api/v1/health/ready`.

Useful checks:

```sh
npm run build
npm test
npx prisma validate
```

See [deployment setup](./docs/deployment.md) for environments, migrations, and hosting guidance.

## Project structure

```text
apps/
  web/                 React customer storefront and current dashboard prototype
  api/                 Express API and API tests
prisma/
  schema.prisma        PostgreSQL/Prisma domain model
  migrations/          Versioned schema migrations
  seed.js              Development-only roles, permissions, categories
docs/                  Architecture, ER diagram, API, security, roadmap, deployment
```

## Delivery status and important limitation

The existing storefront and management UI remain browser-local prototypes. Phase 1 adds a real API process and database design, but does not yet connect those screens to the API. Do not collect real customer/KYC data, accept orders, or represent payments or shipments as real. Authentication/RBAC, business APIs, payment verification, shipping integrations, and production operational controls must be implemented and tested before launch.

- [Architecture](./docs/architecture.md)
- [Database ER diagram and integrity notes](./docs/database-erd.md)
- [API endpoint plan](./docs/api.md)
- [Security requirements](./docs/security.md)
- [Testing and verification](./docs/testing.md)
- [Development roadmap and Phase 1 checklist](./docs/development-roadmap.md)
- [Deployment instructions](./docs/deployment.md)
