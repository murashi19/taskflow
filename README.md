# Assessment Frontend

Next.js 16 (App Router) + TypeScript strict frontend for the TaskFlow API.

## Setup

```sh
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL to your backend
npm run dev
```

Backend must be running (Hono/Bun + Prisma + PostgreSQL) and expose CORS for
`http://localhost:3000` (or whichever port `next dev` uses).

## Feature status

- ✅ **Feature 1 — Setup + Authentication**: register, login, logout,
  auto-refresh access token, protected `/dashboard` route, session restore
  on reload.
- ⏳ **Projects / Tasks**: not started — the backend only has Prisma models
  for `Project`/`Task`, no routes/controllers yet. Will be built once those
  endpoints exist.

## Architecture notes

- **Axios instance** (`src/lib/axios.ts`): attaches the access token from
  Zustand on every request; on a 401 it transparently refreshes the access
  token using the stored refresh token and retries the original request
  once. Concurrent 401s share a single in-flight refresh call. If refresh
  fails, the session is cleared and the user is redirected to `/login`.
- **Auth store** (`src/store/auth.store.ts`): access token lives in memory
  only (never persisted); refresh token + user are persisted to
  `localStorage` so a page reload can silently restore the session.
- **Services** (`src/services/`) are the only place API calls are made;
  components and hooks never call Axios directly.
- **React Query** owns server state (`useCurrentUser`, mutations); Zustand
  only owns client/auth state.
