POEAGE E-COM DEVELOPMENT SETUP

Requirements: Node.js 20+, npm, PostgreSQL 16+.

1. Run npm install from the repository root.
2. Copy .env.example to .env and set DATABASE_URL.
3. Start PostgreSQL. Docker users can run:
   docker compose up -d postgres
4. Run:
   npm run db:migrate
   npm run db:generate
   npm run db:seed
5. In separate terminals, run:
   npm run dev:web
   npm run dev:api
6. Open http://localhost:5173.

See README.md and docs/ for architecture, API plan, database design, security,
testing, roadmap and deployment.

The storefront and management flows currently remain browser-local prototypes.
Do not use them to accept real orders or process real personal/payment data.
