/**
 * Translates messages/es/{section}.json → messages/{en,pt}/{section}.json via DeepL.
 * Run with: node --env-file=.env.local scripts/translate-messages.mjs
 *
 * Requires: DEEPL_API_KEY=DeepL-Auth-Key xxxxx in .env.local
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const DEEPL_KEY = process.env.DEEPL_API_KEY
if (!DEEPL_KEY) {
  console.error('Missing DEEPL_API_KEY in .env.local')
  process.exit(1)
}

const SECTIONS = ['nav', 'footer', 'home', 'guias', 'vivir', 'conocer', 'comunidad', 'recursos']

const TARGETS = [
  { locale: 'en', deeplLang: 'EN-US' },
  { locale: 'pt', deeplLang: 'PT-BR' },
]

async function deeplTranslate(texts, targetLang) {
  const authKey = DEEPL_KEY.startsWith('DeepL-Auth-Key ')
    ? DEEPL_KEY
    : `DeepL-Auth-Key ${DEEPL_KEY}`

  const body = new URLSearchParams()
  body.append('target_lang', targetLang)
  body.append('preserve_formatting', '1')
  body.append('tag_handling', 'html')
  body.append('ignore_tags', 'em,br')
  texts.forEach(t => body.append('text', t))

  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: { Authorization: authKey },
    body,
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`DeepL error ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.translations.map(t => t.text)
}

// Flatten nested object/array to {path, value} pairs (strings only)
function flatten(obj, prefix = '') {
  const result = []
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof val === 'string') {
      result.push({ path, value: val })
    } else if (Array.isArray(val)) {
      val.forEach((item, i) => {
        const itemPath = `${path}.${i}`
        if (typeof item === 'string') {
          result.push({ path: itemPath, value: item })
        } else if (typeof item === 'object' && item !== null) {
          result.push(...flatten(item, itemPath))
        }
      })
    } else if (typeof val === 'object' && val !== null) {
      result.push(...flatten(val, path))
    }
  }
  return result
}

// Set nested key by dot-path (handles numeric array indices)
function setPath(obj, path, value) {
  const keys = path.split('.')
  let cur = obj
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]
    const nextK = keys[i + 1]
    if (!cur[k]) cur[k] = isNaN(Number(nextK)) ? {} : []
    cur = cur[k]
  }
  cur[keys[keys.length - 1]] = value
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

async function translateSection(section, targetLocale, deeplLang) {
  const sourcePath = resolve(ROOT, `messages/es/${section}.json`)
  if (!existsSync(sourcePath)) {
    console.warn(`  Skipping ${section} — source file not found`)
    return
  }

  const source = JSON.parse(readFileSync(sourcePath, 'utf8'))
  const entries = flatten(source)
  const texts = entries.map(e => e.value)

  if (texts.length === 0) return

  // Batch in chunks of 50 (DeepL free API limit)
  const CHUNK = 50
  const translated = []
  for (let i = 0; i < texts.length; i += CHUNK) {
    const chunk = texts.slice(i, i + CHUNK)
    const result = await deeplTranslate(chunk, deeplLang)
    translated.push(...result)
  }

  const output = deepClone(source)
  entries.forEach((entry, i) => setPath(output, entry.path, translated[i]))

  const outDir = resolve(ROOT, `messages/${targetLocale}`)
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

  const outPath = resolve(outDir, `${section}.json`)
  writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n')
  console.log(`  ✓ ${section}.json (${texts.length} strings)`)
}

for (const { locale, deeplLang } of TARGETS) {
  console.log(`\nTranslating to ${deeplLang}...`)
  for (const section of SECTIONS) {
    await translateSection(section, locale, deeplLang)
  }
}

console.log('\nAll translations complete.')
