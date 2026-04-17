// Run with: node --env-file=.env.local scripts/seed-guides-4.mjs
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// 1. Delete all legal-visas guides
console.log('Deleting legal-visas guides...')
const toDelete = await client.fetch(`*[_type == "guide" && slug.current == "legal-visas"]{ _id }`)
for (const doc of toDelete) {
  await client.delete(doc._id)
  console.log(`  ✓ Deleted ${doc._id}`)
}
if (toDelete.length === 0) console.log('  (none found)')

// 2. Create primeras-48h card (links to static page)
console.log('Creating primeras-48h guide card...')
const existing = await client.fetch(`*[_type == "guide" && slug.current == "primeras-48h"][0]{ _id }`)
if (existing) {
  console.log('  Already exists, skipping.')
} else {
  const result = await client.create({
    _type: 'guide',
    title: 'Primeras 48 horas en Uruguay',
    slug: { _type: 'slug', current: 'primeras-48h' },
    status: 'ready',
    featured: true,
    order: 1,
    icon: 'airplane',
    category: 'llegada',
    tags: ['Llegada', '18 pasos'],
    summary: 'La guía esencial al aterrizar: SIM, efectivo, apps, transporte y los primeros pasos — en orden de prioridad, con los links y números útiles.',
    readTime: 15,
    persona: ['nomad', 'expat', 'immigrant'],
  })
  console.log(`  ✓ Created: ${result._id}`)
}

console.log('\nDone!')
