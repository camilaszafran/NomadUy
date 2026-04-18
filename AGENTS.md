<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# NomadUY — Repo Overview

The actual Next.js application lives in `nomaduy/`. See `nomaduy/AGENTS.md` for the full project brief, design system, CSS architecture, and component structure.

**Quick orientation:**
- `nomaduy/app/` — Next.js App Router pages and layouts
- `nomaduy/components/` — React components, organized by page under `sections/`
- `nomaduy/app/styles/` — CSS split by scope (globals.css just imports these)
- `nomaduy/lib/` — Sanity, Supabase, Resend clients
- `nomaduy/schemas/` — Sanity content schemas
- `nomaduy/scripts/` — One-time data seed scripts (do not re-run blindly)
