# Poeage E-com testing

## Phase 1 automated checks

Run from the repository root:

```sh
npm test
npm run build
npx prisma validate
npx prisma generate
npm audit
```

The API tests cover liveness, readiness success/failure, request IDs, missing routes, rejected CORS origins, and origin configuration validation. API tests inject the database health check so they do not require a live PostgreSQL server.

The web production build checks the migrated React/Vite application and Tailwind output. Automated browser/e2e coverage is planned for later UI and shopping phases.

## Database checks

With local PostgreSQL available and `.env` configured:

```sh
npm run db:migrate
npm run db:generate
npm run db:seed
npm run dev:api
```

Verify `/api/v1/health/ready` returns `200` with `dependencies.database = "ok"`. Without PostgreSQL, the readiness route must return `503`; liveness remains `200`.

The initial migration was generated from the validated Prisma schema. Applying it, validating constraints against a live server, exercising seed idempotency, and testing database readiness require PostgreSQL and could not be run in the current environment.

## Commerce testing required before launch

- Role/ownership matrix tests for every customer, seller, delivery, support, and admin endpoint.
- Concurrency and rollback tests for stock reservations, multi-seller checkout, coupon limits, commission, refunds, and settlements.
- Razorpay test-mode signature/webhook verification, replay/idempotency, failed payment, partial refund, and reconciliation tests.
- Shiprocket sandbox shipment, cancellation, tracking-webhook, and delivery-failure tests.
- KYC and image upload type/size/content validation tests.
- End-to-end customer/seller/delivery/admin journeys, including mobile responsive checks.
- Accessibility, performance, backup/restore, dependency, and security testing.
