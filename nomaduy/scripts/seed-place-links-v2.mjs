// Run with: node --env-file=.env.local scripts/seed-place-links-v2.mjs
// Replaces all links for Montevideo and Punta del Este with the full verified list.
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
    // Coworkings
    { label: 'Sinergia Cowork',          category: 'coworking', url: 'https://sinergia.uy/cowork' },
    { label: 'Conexo',                   category: 'coworking', url: 'https://cnx.uy/' },
    { label: 'Copper Cowork',            category: 'coworking', url: 'https://cowork.uy/' },
    { label: 'Co-Work LatAm Pocitos',    category: 'coworking', url: 'https://www.coworklatam.com/sedes/uruguay/nuevo-pocitos/' },
    { label: 'Enlace Cowork (Intendencia)', category: 'coworking', url: 'https://montevideo.gub.uy/area-tematica/emprendedores-empleo-y-economia/emprendedores/cowork-publico-enlace' },
    { label: 'Spaces La Cumparsita',     category: 'coworking', url: 'https://www.spacesworks.com/montevideo/la-cumparsita/' },
    // Colivings
    { label: 'OPTA Coliving',            category: 'other',     url: 'https://www.opta.com.uy' },
    { label: 'Selina Coliving',          category: 'other',     url: 'https://colive.selina.com/es' },
    // Cafes
    { label: 'The Lab Coffee Roasters',  category: 'cafe',      url: 'https://thelab.com.uy/' },
    { label: 'Culto Café',               category: 'cafe',      url: 'https://cultocafe.uy/' },
    { label: 'Sometimes Sunday',         category: 'cafe',      url: 'https://sometimessundaycafe.com/' },
    { label: 'El Palacio del Café',      category: 'cafe',      url: 'http://www.elpalaciodelcafe.com.uy/' },
    { label: 'Oro del Rhin',             category: 'cafe',      url: 'http://www.orodelrhin.com.uy/' },
  ],

  'place-punta-del-este': [
    // Coworkings
    { label: 'CoWorkers',                category: 'coworking', url: 'https://coworkers.com.uy/' },
    { label: 'Box Garden Cowork',        category: 'coworking', url: 'https://boxgarden.com.uy/' },
    { label: 'Sinergia Punta del Este',  category: 'coworking', url: 'https://workspace.sinergia.uy/punta-del-este' },
    { label: 'WonderWorks Cowork',       category: 'coworking', url: 'https://www.bewonderworks.com/en' },
    { label: 'CoworkSurf',               category: 'coworking', url: 'https://www.coworksurf.com/punta-del-este' },
    // Colivings
    { label: 'ZAG Coliving',             category: 'other',     url: 'https://zag.uy/' },
    { label: 'Selina Punta del Este',    category: 'other',     url: 'https://colive.selina.com/es' },
    { label: 'CoworkSurf Coliving',      category: 'other',     url: 'https://www.coworksurf.com/punta-del-este' },
    // Cafes
    { label: 'Abstrakto Café',           category: 'cafe',      url: 'https://abstraktocafe.com/' },
    { label: 'Picniquería',              category: 'cafe',      url: 'https://www.picniqueria.com/' },
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

  await client.patch(id).set({ links: formatted }).commit()
  console.log(`✓ ${id} — ${links.length} links set`)
}

console.log('\nDone!')
