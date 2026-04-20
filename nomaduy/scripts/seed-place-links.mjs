// Run with: node --env-file=.env.local scripts/seed-place-links.mjs
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const placeLinks = {
  'place-montevideo': [
    { label: 'Sinergia Cowork',          category: 'coworking', url: 'https://sinergia.uy/cowork' },
    { label: 'The Lab Coffee Roasters',   category: 'cafe',      url: 'https://thelab.com.uy/' },
    { label: 'Culto Café',                category: 'cafe',      url: 'https://cultocafe.uy/' },
    { label: 'Sometimes Sunday',          category: 'cafe',      url: 'https://sometimessundaycafe.com/' },
  ],
  'place-punta-del-este': [
    { label: 'CoWorkers',                 category: 'coworking', url: 'https://coworkers.com.uy/' },
    { label: 'Box Garden Cowork',         category: 'coworking', url: 'https://boxgarden.com.uy/' },
    { label: 'Sinergia Punta del Este',   category: 'coworking', url: 'https://workspace.sinergia.uy/punta-del-este' },
    { label: 'WonderWorks Cowork',        category: 'coworking', url: 'https://www.bewonderworks.com/en' },
    { label: 'CoworkSurf',                category: 'coworking', url: 'https://www.coworksurf.com/punta-del-este' },
  ],
  'place-centro-sur': [
    { label: 'Casa Dominga Cowork',       category: 'coworking', url: 'https://casadominga.com.uy/cowork/' },
    { label: 'Florida Cowork',            category: 'coworking', url: 'https://www.floridacowork.com.uy/' },
  ],
}

for (const [id, links] of Object.entries(placeLinks)) {
  const formatted = links.map((l, i) => ({
    _type: 'object',
    _key: `link-${id}-${i}`,
    label: l.label,
    category: l.category,
    url: l.url,
  }))

  await client
    .patch(id)
    .set({ links: formatted })
    .commit()

  console.log(`✓ ${id} — ${links.length} links added`)
}

console.log('\nDone!')
