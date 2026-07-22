# Sinthia — Phase 1

Homepage + architecture scaffold for the games/tools/blog platform, built with
Next.js App Router, TypeScript, Tailwind, and Firebase.

## Run it locally

```bash
npm install
cp .env.local.example .env.local   # fill in your Firebase web app config
npm run dev
```

Open http://localhost:3000.

## What's included (Phase 1)

- Homepage matching the reference design: sticky header, gradient hero with
  floating visual tiles, Popular Games / Useful Tools / Latest Blog Posts grid,
  benefits strip.
- `lib/types.ts` — typed Firestore models for `posts`, `games`, `tools`,
  `categories`, `tags`, `users`, `media`, `settings`.
- `lib/firebase.ts` — client SDK init (Auth, Firestore, Storage), reads config
  from env vars so no secrets are committed.
- `lib/demo-data.ts` — placeholder data shaped exactly like the Firestore
  models. Components read from here now; swapping to real Firestore queries
  later won't require touching component code.
- `firestore.rules` — starter security rules (public read for published
  content, admin/editor-only writes) — deploy with `firebase deploy --only firestore:rules`.
- Reusable components: `Header`, `Logo`, `HeroSection`, `SectionHeader`,
  `GameCard`, `ToolCard`, `BlogPostItem`, `CategoryBadge`, `BenefitsSection`,
  `Footer`.

## Deploying

This needs a Node runtime — **Vercel** (free tier, zero-config for Next.js) is
the easiest path. Your current cPanel shared hosting works for static
sites/PHP but won't run Next.js server components/API routes.

## Roadmap

**Phase 2 — Public content**
- `/games`, `/games/[slug]`, `/tools`, `/tools/[slug]`, `/blog`, `/blog/[slug]`,
  `/category/[slug]`, `/search`, `/about`, `/contact`
- `lib/queries.ts` — real Firestore reads (pagination, filtering) replacing
  `demo-data.ts`
- Dynamic metadata, sitemap.xml, robots.txt, Article/FAQ/VideoGame/
  SoftwareApplication JSON-LD, breadcrumbs

**Phase 3 — Admin CMS**
- Firebase Auth (email/password + optional Google), role-based access
  (`admin`/`editor`/`author`/`viewer`) enforced by `firestore.rules` and a
  server-side auth check in `/admin/layout.tsx`
- `/admin` dashboard, `/admin/posts(+new/[id]/edit)`, `/admin/games(...)`,
  `/admin/tools(...)`, `/admin/categories`, `/admin/tags`, `/admin/media`
  (Storage uploader), `/admin/users`, `/admin/settings`
- `DataTable`, `MediaUploader`, `SEOFields`, `ContentEditor` shared components
- Draft/scheduled/published workflow, bulk actions, toasts, confirmations

## Phase 2 — done

- **Routes**: `/games`, `/games/[slug]`, `/tools`, `/tools/[slug]`, `/blog`,
  `/blog/[slug]`, `/category/[slug]`, `/search`, `/about`, `/contact`
- **`lib/queries.ts`** — real Firestore reads: published-only filtering,
  category filtering, related content, and a lightweight cross-collection
  search (`searchAll`). Swap for Algolia/Typesense later if the catalog gets
  large — Firestore has no native full-text search.
- **SEO**: per-page `generateMetadata`, canonical URLs, `app/sitemap.ts`
  (queries Firestore directly, falls back to static routes if env vars
  aren't set yet), `app/robots.ts`, Article/FAQPage/VideoGame/
  SoftwareApplication JSON-LD via `components/JsonLd.tsx`, `Breadcrumbs`
  everywhere.
- **Seeding**: `scripts/seed-data.ts` has full sample records for every
  collection; `scripts/seed.ts` pushes them via `firebase-admin` (upserts by
  slug, safe to re-run). See setup steps in that file's header comment —
  you'll need a service account key and `npm run seed`.
- **Contact form**: writes to a `messages` collection directly from the
  client; `firestore.rules` allows public `create`, admin-only `read`.

### Known simplification
Listing pages fetch one page (12 items) server-side with category filtering;
there's no "load more"/cursor pagination UI yet — add it in `lib/queries.ts`
(the `cursor` param is already wired) whenever a category exceeds 12 items.

## Phase 3 — next

- Firebase Auth (email/password + optional Google), role-based access
  (`admin`/`editor`/`author`/`viewer`) enforced by `firestore.rules` (already
  scaffolded) and a server-side check in `/admin/layout.tsx`
- `/admin` dashboard, `/admin/posts(+new/[id]/edit)`, `/admin/games(...)`,
  `/admin/tools(...)`, `/admin/categories`, `/admin/tags`, `/admin/media`
  (Storage uploader), `/admin/users`, `/admin/settings`
- `DataTable`, `MediaUploader`, `SEOFields`, `ContentEditor` shared components
- Draft/scheduled/published workflow, bulk actions, toasts, confirmations

## Phase 3 — done

- **Auth**: Firebase Auth email/password sign-in at `/admin/login`. No public
  sign-up — create accounts in the Firebase console, then add a matching
  `users/{uid}` doc (via `/admin/users`) to grant a role.
- **RBAC**: roles are `admin` / `editor` / `author` / `viewer`. The real
  enforcement is in `firestore.rules` (already updated — admin/editor/author
  can write posts/games/tools/tags/media, only admin can touch
  categories/users/settings). `app/admin/layout.tsx` adds a client-side gate
  for UX (redirects signed-out or under-privileged users to `/admin/login`)
  — Firestore rules are what actually protect the data, since this is a
  client-rendered gate, not a server session check.
- **`lib/admin-queries.ts`** — full-status CRUD for posts/games/tools plus
  categories/tags/media/users/settings, with bulk publish/draft/delete via
  `writeBatch`.
- **Admin routes**: `/admin` (dashboard with counts), `/admin/posts`
  (+ `new` / `[id]/edit`), `/admin/games` (+...), `/admin/tools` (+...),
  `/admin/categories`, `/admin/tags`, `/admin/media`, `/admin/users`,
  `/admin/settings` — all with search, pagination, bulk actions, confirm
  dialogs, and toast notifications (`components/admin/*`).
- **`MediaUploader`** — uploads to Firebase Storage (`storage.rules` added,
  10MB/image-only) and logs each upload to the `media` collection.
- **`ContentEditor`** — lightweight write/preview Markdown editor (no
  external rich-text dependency, kept intentionally simple — swap for
  Tiptap/Lexical if you want full WYSIWYG later).

### Setup checklist for Phase 3
1. Enable **Email/Password** sign-in in Firebase Auth.
2. Create your own user in Firebase Auth (console or `firebase auth:import`).
3. Deploy rules: `firebase deploy --only firestore:rules,storage:rules`.
4. Run `npm run seed` (see `scripts/seed.ts`) to populate demo content.
5. Sign in at `/admin/login`, then add yourself in `/admin/users` with your
   Auth UID and role `admin` — **do this via the Firebase console directly
   for your very first admin**, since `/admin/users` itself requires the
   `admin` role to write.

### Known simplifications (flagging honestly)
- Admin route protection is client-side only; add a server-side session
  cookie check (via `firebase-admin` in an API route/middleware) before
  treating this as a hard security boundary — Firestore rules are your real
  backstop today.
- `ContentEditor` is plain Markdown, not WYSIWYG.
- No image cropping/resizing on upload — files go to Storage as-is.
- Play/usage counters (`playCount`, `usageCount`) aren't auto-incremented
  from the public site yet — wire that up in the game/tool detail pages
  with an `updateDoc` + `increment()` call when you're ready.

This closes out the three phases from the original brief. Let me know if
you'd like the counter wiring, a richer editor, server-side auth, or help
getting this deployed to Vercel with your Firebase project connected.
