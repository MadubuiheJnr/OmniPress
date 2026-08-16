# OmniPress — Server

The Node.js backend for OmniPress. Handles authentication, content management, media upload authorization, and email delivery.

API: [api-omnipress.onrender.com](https://api-omnipress.onrender.com)

---

## Stack

- Node.js with Express 5
- TypeScript (ESM, NodeNext module resolution)
- MongoDB with Mongoose
- Zod for request validation
- JSON Web Tokens (access + refresh token rotation)
- Nodemailer for transactional email
- ImageKit SDK for signed upload authorization
- Google Gemini for AI features
- sanitize-html for server-side HTML sanitization
- TipTap server-side HTML generation from JSON content

---

## Architecture

The server follows Domain-Driven Design (DDD). Each domain is a self-contained bounded context that owns its model, repository, service, controller, routes, DTOs, types, and errors. Domains communicate through a typed in-process event bus rather than direct imports. Infrastructure concerns (upload, email transport) live outside the domain layer.

```
src/
  domains/
    auth/               Credentials, sessions, token lifecycle
    user/               Profile, followers, article references
    article/            Posts and reels via Mongoose discriminators
    notification/       Event subscribers, email templates
  infrastructure/
    upload/             ImageKit signed auth endpoint
  shared/
    errors/             AppError base class, HTTP error subclasses (RFC 7807)
    utils/              JWT sign/verify, bcrypt, response builder, async handler
    events/             Typed EventEmitter event bus
    types/              Express Request augmentation (req.user)
  middlewares/
    auth.middleware.ts  Bearer token verification, req.user injection
    validate.middleware.ts  Zod body and query validation
    error.middleware.ts RFC 7807 error response formatting
  config/
    env.ts              Zod-validated environment variables — server refuses to start if missing
    db.ts               MongoDB connection with event listeners
    mailer.ts           Nodemailer transport
  container/
    app.container.ts    Composition root — all dependency wiring in one place
  app.ts                Express setup, middleware registration, route mounting
  server.ts             Process entry point, database connection, graceful shutdown
```

---

## Domain overview

**auth** — Registration (MongoDB transaction creates auth + user atomically), email verification with SHA256-hashed tokens, login with session tracking (IP, device, browser, per-session token hash), refresh token rotation with reuse detection, password reset flow.

**user** — User profile, follow/unfollow, article reference tracking.

**article** — Content platform supporting two content types via Mongoose discriminators: POST (TipTap rich text, stored as both JSON and sanitized HTML) and REEL (video URL with duration). Category resolution, slug generation, and reading time calculation happen server-side on creation.

**notification** — Event subscribers listening to domain events (auth.registered, auth.loggedIn). Each subscriber is independently responsible for sending the appropriate email. Email templates are pure functions returning HTML strings.

---

## Request lifecycle

```
HTTP Request
  Helmet (security headers)
  CORS
  Cookie parser
  Body parser
  Auth middleware (protected routes)
  Validate middleware (Zod DTO)
  Controller (HTTP in, response out)
  Use case (cross-domain orchestration)
  Service (business logic)
  Repository (database only)
  Error middleware (catches all thrown errors, formats as RFC 7807)
```

---

## Auth token strategy

Access tokens are short-lived JWTs (15 minutes) signed with HS256 and carry `userId`, `sessionId`, and `email`. Refresh tokens are opaque random hex strings prefixed with `sessionId` (format: `sessionId.randomHex`) stored as SHA256 hashes in the session record. Token reuse detection revokes the session immediately if a previously-issued refresh token is presented again.

---

## Local setup

```bash
cd server
cp .env.example .env
# fill in all required variables (see below)
npm install
npm run dev
```

---

## Environment variables

| Variable | Description |
|---|---|
| `HOST` | Server host (default: localhost) |
| `PORT` | Server port (default: 3000) |
| `NODE_ENV` | development, production, or test |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Access token signing secret |
| `JWT_REFRESH_SECRET` | Refresh token signing secret |
| `ACCESS_TOKEN_EXPIRY` | Access token expiry in seconds (e.g. 900) |
| `REFRESH_TOKEN_EXPIRY` | Refresh token expiry in seconds (e.g. 604800) |
| `CLIENT_URL` | Frontend origin for CORS |
| `EMAIL_FROM` | Sender address for outgoing email |
| `EMAIL_HOST` | SMTP host |
| `EMAIL_PORT` | SMTP port |
| `EMAIL_USER` | SMTP username |
| `EMAIL_PASS` | SMTP password |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |
| `GEMINI_API_KEY` | Google Gemini API key |

---

## Key conventions

- Repositories are the only layer that touches the database. Services call repositories, never models directly.
- DTOs use Zod discriminated unions where a single endpoint handles multiple content shapes.
- All domain errors extend `AppError` and are caught by the global error middleware which formats them as RFC 7807 Problem Details responses.
- The composition root (`app.container.ts`) is the only place dependencies are instantiated. Every class receives its dependencies through its constructor.
- Domains never import from each other directly. Cross-domain operations go through use cases or the event bus.
