<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# NomadUY — Full Codebase Brief

## Stack

- **Framework:** Next.js (App Router, `app/` directory) — server components by default, `'use client'` where needed
- **CMS:** Sanity (project: `ohjste83`, dataset: `production`) — studio at `/studio`
- **Animations:** Framer Motion — stagger cards, modal slide-up, nav drawer
- **Email:** Resend — API key in `.env.local`
- **Database:** Supabase — client in `lib/supabase.ts`
- **Fonts:** Inter (sans, body) + Newsreader (serif, headings) — loaded via `next/font` in `app/layout.tsx`
- **No CSS framework** — plain CSS split by feature in `app/styles/`

---

## File Structure

```
nomaduy/
├── app/
│   ├── layout.tsx                  # Root layout — loads fonts, imports globals.css
│   ├── page.tsx                    # Homepage
│   ├── globals.css                 # Only @imports — all real CSS is in app/styles/
│   ├── styles/
│   │   ├── tokens.css              # CSS custom properties + reset (load first)
│   │   ├── nav.css                 # Fixed nav + mobile drawer
│   │   ├── pages.css               # Shared inner page styles (.page-header, .main-wrap)
│   │   ├── hero.css                # Homepage hero only
│   │   ├── home.css                # All other homepage sections
│   │   ├── guias.css               # Guides index + article pages
│   │   ├── article.css             # Guide article body styles
│   │   ├── vivir.css               # Vivir en Uruguay page
│   │   ├── conocer.css             # Conocer Uruguay page (routes + modal)
│   │   ├── comunidad.css           # Comunidad page
│   │   ├── recursos.css            # Recursos page
│   │   └── footer.css              # Footer
│   ├── conocer-uruguay/page.tsx    # Server component — fetches rutas from Sanity
│   ├── vivir/page.tsx
│   ├── vivir/lugares/page.tsx
│   ├── guias/page.tsx
│   ├── guias/[slug]/page.tsx       # Dynamic guide article
│   ├── guias/primeras-48h/page.tsx
│   ├── comunidad/page.tsx
│   ├── recursos/page.tsx
│   ├── api/comunidad/unirse/route.ts  # Join form API (Resend + Supabase)
│   └── studio/[[...tool]]/page.tsx    # Sanity Studio embedded
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                 # Fixed nav with mobile drawer (framer-motion)
│   │   └── Footer.tsx
│   ├── sections/                   # One subfolder per page
│   │   ├── home/                   # Hero, FeaturedGuides, GuideCategories, PdfBanner, etc.
│   │   ├── guias/                  # GuiasGrid, GuiasHeader, PortableTextRenderer
│   │   ├── vivir/                  # PlaceCard, PlaceGridCard, PlaceMatcher
│   │   ├── conocer-uruguay/
│   │   │   ├── ConocerHero.tsx     # Static blue hero (uses shared .page-header-blue)
│   │   │   ├── RoutesSection.tsx   # 'use client' — duration filter tabs + card grid
│   │   │   └── RouteModal.tsx      # 'use client' — full route detail + carousel + links
│   │   ├── comunidad/              # JoinForm, EventsSection, GroupsSection, etc.
│   │   └── recursos/               # CostCalculator, RecursosHeader
│   └── ui/
│       ├── AnimateIn.tsx           # Reusable scroll-triggered fade-in wrapper
│       └── PageSubtitle.tsx        # Styled subtitle under hero h1
│
├── lib/
│   ├── sanity.ts                   # Sanity client + sanityFetch helper + all GROQ queries
│   ├── sanity-url.ts               # imageUrlBuilder helper
│   ├── supabase.ts                 # Supabase browser client
│   └── resend.ts                   # Resend email client
│
├── schemas/                        # Sanity content types
│   ├── index.ts                    # Exports all schema types
│   ├── guide.ts                    # Guide articles
│   ├── place.ts                    # Places directory
│   └── ruta.ts                     # Travel routes (conocer page)
│
├── scripts/                        # One-time data scripts — DO NOT re-run blindly
│   ├── seed-guides.mjs             # Initial guides seed
│   ├── seed-places.mjs             # Places seed
│   ├── seed-rutas.mjs              # Initial 8 rutas (idempotent — checks slug first)
│   └── update-rutas.mjs            # Enriched itineraries + 4 hidden gem routes
│       # Run with: node --env-file=.env.local scripts/<name>.mjs
│
├── types/
│   ├── index.ts                    # Ruta, ItineraryDay, RouteLink, RutaPhoto, Guide types
│   └── place.ts                    # Place type
│
└── sanity.config.ts                # Studio config (projectId: ohjste83, dataset: production)
```

---

## Design Tokens (`app/styles/tokens.css` — source of truth)

```css
--blue:       #1A4B8C
--blue-light: #2660A8
--blue-pale:  #E8F1FB
--gold:       #C8940F
--gold-light: #F5C842
--green:      #2E7D52
--green-pale: #EAF4EE
--surface:    #F0F5FB   /* light blue tint */
--sand:       #F0F5FB   /* alias for --surface */
--cream:      #FFFFFF   /* page background */
--ink:        #0D1F3C   /* dark navy */
--ink-60:     #4A6280   /* secondary text */
--ink-30:     #8BA4BE   /* muted */
--white:      #FFFFFF

--radius-sm: 6px  --radius-md: 12px  --radius-lg: 20px  --radius-xl: 32px
--ease-out: cubic-bezier(0.23, 1, 0.32, 1)
```

The root `CLAUDE.md` has older token values from the HTML prototype — `tokens.css` is the source of truth.

---

## CSS Rules

- `globals.css` is import-only — never put styles there directly
- New page = new file in `app/styles/` + `@import` in `globals.css`
- `tokens.css` must be imported first
- Typography: `h1/h2/h3` use `var(--font-newsreader), serif`; body uses `var(--font-inter), sans-serif`

---

## Shared Inner-Page Header Pattern

All inner pages reuse this — do NOT create custom hero CSS per page:

```tsx
<header className="page-header page-header-blue">
  <div className="page-header-inner">
    <div className="page-label">Label</div>
    <h1>Title</h1>
    <PageSubtitle>Subtitle</PageSubtitle>
  </div>
</header>
```

Defined in `pages.css`:
- `.page-header` — `margin-top: 68px` (clears nav), `padding: 60px 40px 52px`, white text
- `.page-header-blue` — `background: linear-gradient(135deg, var(--blue) 0%, #0f3a62 100%)`
- `.page-header-inner` — `max-width: 1100px; margin: 0 auto`
- `.main-wrap` — `max-width: 1100px; margin: 0 auto; padding: 52px 40px 80px`

---

## Sanity Patterns

**Client setup (`lib/sanity.ts`):**
- `useCdn: false` — CDN endpoint (`apicdn.sanity.io`) times out; do not change to `true`
- `sanityFetch<T>(query, params?, options?)` — wraps client.fetch with `next: { revalidate: 3600 }` by default

**GROQ image projection** (always do this — never return raw asset references):
```groq
"coverImage": coverImage { "url": asset->url, "alt": alt }
"photos": photos[] { "url": asset->url, "alt": alt }
```

**All GROQ queries live in `lib/sanity.ts`** — not inline in components or pages.

**Async server component pattern:**
```typescript
export default async function Page() {
  let items: Item[] = []
  try {
    items = await sanityFetch<Item[]>(myQuery)
  } catch {
    // Sanity unreachable — page renders with empty state, no crash
  }
  return <ClientComponent items={items} />
}
```

**Schemas:**
- `guide.ts` — title, slug, category, body (Portable Text), coverImage, excerpt, readTime
- `place.ts` — name, slug, category, description, address, website, links[]
- `ruta.ts` — title, slug, duration (enum: '1 día'/'Fin de semana'/'4–7 días'), distance, vibe, interestLabel, teaser, stops[], coverImage, photos[], itinerary[] ({day, content}), stayLinks[], doLinks[], eatLinks[] ({label, url})

---

## Nav (`components/layout/Nav.tsx`)

- Fixed, 68px height — all page content needs `margin-top: 68px` (via `.page-header` or `.main-wrap`)
- Framer-motion drawer: slides from right (`x: '100%'` → `x: 0`) at `max-width: 768px`
- Body overflow locked when open
- Links: Guías · Vivir · Conocer Uruguay · Recursos + "Unirme" CTA

---

## Known Issues & Required Fixes

### Mobile horizontal overflow
- `body { overflow-x: hidden }` alone is insufficient
- Framer-motion animating fixed elements from `x: '100%'` creates horizontal scroll in Safari
- **Fix (already in place):** `html { overflow-x: hidden }` in `tokens.css` — BOTH `html` AND `body` must have it; do not remove either

### Sanity CDN timeout
- `useCdn: false` is intentional — ISR caching at the Next.js level compensates
- Do not change to `true`

---

## Conocer Uruguay — Routes Feature

- 12 routes seeded: 8 main + 4 hidden gem interior routes
  - Hidden gems: Lavalleja/Villa Serrana/Grutas del Palacio, Quebrada de los Cuervos, Paysandú & Termas del Litoral, Ruta del Vino Canelones
- Duration filter only: `'Todos' | '1 día' | 'Fin de semana' | '4–7 días'` — no interest filter
- Card grid: 4-col desktop → 3-col tablet → horizontal scroll mobile (175px fixed card, `scroll-snap-type: x mandatory`)
- Modal: image carousel + day-by-day itinerary + links in 3 columns (stay/do/eat)

---

## Planned: i18n (Option A — Server-side DeepL + Static JSON)

**Status:** Not yet implemented. Waiting for DeepL API key from Cami.

**Plan:**
1. Install `next-intl`, restructure `app/` → `app/[locale]/` (`es` / `en` / `pt`)
2. Extract UI strings to `messages/es.json` (source of truth in Spanish)
3. Build `scripts/translate-all.mjs`:
   - Fetch all Sanity documents
   - Batch all text fields with `@@S@@` delimiter → one DeepL call per document per language
   - Output: `translations/en/rutas.json`, `translations/pt/rutas.json`, etc. (keyed by `_id`)
4. Server components pick translation by locale at render time — no Sanity schema changes
5. Finite values (duration, interestLabel) use static lookup tables — skip DeepL API
6. Language switcher added to Nav
7. Add `DEEPL_API_KEY` to `.env.local` before running
8. Budget: ~92k chars initial translation, ~5–15k chars/month ongoing (free tier: 500k/month)
