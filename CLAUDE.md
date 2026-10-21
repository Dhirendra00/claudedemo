# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

never read .env

## Project status

Racket Point Nepal is an eCommerce app. Right now it is only a scaffold: Next.js 16 (App Router, `src/` dir), TypeScript, Tailwind v4, Better Auth, Drizzle ORM and Neon Postgres. No ecommerce features, auth methods or tables exist yet. The UI is the homepage (`src/app/page.tsx`) and the product detail page (`src/app/products/[slug]/page.tsx`, statically generated for every sample product). `SiteHeader` and `SiteFooter` render in the root layout, so pages only provide `<main>`. Both pages are built from sample data in `src/lib/sample-catalog.ts` (fictional brands and products) with Pexels images (allowed via `images.remotePatterns` in `next.config.ts`), and from navigation data in `src/lib/site-nav.ts` shared by the header and footer. Links to collection, brand, cart, account and help routes point at pages that don't exist yet.

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
```

## Environment

Copy `.env.example` to `.env.local`. `drizzle.config.ts` loads `.env.local` first, then `.env`, using dotenv. Next.js loads them itself.

- `DATABASE_URL`: Neon pooled connection string. `src/db/index.ts` throws at import time if it is missing. Any module that imports `@/db` (including the auth route) needs it at build time, so `next build` fails without it.
- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`: read automatically by Better Auth.
- `NEXT_PUBLIC_APP_URL`: `baseURL` for the browser auth client.

## Architecture

Request flow for auth: `authClient` (`src/lib/auth-client.ts`, `better-auth/react`) → catch-all route `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler`) → `auth` (`src/lib/auth.ts`) → `drizzleAdapter` → `db` (`src/db/index.ts`) → Neon.

- **DB client** (`src/db/index.ts`): Drizzle with the `neon-http` driver, which is stateless HTTP. `db.transaction()` throws with this driver; use `db.batch([...])` for atomic multi-statement writes, or switch to the `neon-serverless` (WebSocket) driver if you need interactive transactions. It is built with `schema` from `src/db/schema` so relational queries (`db.query.*`) are typed.
- **Schema** (`src/db/schema/`): drizzle-kit reads the whole folder, and `index.ts` must re-export every table file. Both the DB client and the Better Auth adapter import the schema through `index.ts`. Currently empty: run `npm run auth:generate`, then add `export * from "./auth"` to `index.ts`, then push or migrate.
- **Auth** (`src/lib/auth.ts`): server-only. `nextCookies()` lets Server Actions set auth cookies and must stay the **last** item in `plugins`. On the server, get the session with `auth.api.getSession({ headers: await headers() })`. After adding plugins or auth options that change tables, re-run `auth:generate`.
- Path alias `@/*` → `src/*`.
