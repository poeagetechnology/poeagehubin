# Poeage E-com REST API

Base path: `/api/v1`. API responses use JSON. The Phase 1 server runs on port `4000`; configure the frontend base URL with `VITE_API_BASE_URL`.

## Implemented in Phase 1

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/health/live` | Process liveness; does not depend on PostgreSQL |
| `GET` | `/health/ready` | Readiness; performs a database `SELECT 1` |

Health responses include a request ID. API errors use `{ "error": { "code": "...", "message": "..." }, "requestId": "..." }`. Unimplemented `/api` paths return `404 ROUTE_NOT_FOUND`. JSON requests are capped at 1 MiB. API requests receive baseline Helmet headers, configured CORS, and a per-IP rate limit.

## Planned API modules

| Module | Planned endpoint examples | Access |
|---|---|---|
| Auth | `POST /auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`; `GET /auth/me` | Public or authenticated |
| Customer | `GET/PATCH /customers/me`; `GET/POST/PATCH/DELETE /customers/me/addresses` | Customer |
| Catalog | `GET /products`, `/products/:id`, `/categories`, `/search` | Public; admin for hidden listings |
| Cart | `GET /cart`; `POST /cart/items`; `PATCH/DELETE /cart/items/:id` | Cart owner |
| Wishlist | `GET /wishlist`; `POST/DELETE /wishlist/items` | Wishlist owner |
| Checkout | `POST /checkout/quote`, `POST /orders` | Customer |
| Orders | `GET /orders`, `/orders/:id`; cancel/return endpoints | Customer owns parent order; seller owns suborder |
| Seller onboarding | `POST /seller-applications`, `GET/PATCH /seller/profile`, document/bank verification routes | Applicant or seller; review admin |
| Seller catalog | `GET/POST /seller/products`, `PATCH/DELETE /seller/products/:id`, inventory routes | Approved seller, ownership checked |
| Seller operations | `GET /seller/orders`, `PATCH /seller/orders/:id/status`, sales/settlement reports | Seller owns suborder |
| Admin | Seller/product approval, refunds, commissions, settlements, promotions, settings, audit, roles | Super admin |
| Delivery | Partner application/profile, assigned shipments, pickup/status/proof routes | Delivery partner owns assignment |
| Payments | Razorpay order creation, signature verification, refunds and reconciliation | Authenticated API; server-side verification |
| Webhooks | Provider-specific signed Razorpay and Shiprocket event routes | Signature-verified provider request |
| CRM/support | Tickets, notes, assignment, replies and status changes | Customer, assigned support, relevant seller |

These are roadmap contracts, not implemented endpoints. No payment is considered captured from a browser response. Razorpay signatures/webhooks and provider event idempotency must be verified server-side.

## Conventions to preserve when implementing modules

- Validate path, query, and body inputs at the API boundary.
- Use cursor or bounded page pagination; never expose unrestricted record listings.
- Derive user, seller, and partner identity from the authenticated server session, not request-body IDs.
- Calculate prices, discounts, tax, shipping, commission, and payable amounts on the server.
- Use idempotency keys for checkout and payment operations.
- Return explicit `401`, `403`, `404`, `409`, `422`, and `429` errors without leaking stack traces or secrets.
