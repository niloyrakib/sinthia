# SINTHIA

Headless WordPress + Next.js platform for Instant Games, Online Tools, and an AI/Tech Blog. Built phase-by-phase from architecture through production hardening — see `docs/PHASES.md`-style history below or the build order at the bottom of this file.

## Tech stack

- **Frontend:** Next.js 14 (App Router, TypeScript strict), Tailwind CSS, Framer Motion, TanStack Query, React Hook Form + Zod, Axios
- **Backend:** WordPress (headless), WP REST API, ACF, custom post types (`games`, `tools`)
- **Deployment:** Vercel (frontend) + cPanel WordPress hosting (backend)

## One architectural note

The original spec called for Next.js 16+. As of this build there is no stable Next.js 16 release, so this project targets **Next.js 14 (App Router)**, which supports every required feature (Metadata API, Server Components, `next/font`, ISR). Bump `next` in `package.json` when 16 ships — nothing else in this architecture needs to change.

## Folder structure

```
sinthia/
├── app/                  # App Router routes, layouts, metadata, sitemap.ts, robots.ts
├── components/
│   ├── ui/               # Primitive, reusable UI (Button...)
│   ├── layout/           # Header, mega menu, mobile nav
│   └── shared/           # Cross-feature composites (cards, Breadcrumbs, JSON-LD, error/loading states)
├── features/             # Feature-based modules: games/, tools/, blog/, home/
├── hooks/                # Reusable React hooks (favorites, focus trap, fullscreen, debounce...)
├── services/             # Data-fetching services — WP-first with automatic mock fallback
├── lib/
│   ├── wp/                # WP REST client, raw types, mappers, fallback wrapper
│   ├── validations/        # Zod schemas
│   ├── fonts.ts, utils.ts, icon-map.ts, query-client.ts, query-keys.ts
├── types/                # Shared TypeScript types (content, api, theme, navigation)
├── constants/            # Design tokens, nav/category data, mock content
├── providers/            # QueryProvider, ToastProvider
└── middleware / vercel.json / next.config.js  # Security headers, CSP, redirects
```

## Setup

```bash
npm install
npm run prepare    # installs Husky git hooks
cp .env.example .env.local   # fill in WP details once a backend exists — safe to leave unset
npm run dev
```

Without `NEXT_PUBLIC_WP_API_URL` set, every page runs entirely on the built-in mock content — the whole site is fully functional with zero backend. Set that env var to a real WP REST endpoint and every service (`services/*.service.ts`) switches to real data automatically, with mock as an automatic fallback if a request ever fails. No component code changes required either way.

## Available scripts

| Script                            | Purpose                                          |
| --------------------------------- | ------------------------------------------------ |
| `npm run dev`                     | Local dev server                                 |
| `npm run build`                   | Production build                                 |
| `npm run analyze`                 | Production build with the bundle analyzer opened |
| `npm run lint` / `lint:fix`       | ESLint                                           |
| `npm run format` / `format:check` | Prettier                                         |
| `npm run type-check`              | `tsc --noEmit`                                   |

## Performance

- **Fonts:** Inter self-hosted via `next/font`, zero layout shift, no external request
- **Images:** `next/image` configured for the real WP media host (`next.config.js` `remotePatterns`); every current thumbnail is an `ImagePlaceholder` gradient tile that becomes the loading/error fallback once real images land in Phase 8's data
- **Code splitting:** automatic per-route via the App Router; the four Tools apps (`features/tools/apps/*`) are additionally split with `next/dynamic` so a Word Counter visitor never downloads the QR generator or canvas-based color picker
- **Data layer:** TanStack Query caches list requests (1 min stale time) and powers real "Load More" pagination instead of over-fetching
- **ISR:** game/tool/article detail pages revalidate at most once an hour (`export const revalidate = 3600`); the sitemap does the same
- **Bundle analysis:** `npm run analyze` (wired via `@next/bundle-analyzer` in `next.config.js`)
- **Vercel Speed Insights + Analytics** mounted in the root layout — real field data once deployed

## Accessibility

- Skip-to-content link (`components/shared/SkipToContent.tsx`), visually hidden until focused
- Every custom dialog (mobile menu, search overlay) traps Tab focus and restores it on close (`hooks/useFocusTrap.ts`) — a real WCAG 2.1 modal requirement, not just Escape-to-close
- Visible focus rings globally (`:focus-visible` in `globals.css`), never removed
- `prefers-reduced-motion` respected everywhere animation happens — count-ups, floating hero badges, page transitions all short-circuit to their final state
- Semantic landmarks, `aria-label`/`aria-current`/`aria-expanded`/`aria-pressed` on every icon-only or state-toggling control
- Color palette meets WCAG AA contrast for body text (`#111827` / `#6B7280` on `#FEFEFE`)

## Security

- **Headers** (`next.config.js`): `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security` (HSTS, 2yr + preload), and a real scoped **Content-Security-Policy** (only allows the WP media host, the QR code API, and Vercel's analytics endpoints — tighten further, e.g. add a nonce and drop `unsafe-inline`, once the final set of embeds is locked down)
- **Input validation:** Zod on every form (newsletter; comments form validates required fields client-side)
- **Env vars:** `.env.local` is git-ignored; nothing sensitive is ever read client-side beyond `NEXT_PUBLIC_*` values
- **Rate limiting:** intentionally _not_ faked here — there's no real backend in this repo to rate-limit yet. When WP goes live, put rate limiting at the WP REST layer (a plugin, or Cloudflare/Vercel Edge Config in front of it) rather than in the Next.js app, since the app has no server-side mutation endpoints of its own
- **Static export assets** are content-hashed and cached forever (`Cache-Control: immutable`) via `next.config.js`

## Deployment

### Frontend → Vercel

1. Push this repo to GitHub/GitLab/Bitbucket, import it in Vercel
2. Framework preset: Next.js (auto-detected; `vercel.json` pins the build/install commands explicitly)
3. Set environment variables in the Vercel project settings (see `.env.example`):
   - `NEXT_PUBLIC_WP_API_URL`
   - `NEXT_PUBLIC_WP_GRAPHQL_URL` (optional, if using WPGraphQL instead of REST)
   - `NEXT_PUBLIC_SITE_URL`
   - `REVALIDATE_SECRET` (for on-demand ISR revalidation webhooks from WP)
4. Deploy — Vercel handles HTTPS, CDN, and image optimization automatically

### Backend → WordPress on cPanel

1. Install WordPress on the cPanel host as usual
2. Install & activate: **ACF** (Advanced Custom Fields) with **ACF to REST API** so custom fields appear in REST responses, plus a CPT plugin (or custom `functions.php`) to register `games` and `tools` post types matching the shapes in `lib/wp/types.ts`
3. **Enable CORS** on the WP REST API so the Vercel-hosted frontend can fetch cross-origin — add the appropriate `Access-Control-Allow-Origin` headers for `NEXT_PUBLIC_SITE_URL` (via a small must-use plugin or `.htaccess`)
4. Register the custom `/sinthia/v1/search` and `/sinthia/v1/newsletter` endpoints referenced in `lib/wp/config.ts` (or point `search.service.ts`/`newsletter.service.ts` at existing endpoints/ESP instead)
5. Set up a webhook (WP `save_post` action → a Vercel deploy hook or `/api/revalidate?secret=...`) so publishing content refreshes the ISR cache without a full redeploy

### If a real WP backend isn't ready yet

Nothing blocks shipping the frontend — leave `NEXT_PUBLIC_WP_API_URL` unset in Vercel and the site runs entirely on mock content, fully functional, until the backend is ready to flip on.

## Production checklist

- [ ] Run `npm run build` locally and fix any type/lint errors (`npm run type-check`, `npm run lint`)
- [ ] Run Lighthouse (target 95+ on Performance/Accessibility/Best Practices/SEO — the architecture is built for this, but real images and a real backend will shift the numbers)
- [ ] Replace `ImagePlaceholder` usage with real `next/image` once WP media exists
- [ ] Verify `/sitemap.xml` and `/robots.txt` render correctly in production
- [ ] Submit the sitemap in Google Search Console + Bing Webmaster Tools; uncomment the `verification` block in `app/layout.tsx` once you have the codes
- [ ] Confirm CORS works end-to-end between the deployed frontend and WP backend
- [ ] Tighten the CSP in `next.config.js` once the final third-party embed list is locked
- [ ] Load-test the WP REST endpoints or put a cache (e.g. Cloudflare) in front of them — Next.js's ISR reduces load but doesn't eliminate origin traffic entirely
- [ ] Set up real error monitoring (Sentry or similar) — currently errors are caught by `error.tsx`/`global-error.tsx` and logged to the console only
- [ ] Decide on a real comment backend (WP native comments or a service like Disqus) — Phase 7's comments are intentionally browser-local (`localStorage`) as a placeholder

## Build history (phase by phase)

1. Architecture, design tokens, Tailwind/ESLint/Prettier/Husky setup
2. Header: mega menu, instant search overlay, mobile drawer + bottom nav
3. Homepage Hero, animated stats, illustration
4. Homepage sections: Popular Categories, Featured Games/Tools, Latest Blog, Trending, Newsletter
5. Games module: filters, categories, player (Fullscreen API), related games
6. Tools module: 4 genuinely functional tools (Word Counter, JSON Formatter, QR Generator, Color Palette Picker), favorites, recently used
7. Blog module: homepage, category/author pages, full article layout (ToC, reading progress, FAQ, comments, share)
8. WordPress integration: REST client, mappers, WP-first-with-mock-fallback services, TanStack Query pagination, loading/error states
9. SEO: canonical URLs (including a real inheritance bug fixed along the way), sitemap.xml, robots.txt, JSON-LD (Organization, VideoGame, SoftwareApplication, Article, FAQPage, BreadcrumbList)
10. Optimization: performance (dynamic imports, ISR, bundle analyzer, Speed Insights), accessibility (skip link, focus trap), security (CSP/HSTS/Permissions-Policy), deployment docs, production checklist
