# CLAUDE.md — NomadUY Project

## Working Principles
- Think before acting. Read existing files before writing code.
- Be concise in output but thorough in reasoning.
- Prefer editing over rewriting whole files.
- Do not re-read files you have already read unless the file may have changed.
- Test your code before declaring done.
- No sycophantic openers or closing fluff.
- Keep solutions simple and direct.
- User instructions always override this file.

---

## Project Overview

**Project:** NomadUY — a website to attract and support digital nomads, expats, and immigrants in Uruguay.
**Owner:** Cami (camilaszafran@gmail.com)
**Role:** UX/UI designer + tourism expert perspective.
**Core goal:** Be the most useful, warm, and community-driven resource for anyone making a life in Uruguay.

---

## Three Target Audiences

| Audience | Time horizon | Key need |
|---|---|---|
| Digital Nomads | ~3 months | Fast setup, coworking, community |
| Expats | Long-term, working | Residency, professional network |
| Low-budget Immigrants | Permanent | Bureaucracy help, affordable living, jobs |

**Onboarding flow:** "What brings you to Uruguay?" → persona selection → personalized content highlight + welcome email. All content remains accessible.

---

## Files in This Project

| File | Purpose |
|---|---|
| `homepage-mockup.html` | Main HTML prototype of the homepage |
| `content-ideas-uruguay-nomad-site.md` | Full content strategy and site map |
| `NomadUY-Content-Strategy.pdf` | PDF version of the content strategy |
| `web-designer/` | Design assets folder |

---

## Design System (from homepage-mockup.html)

**Fonts:** Fraunces (serif, headings) + Inter (sans-serif, body)

**Color tokens:**
```
--blue:       #1B4F8A   (primary brand)
--blue-light: #2E6FB4
--blue-pale:  #EBF2FB
--gold:       #D4922A   (accent)
--gold-light: #F5C97A
--green:      #2E7D52
--green-pale: #EAF4EE
--sand:       #F8F3EB
--cream:      #FDFAF5   (page background)
--ink:        #1A1A2E   (text)
--ink-60:     #5B5B7A   (secondary text)
--ink-30:     #ADADC4   (muted)
```

**Border radius:** `--radius-sm: 8px` / `--radius-md: 14px` / `--radius-lg: 24px` / `--radius-xl: 36px`

**Easing:** `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`

**Nav:** Fixed, 68px, frosted glass (`backdrop-filter: blur(14px)`), border-bottom subtle.

---

## Site Architecture

```
Home (warm welcome + community CTA)
├── Community (most important section)
│   ├── Join / Registration
│   ├── Events calendar
│   ├── Interest Groups
│   ├── Member Map
│   └── Forum / Q&A
├── Your Guide
│   ├── First Steps & Arrival
│   ├── Visas & Legal
│   ├── Neighborhoods
│   ├── Housing & Coliving
│   ├── Work & Coworking
│   ├── Cost of Living
│   ├── Health & Wellness
│   ├── Transportation
│   ├── Food & Restaurants
│   ├── Culture & Language
│   ├── Parks & Outdoors
│   ├── Hidden Gems
│   ├── Jobs & Income
│   └── Family Life
├── Directory (Places)
│   ├── Coworking Spaces
│   ├── Coliving & Housing
│   ├── Recommended Doctors
│   ├── Trusted Services
│   ├── Restaurants
│   └── Cafés to Work From
├── Resources & Tools
│   ├── Cost of living calculator
│   ├── Downloadable checklists
│   └── Government links
└── About
```

---

## Membership Model

**Free tier (launch with):** Registration, WhatsApp groups, welcome email + PDF guide, forum access, member directory opt-in, monthly newsletter.

**Premium tier (launch later):** Verified discounts on coworking, priority events access, legal/admin support, member-only groups, buddy match program.

---

## Key Community Features

- **Lead magnet:** Free PDF — "Your First 30 Days in Uruguay" (captures every email)
- **Recurring event:** Monthly meetup in Montevideo (first Thursday of the month, rotating venues)
- **Interest groups:** Sports (fútbol, running, yoga, padel), Social (language exchange, asado, tango), Professional (entrepreneurs, tech/startup, remote workers), Life (newcomers, families, immigrants, women)
- **Pre-arrival access:** People can join community before landing — access housing board, forum, WhatsApp groups
- **Community platforms:** WhatsApp (launch) → Newsletter → Instagram → Telegram → Slack (later)

---

## Competitive References

| Site | What to borrow |
|---|---|
| Milan Digital Nomads | Membership model, interest groups, verified discounts, legal support in plain English |
| Lisbon Digital Nomads | Weekly recurring event → 20k members. Consistency builds community. |
| Rio Digital Nomads | Verified coliving with tested internet speeds |
| InterNations | Places directory structure, activity groups, member profiles |
| Medellin Guru | Hyper-local depth, "local who loves the city" tone |
| NomadX | Slack-first, pre-arrival community access |
| Expatica | Complete expat resource structure (housing + visa + jobs + services) |

---

## Key Differentiators

1. Recurring in-person event (the #1 driver of community)
2. Interest groups (people join for the group, stay for the community)
3. Pre-arrival access (join before landing)
4. Verified places directory (tested, rated, kept current)
5. Free PDF lead magnet
6. Plain-language legal/bureaucracy support
7. Spanish + English from day one
8. Community-generated content (hidden gems, restaurant picks, housing board)
9. Uruguay-only depth (16+ sections vs competitors' 1–2 pages)

---

## Tone & Voice

- Warm, practical, community-first
- "This is a place, not just a website"
- Written like a local who loves the city (Medellin Guru model)
- Plain language, especially for legal/bureaucracy content
- Not a tourist site — for people building a life here

---

## Uruguay Content Highlights

**Neighborhoods (Montevideo):** Pocitos (expat hub), Palermo (artsy/young), Ciudad Vieja (historic), Parque Rodó (bohemian), Punta Carretas (upscale), Cordón (central/local), Carrasco (luxury/families)

**Beyond Montevideo:** Punta del Este, Colonia, Punta del Diablo, Cabo Polonio, Salto (thermal baths)

**Key selling points for nomads:** Territorial tax system (foreign income often untaxed), Digital Nomad Permit (~$10 USD), high safety relative to region, quality healthcare via mutualistas, strong expat community, fast fiber internet, USD-friendly economy.

*How to work*
- Think before acting. Read existing files before writing code.
- Be concise in output but thorough in reasoning.
- Prefer editing over rewriting whole files.
- Do not re-read files you have already read unless the file may have changed.
- Test your code before declaring done.
- No sycophantic openers or closing fluff.
- Keep solutions simple and direct.
- User instructions always override this file.
- Always ask before assuming
