# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

never read .env

## Project status

Racket Point Nepal is an eCommerce app. Right now it is only a scaffold: Next.js 16 (App Router, `src/` dir), TypeScript, Tailwind v4, Better Auth, Drizzle ORM and Neon Postgres. No carts, orders, auth methods or auth tables exist yet; the only tables are the catalog (categories, products, stock). The UI is the homepage (`src/app/page.tsx`) and the product detail page (`src/app/products/[slug]/page.tsx`, statically generated for every sample product). `SiteHeader` and `SiteFooter` render in the root layout, so pages only provide `<main>`. Products and categories come from the database through `src/lib/catalog.ts` (server-only queries that map rows to the `Product`/`Collection` types in `src/lib/product.ts`; client components import types and helpers from `@/lib/product`, never `@/lib/catalog`). Both pages use `revalidate = 60` (ISR). Hero slides, brands, promo tiles and FAQs are static content in `src/lib/sample-catalog.ts`. All imagery is from Pexels (allowed via `images.remotePatterns` in `next.config.ts`), and navigation data in `src/lib/site-nav.ts` is shared by the header and footer. Links to collection, brand, cart, account and help routes point at pages that don't exist yet.

Design tokens live in `src/app/globals.css` (`@theme`): colors `ink`/`paper`/`stone`/`line`/`muted`/`court`/`sale` (sale prices and badges only), `font-display` (Cormorant Garamond) for headings and `font-sans` (Geist) for UI, plus custom utilities `shell` (page gutter + max width), `eyebrow` (small uppercase label) and `no-scrollbar`. The look is light-only, square-edged and editorial; reuse these tokens and `ButtonLink`/`TextLink` instead of ad-hoc values.

### Visual reference: badmintonhq.co.uk

Use badmintonhq.co.uk as a reference for shop structure, layout and density only. Never copy its text, images, logos, brand names, red accent (`#be163d`) or Onset font. Racket Point Nepal keeps its own tokens above (palette, Cormorant/Geist, square edges). Patterns to follow:

- **Header:** a thin utility row (account, help and returns links) sits above the main row (logo, search, account, cart). The primary nav groups products by category: rackets, shoes, shuttles, clothing, accessories, sale. Each category opens a mega menu grouped by type, player level and brand. Below `lg`, the nav collapses into a hamburger drawer and the logo is centered.
- **Homepage order:** hero carousel → brand tiles → category grid (3 columns on desktop, 2 below) → featured product rail with arrows → promo tiles (image with scrim, eyebrow, heading, button) → FAQ accordion → service/trust highlights → newsletter → footer.
- **Product cards:** the product photo carries the card. Use a square (1:1) image on white, padded so the product isn't cropped, with no card border or shadow. Below it go a short centered title, then the price. On sale items, the compare-at price is struck through and the sale price is emphasized. A sale or "% off" badge is pinned top-left over the image.
- **Grid density:** keep product grids tight, with near-zero column gaps (about 4px on desktop and 2px on mobile) and about 16px between rows. Use 4 columns on desktop and 2 on mobile; never use 1 column for products.
- **Width:** product grids and text sections cap at about 1200px. Only hero and promo imagery runs full-bleed.
- **Type roles:** product titles, prices, nav, filters and buttons use `font-sans`. Keep `font-display` for hero, promo and editorial headings.
- **Sale color:** sale prices and badges need one accent color. Use the `sale` token; don't hardcode a hex.
- **Footer:** link columns (customer care, categories, buying guides, contact), then a trust row (returns, price match, service), then payment icons and legal links.

Anything absolutely positioned (including `sr-only` text) inside a horizontal scroller must have a positioned ancestor inside the scroller, or it escapes the clipping and makes the whole page scroll sideways. This is why `ProductCard`'s root is `relative`.

Next.js 16 differs from older versions (see AGENTS.md above). Check `node_modules/next/dist/docs/` before using any Next.js API.

## Commands

Uses npm. There is no test runner configured yet.

```bash
npm run dev            # dev server (http://localhost:3000)
npm run build          # production build; requires DATABASE_URL to be set (see below)
npm run lint           # ESLint (flat config, eslint-config-next)
npm run typecheck      # tsc --noEmit

npm run auth:generate  # Better Auth CLI → writes auth tables to src/db/schema/auth.ts
npm run db:push        # push schema directly to the DB (dev)
npm run db:generate    # generate SQL migrations into drizzle/
npm run db:migrate     # apply migrations
npm run db:studio      # Drizzle Studio
npm run db:seed        # upsert sample categories, products and stock from src/db/seed-data.ts (idempotent)
```

## Environment

Copy `.env.example` to `.env.local`. `drizzle.config.ts` loads `.env.local` first, then `.env`, using dotenv. Next.js loads them itself.

- `DATABASE_URL`: Neon pooled connection string. `src/db/index.ts` throws at import time if it is missing. Any module that imports `@/db` (including the auth route) needs it at build time, so `next build` fails without it.
- `BETTER_AUTH_SECRET`: required, at least 32 random characters (`openssl rand -base64 32`), and different in every environment. `src/lib/auth.ts` throws at import time without it, so `next build` fails too. Never commit it, and never rely on Better Auth's built-in default secret.
- `BETTER_AUTH_URL`: read automatically by Better Auth.
- `NEXT_PUBLIC_APP_URL`: the public site URL, for absolute links only (metadata, emails, payment return URLs). The browser auth client does **not** use it: `createAuthClient()` in `src/lib/auth-client.ts` is created without `baseURL`, so it always calls the current origin (localhost in dev, the Vercel/beta domain when deployed). Never reintroduce a hard-coded or env-based `baseURL` there.
- Local `.env.local` keeps `http://localhost:3000` values. Preview (beta, `develop` branch) and Production (`main`) values live only in Vercel's Environment Variables, without quotes or trailing slashes. Changing a `NEXT_PUBLIC_` variable needs a redeploy because it is inlined at build time.
- Never hard-code URLs, keys or secrets in code; read them from `process.env`. Never prefix a secret with `NEXT_PUBLIC_`. `.env*` files (except `.env.example`) are never committed.

## Architecture

Request flow for auth: `authClient` (`src/lib/auth-client.ts`, `better-auth/react`) → catch-all route `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler`) → `auth` (`src/lib/auth.ts`) → `drizzleAdapter` → `db` (`src/db/index.ts`) → Neon.

- **DB client** (`src/db/index.ts`): Drizzle with the `neon-http` driver, which is stateless HTTP. `db.transaction()` throws with this driver; use `db.batch([...])` for atomic multi-statement writes, or switch to the `neon-serverless` (WebSocket) driver if you need interactive transactions. It is built with `schema` from `src/db/schema` so relational queries (`db.query.*`) are typed.
- **Schema** (`src/db/schema/`): drizzle-kit reads the whole folder, and `index.ts` must re-export every table file. Both the DB client and the Better Auth adapter import the schema through `index.ts`. For auth: run `npm run auth:generate`, then add `export * from "./auth"` to `index.ts`, then generate and migrate (see conventions below).
- **Auth** (`src/lib/auth.ts`): server-only. `nextCookies()` lets Server Actions set auth cookies and must stay the **last** item in `plugins`. On the server, get the session with `auth.api.getSession({ headers: await headers() })`. After adding plugins or auth options that change tables, re-run `auth:generate`.
- Path alias `@/*` → `src/*`.

### Database conventions

- **Scope:** the catalog is `categories` 1─< `products` 1─1 `product_stock` (`src/db/schema/catalog.ts`). Don't add carts, orders, payments, reviews, wishlists or product variants until asked.
- **Foreign keys:** `products.category_id` is `ON DELETE RESTRICT` (a category can't be deleted while it has products); `product_stock.product_id` is `ON DELETE CASCADE`.
- **Stock** lives in `product_stock` (keyed by `product_id`), never as a column on `products`. It is per product: the jsonb `option` (grip/shoe sizes) is display-only, not a variant with its own stock. `quantity` has a DB check `>= 0`, and a missing stock row reads as 0 (sold out).
- **Columns:** uuid primary keys (`defaultRandom()`); a unique `slug` is the public/URL key; `created_at`/`updated_at` as `timestamptz` (`updated_at` uses `$onUpdate`); a `sort_order` integer controls display order. Fixed value sets are `pgEnum`s (`sport`, `product_badge`), so adding a value needs a migration.
- **Prices** are integers in whole NPR, with DB checks `price > 0` and `compare_at_price` null or above `price`. Never use floats.
- **jsonb vs tables:** data that is always read whole and never filtered on (images, highlights, specs, option) is typed jsonb (`.$type<T>()`). Promote it to a child table only once it needs querying or its own rows.
- **Brand** is a plain text column on `products`. There is no brands table yet; the brand tiles stay static in `sample-catalog.ts`.
- **Access layer:** pages and components never query `@/db` directly. Server code calls `src/lib/catalog.ts` (`import "server-only"`), which maps rows to the UI types in `src/lib/product.ts`. Client components import only from `@/lib/product`. Wrap lookups shared by `generateMetadata` and the page in React `cache()`.
- **Field names differ between DB and UI:** `Product.collection` is the category's slug (`category_id` → `categories.slug`), `Product.category` is the type label (`products.product_type`), and `Collection.image` is `categories.image_url`. Keep the mapping in `toProduct`/`toCollection` in `catalog.ts`; don't rename the UI fields.
- **Migrations:** always `db:generate` → review the SQL → `db:migrate`, and commit `drizzle/`. Don't use `db:push` against shared/real data.
- **Seeding:** sample data lives in `src/db/seed-data.ts`. `src/db/seed.ts` must stay idempotent: upsert by slug and group writes with `db.batch` (neon-http has no transactions).
- **Freshness:** catalog pages use `export const revalidate = 60` (ISR), so `next build` queries the DB.

## Code organization (no repetition)

Every server-side request follows one path: **UI → Server Action or Route Handler → validate (Zod) → check session/role → domain module → `@/db`**.

- **Domain modules** follow the `catalog.ts` pattern: one server-only file per domain in `src/lib/` (`catalog.ts`, later `cart.ts`, `orders.ts`, `payments.ts`), starting with `import "server-only"`. They hold all business logic and all `@/db` queries for that domain.
- **Server Actions and Route Handlers stay thin** (about 20 lines): validate input, call a guard, call a domain module, return a result. No `@/db` queries in them.
- **Validation:** one Zod schema per input in `src/lib/validators/`, shared by the form and the server. Use `.strict()` objects, length limits and `z.coerce` for numbers from forms.
- **Auth checks** only through `requireUser()` / `requireAdmin()` in `src/lib/guards.ts` (server-only). Don't repeat `getSession` checks inline.
- **Money formatting** only through one helper in `src/lib/product.ts` (or a dedicated `src/lib/money.ts` if it grows). Prices stay whole NPR integers.
- Before writing a new helper, search `src/lib` for an existing one and extend it. If the same logic appears in two places, extract it.
- No speculative code: don't add options, abstractions, files or dependencies the current task doesn't need. Use plain names (`getProductBySlug`, `placeOrder`); no clever one-liners or comments that restate the code.
- Keep changes focused. Never reformat, restyle or refactor unrelated files, and never change design tokens, colors, fonts or layout rules above unless the task is explicitly about design.

Guard pattern (role check applies once the Better Auth admin plugin is added):

```ts
// src/lib/guards.ts
import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function requireUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("UNAUTHORIZED");
  return session.user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") throw new Error("FORBIDDEN");
  return user;
}
```

## Security rules (non-negotiable)

1. **Never trust the client.** Prices, totals, delivery fees, discounts and stock are always recalculated on the server from the database. Ignore any price or total sent from the browser.
2. **Authorize inside every Server Action and Route Handler**, not only in `proxy.ts`. Proxy/middleware is a convenience, not a security boundary. Admin operations call `requireAdmin()` first.
3. **Check ownership.** Users may only read or change their own cart, addresses and orders: filter by the `userId` from the session, never by an id from input.
4. **Validate every input** with Zod before it reaches a domain module, including route params, search params and webhook bodies.
5. **Stock changes are atomic.** Decrement with a conditional update (`quantity = quantity - n WHERE quantity >= n`) and treat zero affected rows as out of stock. Order creation plus stock decrement must be all-or-nothing: neon-http has no `db.transaction()`, so plan this before building checkout (`db.batch`, or switch the order path to the `neon-serverless` driver for interactive transactions).
6. **Payments (eSewa/Khalti) are verified server-to-server** before an order is marked paid. Never trust a success redirect alone. Check the paid amount equals the order total, and make verification idempotent (each transaction id processed once). Payment callback routes are excluded from the beta password gate but still verify everything.
7. **SQL:** use Drizzle's query builder or the `sql` tagged template. Never pass user input to `sql.raw()` or build SQL strings by concatenation.
8. **Errors:** show users a short, safe message; log details on the server. Never return stack traces, DB errors or internal ids to the client.
9. **Logging:** never log secrets, session tokens, passwords, OTPs or full payment responses with personal data.
10. **No `dangerouslySetInnerHTML`.** Render reviews, product descriptions and any user text as plain text.
11. **Uploads** (product images, once added) are admin-only, images only, size-limited, via signed uploads to the image host.
12. **Rate limits** on sign-in, sign-up, OTP and checkout (Better Auth's built-in rate limiting for auth routes).
13. **Dependencies:** don't add packages without a clear need; prefer well-maintained ones. Keep `npm audit` clean of high/critical issues.
14. `never read .env` applies to every `.env*` file except `.env.example`. If a value is needed, ask the user.

## Deployment and branches

- Hosted on Vercel from GitHub. `main` → Production; `develop` → Preview, shown to the team at the beta subdomain (password-gated via `BETA_PASSWORD` in `proxy.ts`, skipped when the variable is unset, with `X-Robots-Tag: noindex`).
- Workflow: `feature/*` → pull request into `develop` (beta) → pull request from `develop` into `main` (production). Never commit directly to `main`.
- Beta and production use separate Neon branches/databases. Never run `db:push` or destructive scripts against production data.

## Working in this repo

- One feature per branch and per pull request. Commit messages use conventional prefixes (`feat:`, `fix:`, `chore:`, `refactor:`).
- Plan first and wait for approval for anything touching auth, orders, payments, stock or the schema.
- Before saying a task is done: run `npm run lint` and `npm run typecheck` and fix all errors. Once a test runner exists, run the tests too.
- When cart/order/payment logic is added, set up Vitest and cover the main path plus failure cases (out of stock, wrong user, invalid input, tampered price).
- Run `/security-review` on branches that touch auth, orders or payments before merging.
