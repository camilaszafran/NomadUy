// Run with: node --env-file=.env.local scripts/seed-legal-visas.mjs
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

let _k = 0
const key = () => `k${++_k}${Math.random().toString(36).slice(2, 6)}`

const h2 = (text) => ({ _type: 'block', _key: key(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] })
const h3 = (text) => ({ _type: 'block', _key: key(), style: 'h3', markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] })
const p  = (text) => ({ _type: 'block', _key: key(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] })
const li = (text) => ({ _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] })
const oli = (text) => ({ _type: 'block', _key: key(), style: 'normal', listItem: 'number', level: 1, markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] })
const callout = (type, title, body) => ({ _type: 'callout', _key: key(), type, title, body })

// 1. Delete any existing legal guides (draft and published)
console.log('Cleaning up existing legal guides...')
const toDelete = await client.fetch(`*[_type == "guide" && (slug.current == "legal-visas" || slug.current == "legal-and-visa")]{ _id }`)
for (const doc of toDelete) {
  await client.delete(doc._id)
  console.log(`  ✓ Deleted ${doc._id}`)
}

// 2. Create full guide
console.log('Creating Legal & Visas guide...')

const result = await client.create({
  _type: 'guide',
  title: 'Legal & Visas',
  slug: { _type: 'slug', current: 'legal-visas' },
  status: 'ready',
  featured: false,
  order: 2,
  icon: 'scales',
  category: 'legal',
  tags: ['Legal', 'Trámites', 'Visas'],
  summary: 'Turista, nómada digital, residente temporaria o fiscal — cada situación tiene sus documentos. Qué necesitás según cuánto tiempo te quedás, con los pasos exactos y los links oficiales.',
  readTime: 12,
  persona: ['nomad', 'expat', 'immigrant'],
  body: [
    p('Lo primero que define tus trámites es cuánto tiempo vas a vivir en Uruguay. No es lo mismo pasar tres meses que quedarte a largo plazo. Cada situación tiene sus documentos — y la buena noticia es que Uruguay hace las cosas relativamente simples comparado con el resto de la región.'),

    h2('Turista — Hasta 90 días'),
    p('La mayoría de las nacionalidades entran sin visa. Solo necesitás pasaporte vigente. La estadía turista es de 90 días, prorrogables por otros 90 días en la Dirección Nacional de Migración (total 180 días en el año).'),
    li('No hay costo de entrada. Uruguay es uno de los países con fronteras más abiertas de la región.'),
    li('Trabajar de forma remota para clientes en el exterior está en una zona gris legal. En la práctica, miles de nómadas lo hacen sin problemas.'),
    li('Si necesitás extender más allá de los 180 días, la opción más común es tramitar el Permiso de Nómada Digital o iniciar residencia.'),
    callout('blue', 'Verificá tu nacionalidad', 'La mayoría de países de Latinoamérica, Europa, EE.UU. y Canadá no necesitan visa. Podés verificar tu caso en: liveinuruguay.uy/es/entryprocedures'),

    h2('Permiso de Nómada Digital — De 3 a 12 meses'),
    p('Uruguay tiene uno de los permisos de nómada digital más accesibles del mundo. Se tramita online, cuesta ~$312 UYU (menos de $10 USD), y permite vivir y trabajar legalmente por hasta 6 meses, renovable una vez (hasta 12 meses en total). Debés estar físicamente en Uruguay al momento de la solicitud.'),
    h3('Requisitos'),
    li('Pasaporte vigente'),
    li('Formulario online con datos personales'),
    li('Declaración jurada de medios económicos (descargable en el sitio de la DNM)'),
    li('Estar físicamente en Uruguay al momento de la solicitud — no se puede tramitar desde el exterior'),
    h3('Cómo tramitarlo'),
    oli('Ingresá al portal de Migraciones: migracion.minterior.gub.uy → tramites.gub.uy'),
    oli('Completá el formulario de solicitud y adjuntá la documentación'),
    oli('Pagá el arancel (~$312 UYU) en Abitab, RedPagos o Correo Uruguayo'),
    oli('Esperá 5 a 15 días hábiles para la resolución'),
    callout('green', 'El beneficio fiscal', 'Con residencia legal en Uruguay activás el régimen de exoneración de impuestos sobre ingresos del exterior. Uruguay tiene sistema fiscal territorial — lo que ganás afuera generalmente no tributa acá durante los primeros 10 años. Fuente: uruguayxxi.gub.uy'),

    h2('Residencia Temporaria — Más de un año'),
    p('Si tu plan es quedarte, querés tramitar la residencia. El proceso varía significativamente según tu nacionalidad.'),

    h3('Residencia Temporaria Mercosur — La vía rápida'),
    p('Para ciudadanos de Argentina, Brasil, Paraguay, Bolivia, Chile, Colombia, Ecuador, Perú, Venezuela, Guyana y Surinam. Es significativamente más simple y rápida que la vía general.'),
    li('Duración: 2 años, renovable'),
    li('Requisitos: documento de identidad + antecedentes penales del país de origen'),
    li('Brasil: no requiere apostilla (acuerdo bilateral Mercosur)'),
    li('Resto: documentos apostillados y traducidos al español'),
    li('Trámite oficial: gub.uy/tramites/residencia-legal-temporaria-mercosur'),
    li('Contacto DNM: dnm-visasresidencias@minterior.gub.uy'),

    h3('Residencia Temporaria — No Mercosur'),
    p('Para el resto de las nacionalidades. El proceso demora entre 3 y 6 meses en la Dirección Nacional de Migración.'),
    li('Pasaporte vigente'),
    li('Partida de nacimiento (apostillada + traducida al español)'),
    li('Antecedentes penales del país de residencia (apostillados + traducidos)'),
    li('Certificado médico emitido en Uruguay'),
    li('Prueba de ingresos, empleo, estudio o propiedad'),
    li('2 fotos carné'),
    li('Trámite oficial: gub.uy/tramites/residencia-legal-temporaria'),
    callout('gold', 'Importante sobre los documentos extranjeros', 'Todos los documentos de tu país necesitan apostilla o legalización consular antes de presentarlos. Si tu país firmó el Convenio de La Haya, el trámite de apostilla es simple. Consultá con tu consulado antes de viajar.'),

    h2('Residencia Permanente'),
    p('Se obtiene después de 3 años de residencia legal continua en Uruguay (cualquier status cuenta). Los ciudadanos Mercosur pueden saltear la etapa temporaria y solicitar permanente directamente.'),
    li('Trámite permanente general: gub.uy/tramites/residencia-legal-permanente'),
    li('Trámite permanente Mercosur: gub.uy/tramites/residencia-legal-permanente-mercosur'),

    h2('Cédula de Identidad'),
    p('Una vez que iniciás cualquier trámite de residencia, podés tramitar la cédula de identidad uruguaya. Es el documento de uso cotidiano: necesaria para abrir una cuenta bancaria, alquilar un apartamento, acceder al sistema de salud (FONASA), obtener licencia de conducir y casi cualquier trámite.'),
    h3('Qué llevar al DNIC o Correo Uruguayo'),
    li('Pasaporte original + fotocopia'),
    li('Dirección en Uruguay (puede ser alojamiento temporal)'),
    li('~$700 UYU de costo (verificá el valor actualizado en gub.uy)'),
    li('Más info: gub.uy/ministerio-interior/dnic'),
    p('Tiempo de espera: 2 a 4 semanas para recibirla en tu domicilio.'),

    h2('Residencia Fiscal — Para quienes quieren optimizar impuestos'),
    p('Uruguay tiene sistema fiscal territorial: los ingresos generados fuera del país generalmente no tributan localmente. Para acceder a este beneficio como residente formal, debés cumplir al menos uno de estos criterios:'),
    li('Pasar más de 183 días al año en Uruguay'),
    li('Tener en Uruguay el "núcleo principal de actividades" o "centro de intereses económicos"'),

    h3('El beneficio como nuevo residente fiscal'),
    p('Podés elegir entre dos opciones para tus ingresos de capital del exterior:'),
    li('Opción A: 10 años de exoneración total sobre ingresos de capital del exterior'),
    li('Opción B: tasa fija del 7% de forma permanente sobre esos ingresos'),
    p('En ambos casos, mucho menos que en la mayoría de los países. Los ingresos de fuente uruguaya tributan normalmente con IRPF (escala progresiva 0%–36%).'),
    callout('gold', 'Cambio importante desde enero 2026', 'Los ingresos de capital e inmuebles provenientes de entidades no residentes ahora se consideran renta de fuente uruguaya para los residentes fiscales. Afecta principalmente a inversores con estructuras offshore complejas. Si tenés ese perfil, consultá un contador local antes de tomar decisiones. Fuente: guyer.com.uy'),
    callout('green', 'Vale la pena asesorarte', 'Una consulta con un contador uruguayo especializado en extranjeros (~$100–150 USD) puede ahorrarte miles. La comunidad NomadUY tiene una lista de contadores recomendados que trabajan habitualmente con expats y nómadas.'),

    h2('Links oficiales de referencia'),
    li('Portal de Migraciones: migracion.minterior.gub.uy'),
    li('Trámites de residencia: gub.uy/tramites/residencia-legal'),
    li('Autoridad fiscal (DGI): dgi.gub.uy'),
    li('Seguridad social (BPS): bps.gub.uy'),
    li('Guía oficial para nuevos residentes: liveinuruguay.uy'),
    li('Uruguay XXI (inversión y residencia): uruguayxxi.gub.uy'),
  ],
})

console.log(`✓ Created: "${result.title}" (${result._id})`)
console.log('\nDone!')
