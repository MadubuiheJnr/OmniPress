# OmniPress — Client

The React frontend for OmniPress. Handles content discovery, article reading and creation, user authentication, and profile management.

Live: [omnipress-wkrr.onrender.com](https://omnipress-wkrr.onrender.com)

---

## Stack

- React 19 with TypeScript
- Vite
- TailwindCSS v4
- shadcn/ui component library
- TanStack Query for server state
- Zustand for client state (auth, UI)
- React Router v7
- TipTap for rich text editing
- Axios with interceptor-based token refresh
- Sonner for toast notifications
- React Hook Form with Zod validation

---

## Architecture

The client follows a feature-based folder structure. Each feature owns its components, hooks, services, schemas, types, and constants. Shared utilities and UI primitives live in `src/shared`. Infrastructure concerns (API client, environment config) live in `src/infrastructure`.

```
src/
  features/
    auth/
      components/       UI components scoped to auth
      hooks/            TanStack Query mutations and queries
      services/         HTTP calls — one file per feature
      schemas/          Zod validation schemas
      types/            TypeScript interfaces for API responses
      constants/        API endpoint strings, cache keys
  shared/
    components/         Reusable UI components (loaders, error states)
    store/              Zustand stores
    types/              Shared TypeScript interfaces
    lib/                Utility functions
  infrastructure/
    api/                Axios instance with interceptors
  layouts/              App and auth layout wrappers
  pages/                Route-level page components
  routes/               Router definition and route guard
```

---

## Auth flow

Authentication uses a dual-token strategy:

- Access token — short-lived, stored in Zustand memory, attached to requests via Axios request interceptor
- Refresh token — long-lived, stored in an httpOnly cookie, sent automatically by the browser

On every page load, the app silently calls `POST /v1/auth/refresh` to restore session state from the cookie. If the refresh succeeds, the user is considered authenticated and the access token is placed in memory. If it fails, the user is redirected to login. This eliminates auth flash and avoids localStorage token storage.

Concurrent requests that fail with 401 are queued during the refresh cycle and replayed once a new access token is issued.

---

## Local setup

```bash
cd client
cp .env.example .env
# fill in VITE_API_BASE_URL
npm install
npm run dev
```

---

## Environment variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API |

---

## Key conventions

- Services own all HTTP calls. Hooks wire services into TanStack Query lifecycle.
- Schemas (Zod) live in the feature and are shared between the form and the service type.
- Errors from the API follow RFC 7807 Problem Details format. The shared `getApiErrorToast` helper parses them consistently.
- All mutations use `retry: false` unless the operation is explicitly safe to retry.
- Route guard handles auth initialization and protects all app routes. Auth routes sit outside the guard.
