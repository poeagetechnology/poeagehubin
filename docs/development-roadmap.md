# Poeage E-com implementation roadmap

This is the tracked implementation sequence. A phase is only complete after its tests and acceptance checks pass; roadmap modules are not claimed as implemented merely because the data model reserves their entities.

| Phase | Scope | Acceptance gate |
|---|---|---|
| 1. Foundation | Workspace/Vite migration, Express API bootstrap, Prisma/PostgreSQL schema, initial migration, local configuration, seed, architecture/API/security/deployment docs | Web production build, API tests, Prisma schema validation, generated migration reviewed |
| 2. UI systems | Brand design tokens and distinct customer, seller, admin, and delivery responsive shells | Responsive visual checks and route/component tests |
| 3. Identity | Registration, login, verification, session rotation/revocation, profiles, address book, RBAC | Auth and authorization tests; cross-role access denied |
| 4. Seller operations | KYC, bank verification workflow, approval, catalog CRUD, media, inventory, seller analytics/support | Seller isolation tests and inventory ownership tests |
| 5. Shopping | Search/filter, server cart, wishlist, coupons, checkout quote, atomic stock reservation, multi-seller order split | Integration tests for price/stock races, coupon limits, and rollback |
| 6. Payments/shipping | Razorpay verification/webhooks/refunds, commission and settlement ledger, Shiprocket, delivery assignment/tracking/POD | Signed webhook/idempotency tests and sandbox transaction/label tests |
| 7. Admin/analytics | Customer/seller/product/order review, payouts/refunds, promotions, CMS, roles, audit, reporting | Admin permission matrix and audit coverage |
| 8. Verification | Unit/API/e2e, security, accessibility, mobile, performance, backup/restore drills | Release test report with resolved critical/high findings |
| 9. Launch | Production services, domain/TLS, monitoring, alerting, backups, runbooks, staged rollout | Production readiness checklist signed off |

## Phase 1 task list

- [x] Preserve current React storefront while migrating CRA to a Vite web workspace.
- [x] Add an Express API workspace, startup configuration validation, API middleware, liveness/readiness routes, and tests.
- [x] Define normalized Prisma/PostgreSQL entities, relationships, indexes, and lifecycle enums.
- [x] Add development-only idempotent role/permission/category seed.
- [x] Document architecture, ER diagram, API roadmap, security, and deployment.
- [x] Add environment examples and local PostgreSQL Compose configuration.
- [ ] Apply the migration and verify readiness against a running PostgreSQL instance (environment prerequisite unavailable during this implementation).
