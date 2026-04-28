/**
 * Translates Sanity content (rutas, guides) via DeepL and outputs JSON files.
 * Output: translations/en/rutas.json, translations/pt/rutas.json, etc. (keyed by _id)
 *
 * Run with: node --env-file=.env.local scripts/translate-sanity.mjs
 * Requires: DEEPL_API_KEY, SANITY_PROJECT_ID, SANITY_DATASET in .env.local
 */

import { createClient } from '@sanity/client'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const DEEPL_KEY = process.env.DEEPL_API_KEY
if (!DEEPL_KEY) { console.error('Missing DEEPL_API_KEY'); process.exit(1) }

const sanity = createClient({
  projectId: 'ohjste83',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

const TARGETS = [
  { locale: 'en', deeplLang: 'EN-US' },
  { locale: 'pt', deeplLang: 'PT-BR' },
]

// Finite lookup tables — never send these to DeepL
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
    "itinerary": itinerary[]{ day, content },
    stayLinks[]{ label, url },
    doLinks[]{ label, url },
    eatLinks[]{ label, url }
  }`)

  console.log(`\nTranslating ${rutas.length} rutas to ${deeplLang}...`)

  // Collect all translatable strings with their ruta index and field path
  const entries = [] // { rutaIndex, field, subIndex?, value }
  rutas.forEach((r, ri) => {
    entries.push({ rutaIndex: ri, field: 'title', value: r.title })
    if (r.teaser) entries.push({ rutaIndex: ri, field: 'teaser', value: r.teaser })
    if (r.vibe) entries.push({ rutaIndex: ri, field: 'vibe', value: r.vibe })
    if (r.interestLabel) entries.push({ rutaIndex: ri, field: 'interestLabel', value: r.interestLabel })
    if (r.stops) r.stops.forEach((s, si) =>
      entries.push({ rutaIndex: ri, field: 'stops', subIndex: si, value: s })
    )
    if (r.itinerary) r.itinerary.forEach((day, si) => {
      entries.push({ rutaIndex: ri, field: 'itinerary_day', subIndex: si, value: day.day })
      if (day.content) entries.push({ rutaIndex: ri, field: 'itinerary_content', subIndex: si, value: day.content })
    })
    // Link labels
    ;['stayLinks', 'doLinks', 'eatLinks'].forEach(linkField => {
      if (r[linkField]) r[linkField].forEach((link, si) => {
        if (link.label) entries.push({ rutaIndex: ri, field: `${linkField}_label`, subIndex: si, value: link.label })
      })
    })
  })

  const texts = entries.map(e => e.value)
  const translated = await translateChunked(texts, deeplLang)

  // Build output keyed by _id
  const output = {}
  rutas.forEach((r, ri) => {
    output[r._id] = {
      duration: DURATION_MAP[locale][r.duration] || r.duration,
      stops: r.stops ? [...r.stops] : [],
      itinerary: r.itinerary ? r.itinerary.map(d => ({ day: d.day, content: d.content })) : [],
      stayLinks: r.stayLinks ? r.stayLinks.map(l => ({ label: l.label, url: l.url })) : [],
      doLinks: r.doLinks ? r.doLinks.map(l => ({ label: l.label, url: l.url })) : [],
      eatLinks: r.eatLinks ? r.eatLinks.map(l => ({ label: l.label, url: l.url })) : [],
    }
  })

  entries.forEach((entry, i) => {
    const { rutaIndex, field, subIndex } = entry
    const id = rutas[rutaIndex]._id
    const t = translated[i]
    if (field === 'title') output[id].title = t
    else if (field === 'teaser') output[id].teaser = t
    else if (field === 'vibe') output[id].vibe = t
    else if (field === 'interestLabel') output[id].interestLabel = t
    else if (field === 'stops') output[id].stops[subIndex] = t
    else if (field === 'itinerary_day') output[id].itinerary[subIndex].day = t
    else if (field === 'itinerary_content') output[id].itinerary[subIndex].content = t
    else if (field === 'stayLinks_label') output[id].stayLinks[subIndex].label = t
    else if (field === 'doLinks_label') output[id].doLinks[subIndex].label = t
    else if (field === 'eatLinks_label') output[id].eatLinks[subIndex].label = t
  })

  const dir = resolve(ROOT, `translations/${locale}`)
  mkdirSync(dir, { recursive: true })
  const outPath = resolve(dir, 'rutas.json')
  writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n')
  console.log(`✓ ${rutas.length} rutas → translations/${locale}/rutas.json`)
}

async function translateGuides(locale, deeplLang) {
  const guides = await sanity.fetch(`*[_type == "guide"]{
    _id, title, excerpt,
    "body": pt::text(body)
  }`)

  if (!guides.length) { console.log('No guides found.'); return }

  console.log(`\nTranslating ${guides.length} guides to ${deeplLang}...`)

  const entries = []
  guides.forEach((g, gi) => {
    entries.push({ guideIndex: gi, field: 'title', value: g.title })
    if (g.excerpt) entries.push({ guideIndex: gi, field: 'excerpt', value: g.excerpt })
  })

  const texts = entries.map(e => e.value)
  const translated = await translateChunked(texts, deeplLang)

  const output = {}
  guides.forEach(g => { output[g._id] = {} })
  entries.forEach((entry, i) => {
    output[guides[entry.guideIndex]._id][entry.field] = translated[i]
  })

  const dir = resolve(ROOT, `translations/${locale}`)
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'guides.json'), JSON.stringify(output, null, 2) + '\n')
  console.log(`✓ ${guides.length} guides → translations/${locale}/guides.json`)
}

for (const { locale, deeplLang } of TARGETS) {
  await translateRutas(locale, deeplLang)
  await translateGuides(locale, deeplLang)
}

console.log('\nAll Sanity content translated.')
