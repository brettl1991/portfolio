# Portfolio CMS

A modern personal portfolio built with Next.js, with a protected admin CMS to manage:
- Site content
- Projects
- Experience
- Media assets

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Supabase (auth + data + storage)
- Jest + Testing Library

## Features

- Public portfolio homepage with:
  - Hero
  - Projects grid
  - Experience timeline
  - About section
  - Contact CTA
- Admin CMS:
  - Dashboard
  - Site Content editor
  - Projects CRUD
  - Experience CRUD
  - Media library picker
- Auth-aware admin mode:
  - Full mode with Supabase auth/env configured
  - Fallback preview mode when env vars are missing

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Start dev server:

```bash
npm run dev
```

4. Open:
- Public site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

## Supabase Setup

SQL files are included in [`supabase/schema.sql`](supabase/schema.sql) and [`supabase/seed.sql`](supabase/seed.sql).

Apply schema first, then seed data in your Supabase project.

## Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint code
- `npm run test` - run unit tests
- `npm run test:watch` - run tests in watch mode
- `npm run test:coverage` - generate coverage report

## Project Structure

- `app/` - routes and layouts
- `components/public/` - public-facing sections
- `components/admin/` - CMS UI
- `lib/` - data, auth, helpers
- `hooks/` - client hooks
- `supabase/` - schema and seed SQL
- `__tests__/` - unit/component tests

## Notes

- When Supabase environment variables are not set, admin routes run in preview fallback mode.
- The project favicon is configured from `app/icon.svg`.
