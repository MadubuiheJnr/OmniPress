# OmniPress

A full-stack content platform for writers and readers, built as a production-grade engineering portfolio project. OmniPress demonstrates real-world problem solving across the full development lifecycle — from schema design and API architecture to client-side state management and deployment.

Live: [omnipress-wkrr.onrender.com](https://omnipress-wkrr.onrender.com)
API: [api-omnipress.onrender.com](https://api-omnipress.onrender.com)

---

## What this project is

OmniPress is a blogging and short-form video platform where users can write long-form articles, publish video reels, discover content by category, bookmark and react to posts, and follow other writers. The platform is designed to grow into a community-driven publishing tool with AI-assisted writing features.

The project exists to demonstrate that I can architect, build, and ship a system that solves a real problem at a production standard — not a tutorial clone, not a to-do app.

---

## Repository structure

This is a monorepo. The client and server are developed and deployed independently but share the same version history.

```
omnipress/
  client/     React frontend — Vite, TypeScript, TanStack Query, Zustand
  server/     Node.js backend — Express, TypeScript, MongoDB, DDD architecture
```

Each workspace has its own `package.json`, environment configuration, and deployment pipeline. See the README inside each folder for setup instructions and architecture details.

---

## Active branch

Development happens on the `sandbox` branch. The `main` branch is a snapshot of an earlier version and is no longer maintained. Pull requests and contributions should target `sandbox`.

---

## Tech stack overview

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, TypeScript, TailwindCSS, shadcn/ui |
| State | TanStack Query, Zustand |
| Rich text | TipTap |
| Backend | Node.js, Express 5, TypeScript |
| Database | MongoDB, Mongoose |
| Auth | JWT (access + refresh token rotation) |
| Media | ImageKit (direct client upload with signed auth) |
| Email | Nodemailer |
| AI | Google Gemini |
| Deployment | Render (both client and server) |

---

## Author

Daniel — Full-Stack Engineer
GitHub: [github.com/madjnriv](https://github.com/madjnriv)
LinkedIn: [linkedin.com/in/madjnriv](https://linkedin.com/in/madjnriv)
