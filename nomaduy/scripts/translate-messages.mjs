/**
 * Translates messages/es.json → messages/en.json and messages/pt.json via DeepL.
 * Run with: node --env-file=.env.local scripts/translate-messages.mjs
 *
 * Requires: DEEPL_API_KEY=DeepL-Auth-Key xxxxx in .env.local
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SEP = '@@S@@'

const DEEPL_KEY = process.env.DEEPL_API_KEY
if (!DEEPL_KEY) {
  console.error('Missing DEEPL_API_KEY in .env.local')
  process.exit(1)
}

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
  body.append('tag_handling', 'xml')
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

// Flatten nested object to array of {path, value} for string values only
function flatten(obj, prefix = '') {
  const result = []
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof val === 'string') {
      result.push({ path, value: val })
    } else if (typeof val === 'object' && val !== null) {
      result.push(...flatten(val, path))
    }
  }
  return result
}

// Set nested key by dot-path
function setPath(obj, path, value) {
  const keys = path.split('.')
  let cur = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (!cur[keys[i]]) cur[keys[i]] = {}
    cur = cur[keys[i]]
  }
  cur[keys[keys.length - 1]] = value
}

// Deep clone
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

async function translateFile(targetLocale, deeplLang) {
  const source = JSON.parse(readFileSync(resolve(ROOT, 'messages/es.json'), 'utf8'))
  const entries = flatten(source)

  const texts = entries.map(e => e.value)

  console.log(`Translating ${texts.length} strings to ${deeplLang}...`)

  // DeepL free API: max 50 texts per request — batch in chunks
  const CHUNK = 50
  const translated = []
  for (let i = 0; i < texts.length; i += CHUNK) {
    const chunk = texts.slice(i, i + CHUNK)
    const result = await deeplTranslate(chunk, deeplLang)
    translated.push(...result)
    console.log(`  ${Math.min(i + CHUNK, texts.length)}/${texts.length}`)
  }

  const output = deepClone(source)
  entries.forEach((entry, i) => {
    setPath(output, entry.path, translated[i])
  })

  const outPath = resolve(ROOT, `messages/${targetLocale}.json`)
  writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n')
  console.log(`✓ Written to messages/${targetLocale}.json`)
}

for (const { locale, deeplLang } of TARGETS) {
  await translateFile(locale, deeplLang)
}

console.log('\nAll translations complete.')
