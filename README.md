# OmniPress

This branch (`main`) contains an earlier version of OmniPress and is no longer actively maintained.

---

## Active development

All current work is happening on the `sandbox` branch. That branch reflects the production-grade rebuild of this project — new architecture, new patterns, new features. If you are here to review the codebase, that is the branch to look at.

Switch branches:

```bash
git checkout sandbox
```

Or view it directly on GitHub by selecting `sandbox` from the branch dropdown.

---

## What changed

The `sandbox` branch is not an incremental update to what is here. It is a deliberate, ground-up rebuild with different goals:

- Domain-Driven Design replacing the original MVC structure
- Full TypeScript across both client and server with strict mode
- Dual-token auth (access + refresh) with session tracking and reuse detection
- Feature-based folder structure on the frontend
- Direct client-to-CDN media uploads via signed ImageKit authentication
- TipTap rich text stored as both JSON and server-generated HTML
- Real-time email verification and notification delivery
- AI-assisted article writing via Google Gemini

The intent was to move from a project that demonstrates familiarity with tools to one that demonstrates production engineering judgment.

---

## Live links

Frontend: [omnipress-wkrr.onrender.com](https://omnipress-wkrr.onrender.com)
API: [api-omnipress.onrender.com](https://api-omnipress.onrender.com)

Both are deployed from `sandbox`.

---

## Author

Daniel — Full-Stack Engineer
GitHub: [github.com/madjnriv](https://github.com/madjnriv)
LinkedIn: [linkedin.com/in/madjnriv](https://linkedin.com/in/madjnriv)
