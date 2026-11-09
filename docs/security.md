# Security plan

## Phase 1 controls

- No credentials or provider secrets are committed. The root `.env.example` contains placeholders; `.env` is ignored.
- The API validates required environment configuration at startup.
- Express uses Helmet, a configured CORS origin allowlist, a 1 MiB JSON limit, request IDs, consistent errors, and a baseline per-IP API rate limit.
- Prisma models define ownership foreign keys, role-permission joins, unique provider-event IDs, and audit-log storage.
- The development seed refuses to run outside `NODE_ENV=development` and never creates an administrator account.

## Required before real users or commerce

1. Implement authentication with Argon2id password hashing or a vetted external identity provider. Use secure, rotated refresh sessions and revoke sessions on account changes.
2. Enforce role, permission, and record ownership checks in Express middleware/service queries. A role-specific React route is not an access-control boundary.
3. Add schema-based validation, output minimization, CSRF defenses for cookie-authenticated mutations, login/OTP abuse controls, and structured security logging.
4. Verify Razorpay signatures and webhook signatures on the server. Persist event IDs before processing; handle duplicates idempotently. Never accept a frontend "paid" status.
5. Use transactions and concurrency-safe stock reservation, order splitting, coupon limits, refunds, commissions, and settlement processing.
6. Store KYC documents and product media in private/signed storage with MIME/size/content validation, access controls, retention limits, and malware scanning where supported.
7. Protect PII and bank details; store only provider tokens and minimal account metadata. Restrict staff access and audit sensitive reads and changes.
8. Configure production HTTPS, secret management, CORS allowlists, trusted proxy settings, database TLS, encrypted backups, restore drills, monitoring, and incident response.
9. Complete dependency, SAST/DAST, authorization matrix, webhook replay, account takeover, upload, and payment failure testing before launch.

The current browser-local storefront and dashboard are demos. They have no real authentication, authorization, privacy guarantees, payments, fulfillment, or persistent shared marketplace state and must not process real customer or seller data.
