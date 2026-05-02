/**
 * Translates Sanity content (rutas, guides, places) via DeepL and patches
 * documents directly in Sanity. Runs as part of the Vercel build.
 *
 * Run with: node --env-file=.env.local scripts/translate-sanity.mjs
 * Requires: DEEPL_API_KEY, SANITY_API_TOKEN (write token), SANITY_PROJECT_ID, SANITY_DATASET
 */

import { createClient } from '@sanity/client'

const DEEPL_KEY = process.env.DEEPL_API_KEY
const SANITY_TOKEN = process.env.SANITY_API_TOKEN

if (!DEEPL_KEY) { console.error('Missing DEEPL_API_KEY'); process.exit(1) }
if (!SANITY_TOKEN) { console.error('Missing SANITY_API_TOKEN'); process.exit(1) }

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'ohjste83',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
})

const TARGETS = [
  { locale: 'en', deeplLang: 'EN-US' },
  { locale: 'pt', deeplLang: 'PT-BR' },
]

const DURATION_MAP = {
  en: { '1 día': '1 day', 'Fin de semana': 'Weekend', '4–7 días': '4–7 days' },
  pt: { '1 día': '1 dia', 'Fin de semana': 'Fim de semana', '4–7 días': '4–7 dias' },
}

async function deeplTranslate(texts, targetLang) {
  const authKey = DEEPL_KEY.startsWith('DeepL-Auth-Key ')
    ? DEEPL_KEY
    : `DeepL-Auth-Key ${DEEPL_KEY}`

  const body = new URLSearchParams()
  body.append('target_lang', targetLang)
  body.append('preserve_formatting', '1')
  texts.forEach(t => body.append('text', t))

  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: { Authorization: authKey },
    body,
  })
  if (!res.ok) throw new Error(`DeepL ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.translations.map(t => t.text)
}

async function translateChunked(texts, targetLang) {
  const CHUNK = 50
  const results = []
  for (let i = 0; i < texts.length; i += CHUNK) {
    const chunk = texts.slice(i, i + CHUNK)
    const translated = await deeplTranslate(chunk, targetLang)
    results.push(...translated)
    process.stdout.write(`  ${Math.min(i + CHUNK, texts.length)}/${texts.length}\r`)
  }
  console.log()
  return results
}

async function translateRutas(locale, deeplLang) {
  const rutas = await sanity.fetch(`*[_type == "ruta"]{
    _id, title, teaser, vibe, interestLabel, duration,
    stops,
    "itinerary": itinerary[]{ _key, day, content },
    "stayLinks": stayLinks[]{ _key, label, url },
    "doLinks": doLinks[]{ _key, label, url },
    "eatLinks": eatLinks[]{ _key, label, url }
  }`)

  if (!rutas.length) { console.log('No rutas found.'); return }
  console.log(`\nTranslating ${rutas.length} rutas to ${deeplLang}...`)

  const entries = []
  rutas.forEach((r, ri) => {
    entries.push({ idx: ri, field: 'title', value: r.title })
    if (r.teaser) entries.push({ idx: ri, field: 'teaser', value: r.teaser })
    if (r.vibe) entries.push({ idx: ri, field: 'vibe', value: r.vibe })
    if (r.interestLabel) entries.push({ idx: ri, field: 'interestLabel', value: r.interestLabel })
    if (r.stops) r.stops.forEach((s, si) =>
      entries.push({ idx: ri, field: 'stops', sub: si, value: s })
    )
    if (r.itinerary) r.itinerary.forEach((day, si) => {
      if (day.day) entries.push({ idx: ri, field: 'itinerary_day', sub: si, value: day.day })
      if (day.content) entries.push({ idx: ri, field: 'itinerary_content', sub: si, value: day.content })
    })
    ;['stayLinks', 'doLinks', 'eatLinks'].forEach(linkField => {
      if (r[linkField]) r[linkField].forEach((link, si) => {
        if (link.label) entries.push({ idx: ri, field: `${linkField}_label`, sub: si, value: link.label })
      })
    })
  })

  const translated = await translateChunked(entries.map(e => e.value), deeplLang)

  // Build patch data per ruta
  const patches = rutas.map((r, ri) => ({
    [`duration_${locale}`]: DURATION_MAP[locale][r.duration] || r.duration,
    [`stops_${locale}`]: r.stops ? [...r.stops] : [],
    [`itinerary_${locale}`]: r.itinerary
      ? r.itinerary.map(d => ({ _key: d._key, day: d.day || '', content: d.content || '' }))
      : [],
    [`stayLinks_${locale}`]: r.stayLinks
      ? r.stayLinks.map(l => ({ _key: l._key, label: l.label || '', url: l.url || '' }))
      : [],
    [`doLinks_${locale}`]: r.doLinks
      ? r.doLinks.map(l => ({ _key: l._key, label: l.label || '', url: l.url || '' }))
      : [],
    [`eatLinks_${locale}`]: r.eatLinks
      ? r.eatLinks.map(l => ({ _key: l._key, label: l.label || '', url: l.url || '' }))
      : [],
  }))

  entries.forEach((entry, i) => {
    const { idx, field, sub } = entry
    const t = translated[i]
    const p = patches[idx]
    if (field === 'title') p[`title_${locale}`] = t
    else if (field === 'teaser') p[`teaser_${locale}`] = t
    else if (field === 'vibe') p[`vibe_${locale}`] = t
    else if (field === 'interestLabel') p[`interestLabel_${locale}`] = t
    else if (field === 'stops') p[`stops_${locale}`][sub] = t
    else if (field === 'itinerary_day') p[`itinerary_${locale}`][sub].day = t
    else if (field === 'itinerary_content') p[`itinerary_${locale}`][sub].content = t
    else if (field === 'stayLinks_label') p[`stayLinks_${locale}`][sub].label = t
    else if (field === 'doLinks_label') p[`doLinks_${locale}`][sub].label = t
    else if (field === 'eatLinks_label') p[`eatLinks_${locale}`][sub].label = t
  })

  for (let i = 0; i < rutas.length; i++) {
    await sanity.patch(rutas[i]._id).set(patches[i]).commit()
    process.stdout.write(`  patched ${i + 1}/${rutas.length}\r`)
  }
  console.log(`\n✓ ${rutas.length} rutas patched (${locale})`)
}

// Collect all translatable text refs from a Portable Text body.
// Each entry is { node, key } — a direct reference to mutate after translation.
function collectPortableTextEntries(body) {
  const entries = []
  if (!Array.isArray(body)) return entries
  for (const block of body) {
    if (!block || typeof block !== 'object') continue
    if (block._type === 'block' && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (child._type === 'span' && child.text && child.text.trim()) {
          entries.push({ node: child, key: 'text' })
        }
      }
    } else if (block._type === 'callout') {
      if (block.title) entries.push({ node: block, key: 'title' })
      if (block.body) entries.push({ node: block, key: 'body' })
    }
    // images and other block types: skip
  }
  return entries
}

async function translateGuides(locale, deeplLang) {
  const guides = await sanity.fetch(`*[_type == "guide"]{ _id, title, summary, body }`)

  if (!guides.length) { console.log('No guides found.'); return }
  console.log(`\nTranslating ${guides.length} guides to ${deeplLang}...`)

  // Collect flat entries + body entries per guide
  const flatEntries = [] // { guideIdx, field, value }
  guides.forEach((g, gi) => {
    flatEntries.push({ guideIdx: gi, field: 'title', value: g.title })
    if (g.summary) flatEntries.push({ guideIdx: gi, field: 'summary', value: g.summary })
  })

  // Clone bodies and collect span refs
  const clonedBodies = guides.map(g => g.body ? JSON.parse(JSON.stringify(g.body)) : null)
  const bodyEntries = [] // { guideIdx, node, key }
  clonedBodies.forEach((body, gi) => {
    if (!body) return
    collectPortableTextEntries(body).forEach(entry => {
      bodyEntries.push({ guideIdx: gi, node: entry.node, key: entry.key })
    })
  })

  const allValues = [
    ...flatEntries.map(e => e.value),
    ...bodyEntries.map(e => e.node[e.key]),
  ]

  console.log(`  ${allValues.length} strings (incl. ${bodyEntries.length} body spans)`)
  const translated = await translateChunked(allValues, deeplLang)

  const patches = guides.map(() => ({}))

  // Apply flat field translations
  flatEntries.forEach((entry, i) => {
    patches[entry.guideIdx][`${entry.field}_${locale}`] = translated[i]
  })

  // Apply body span translations
  const bodyOffset = flatEntries.length
  bodyEntries.forEach((entry, i) => {
    entry.node[entry.key] = translated[bodyOffset + i]
  })

  // Assign cloned translated bodies
  clonedBodies.forEach((body, gi) => {
    if (body) patches[gi][`body_${locale}`] = body
  })

  for (let i = 0; i < guides.length; i++) {
    await sanity.patch(guides[i]._id).set(patches[i]).commit()
    process.stdout.write(`  patched ${i + 1}/${guides.length}\r`)
  }
  console.log(`\n✓ ${guides.length} guides patched (${locale})`)
}

async function translatePlaces(locale, deeplLang) {
  const places = await sanity.fetch(`*[_type == "place"]{ _id, title, tagline, facts }`)

  if (!places.length) { console.log('No places found.'); return }
  console.log(`\nTranslating ${places.length} places to ${deeplLang}...`)

  const flatEntries = []
  places.forEach((p, pi) => {
    flatEntries.push({ idx: pi, field: 'title', value: p.title })
    if (p.tagline) flatEntries.push({ idx: pi, field: 'tagline', value: p.tagline })
  })

  const clonedFacts = places.map(p => p.facts ? JSON.parse(JSON.stringify(p.facts)) : null)
  const factsEntries = []
  clonedFacts.forEach((facts, pi) => {
    if (!facts) return
    collectPortableTextEntries(facts).forEach(entry => {
      factsEntries.push({ idx: pi, node: entry.node, key: entry.key })
    })
  })

  const allValues = [
    ...flatEntries.map(e => e.value),
    ...factsEntries.map(e => e.node[e.key]),
  ]

  console.log(`  ${allValues.length} strings (incl. ${factsEntries.length} facts spans)`)
  const translated = await translateChunked(allValues, deeplLang)

  const patches = places.map(() => ({}))

  flatEntries.forEach((entry, i) => {
    patches[entry.idx][`${entry.field}_${locale}`] = translated[i]
  })

  const factsOffset = flatEntries.length
  factsEntries.forEach((entry, i) => {
    entry.node[entry.key] = translated[factsOffset + i]
  })

  clonedFacts.forEach((facts, pi) => {
    if (facts) patches[pi][`facts_${locale}`] = facts
  })

  for (let i = 0; i < places.length; i++) {
    await sanity.patch(places[i]._id).set(patches[i]).commit()
    process.stdout.write(`  patched ${i + 1}/${places.length}\r`)
  }
  console.log(`\n✓ ${places.length} places patched (${locale})`)
}

for (const { locale, deeplLang } of TARGETS) {
  await translateRutas(locale, deeplLang)
  await translateGuides(locale, deeplLang)
  await translatePlaces(locale, deeplLang)
}

console.log('\nAll Sanity content translated and patched.')
