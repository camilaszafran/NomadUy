// Run with: node --env-file=.env.local scripts/seed-rutas.mjs
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

const rutas = [

  // ─────────────────────────────────────────────
  // 1. COLONIA DEL SACRAMENTO — enriched
  // ─────────────────────────────────────────────
  {
    _type: 'ruta',
    title: 'Colonia del Sacramento',
    slug: { _type: 'slug', current: 'colonia-del-sacramento' },
    duration: '1 día',
    distance: '2h 45min en auto',
    vibe: 'Patrimonio UNESCO',
    interestLabel: 'Historia',
    teaser: 'Ciudad Patrimonio UNESCO a orillas del Río de la Plata. Calles de piedra, faro y el café más instagrameable del país.',
    stops: ['Barrio Histórico', 'Faro', 'Calle de los Suspiros', 'Puerto'],
    itinerary: [
      {
        _type: 'object',
        _key: key(),
        day: 'Mañana — Barrio Histórico',
        content: 'Llegás temprano y caminás el barrio sin apuro. La Calle de los Suspiros, las ruinas del Convento de San Francisco y la Plaza Mayor son el núcleo. Tardás unas 2 horas en verlo bien. Entrá al Museo Portugués si querés contexto histórico.',
      },
      {
        _type: 'object',
        _key: key(),
        day: 'Mediodía — Faro y almuerzo',
        content: 'Subí al Faro para la mejor vista del Río de la Plata. Desde arriba se ve Buenos Aires en días despejados. Bajá a almorzar: El Drugstore tiene la cocina más cuidada del centro histórico. Reservá si vas un fin de semana.',
      },
      {
        _type: 'object',
        _key: key(),
        day: 'Tarde — Puerto y vuelta',
        content: 'Paseo por el puerto viejo, algún heladero artesanal en Calle Real, y vuelta a Montevideo. Si salís antes de las 17h llegás con luz.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Ver hoteles en Booking', url: 'https://www.booking.com/searchresults.es.html?ss=Colonia+del+Sacramento%2C+Uruguay' },
      { _type: 'object', _key: key(), label: 'Ver alquileres en Airbnb', url: 'https://www.airbnb.com/s/Colonia-del-Sacramento--Uruguay/homes' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Barrio Histórico en TripAdvisor', url: 'https://www.tripadvisor.com/Attraction_Review-g312724-d317509-Reviews-Historic_Quarter_of_the_City_of_Colonia_del_Sacramento-Colonia_del_Sacramento_Colonia.html' },
      { _type: 'object', _key: key(), label: 'Faro de Colonia', url: 'https://www.google.com/maps/search/Faro+de+Colonia+del+Sacramento' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'El Drugstore', url: 'https://www.tripadvisor.com/Restaurant_Review-g312724-d1013543-Reviews-El_Drugstore-Colonia_del_Sacramento_Colonia_Department.html' },
      { _type: 'object', _key: key(), label: 'Mesón de la Plaza', url: 'https://www.google.com/maps/search/Meson+de+la+Plaza+Colonia+del+Sacramento' },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. PUNTA DEL ESTE & JOSÉ IGNACIO — enriched
  // ─────────────────────────────────────────────
  {
    _type: 'ruta',
    title: 'Punta del Este & José Ignacio',
    slug: { _type: 'slug', current: 'punta-del-este-jose-ignacio' },
    duration: 'Fin de semana',
    distance: '1h 20min en auto',
    vibe: 'Verano',
    interestLabel: 'Playa',
    teaser: 'La costa más famosa de Sudamérica. Playas anchas, lobos marinos y la movida más elegante del Cono Sur.',
    stops: ['La Brava', 'La Mansa', 'José Ignacio', 'Isla de Lobos'],
    itinerary: [
      {
        _type: 'object',
        _key: key(),
        day: 'Día 1 — La Brava y La Mansa',
        content: 'Llegá el viernes a la tarde. La Brava tiene las olas y la energía atlántica; La Mansa es ideal para los que quieren agua tranquila. Los paradores sobre La Brava son perfectos para el atardecer. En temporada alta (enero-febrero) la zona se llena; fuera de temporada la tenés casi para vos.',
      },
      {
        _type: 'object',
        _key: key(),
        day: 'Día 1 — Noche en Punta',
        content: 'El puerto viejo tiene los mejores restaurantes de la ciudad. Menos glamour que los paradores de moda, más cocina real. Si vas en temporada, la noche de Punta es única. Fuera de diciembre-febrero es mucho más tranquilo.',
      },
      {
        _type: 'object',
        _key: key(),
        day: 'Día 2 — José Ignacio',
        content: 'El pueblo es minúsculo pero tiene una energía especial. Llegá antes del mediodía para recorrer el faro y la playa. La Huella es la experiencia gastronómica más famosa de Uruguay — reservá con semanas de anticipación en temporada alta. Casapueblo, en Punta Ballena, vale el desvío de vuelta.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Ver hoteles en Booking', url: 'https://www.booking.com/searchresults.es.html?ss=Punta+del+Este%2C+Uruguay' },
      { _type: 'object', _key: key(), label: 'Ver alquileres en Airbnb', url: 'https://www.airbnb.com/s/Punta-del-Este--Uruguay/homes' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Casapueblo (Carlos Páez Vilaró)', url: 'https://www.tripadvisor.com/Attraction_Review-g312740-d316792-Reviews-Casapueblo-Punta_del_Este_Maldonado_Department.html' },
      { _type: 'object', _key: key(), label: 'Isla de Lobos', url: 'https://www.google.com/maps/search/Isla+de+Lobos+Uruguay' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'La Huella — José Ignacio', url: 'https://www.lahuella.com.uy/' },
      { _type: 'object', _key: key(), label: 'Lo de Tere — Puerto', url: 'https://www.google.com/maps/search/Lo+de+Tere+Punta+del+Este' },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. CABO POLONIO — enriched
  // ─────────────────────────────────────────────
  {
    _type: 'ruta',
    title: 'Cabo Polonio',
    slug: { _type: 'slug', current: 'cabo-polonio' },
    duration: 'Fin de semana',
    distance: '4h + jeep',
    vibe: 'Off-grid',
    interestLabel: 'Naturaleza',
    teaser: 'Sin luz eléctrica de red, sin wifi. Lobos marinos, dunas y atardeceres que no olvidás. El lado salvaje de Uruguay.',
    stops: ['Dunas', 'Colonia de lobos', 'Faro', 'Playas vírgenes'],
    itinerary: [
      {
        _type: 'object',
        _key: key(),
        day: 'Día 1 — El camino',
        content: 'Bus desde Terminal Tres Cruces hasta la parada de Cabo Polonio (Ruta 10, km 264). Desde ahí tomás una camioneta 4x4 que cruza las dunas — es la única forma de entrar. El trayecto en camioneta dura unos 20 minutos. Llegás sin señal, sin wifi, sin luz de red. Dejalo todo en el alojamiento y empezá a descomprimir.',
      },
      {
        _type: 'object',
        _key: key(),
        day: 'Día 1 tarde — Faro y lobos',
        content: 'El Faro se puede visitar. Al costado hay una de las colonias de lobos marinos más grandes del Atlántico Sur — cientos de lobos a metros de distancia. La noche en invierno tiene un cielo estrellado difícil de superar en Uruguay. En verano hay luna llena que te deja caminar sin linterna.',
      },
      {
        _type: 'object',
        _key: key(),
        day: 'Día 2 — Playas y vuelta',
        content: 'Las playas son completamente vírgenes. Caminá hacia el norte para encontrar las dunas grandes. Hay pocas opciones de comida en el cabo — desayuná en el alojamiento y llevá algo. Las camionetas de vuelta salen a horarios fijos; consultá con el alojamiento. En temporada alta reservá la camioneta con anticipación.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Ver alquileres en Airbnb', url: 'https://www.airbnb.com/s/Cabo-Polonio--Uruguay/homes' },
      { _type: 'object', _key: key(), label: 'Ver hospedajes en Booking', url: 'https://www.booking.com/searchresults.es.html?ss=Cabo+Polonio%2C+Uruguay' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Faro de Cabo Polonio', url: 'https://www.google.com/maps/search/Faro+Cabo+Polonio+Uruguay' },
      { _type: 'object', _key: key(), label: 'Colonia de lobos marinos', url: 'https://www.google.com/maps/search/Colonia+lobos+marinos+Cabo+Polonio' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Opciones de comida en Cabo Polonio', url: 'https://www.tripadvisor.com/Restaurants-g1808260-Cabo_Polonio_Rocha_Department.html' },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. TERMAS DE SALTO — enriched
  // ─────────────────────────────────────────────
  {
    _type: 'ruta',
    title: 'Termas de Salto',
    slug: { _type: 'slug', current: 'termas-de-salto' },
    duration: 'Fin de semana',
    distance: '5h en auto o bus nocturno',
    vibe: 'Relax',
    interestLabel: 'Relax & Termas',
    teaser: 'Las termas más grandes de América del Sur. Aguas termales naturales, complejos familiares y la ciudad más cálida de Uruguay.',
    stops: ['Termas del Daymán', 'Termas del Arapey', 'Ciudad de Salto', 'Río Uruguay'],
    itinerary: [
      {
        _type: 'object',
        _key: key(),
        day: 'Día 1 — Viaje y llegada',
        content: '5 horas en auto por Ruta 3, o bus nocturno desde Tres Cruces que sale alrededor de las 23h y llega de madrugada. Termas del Daymán está a 8km de Salto y tiene el complejo más grande: varias piletas termales entre 28°C y 42°C, zonas de relajación y un sector familiar. Llegás directo a las termas.',
      },
      {
        _type: 'object',
        _key: key(),
        day: 'Día 1 — Tarde en las termas',
        content: 'Pasás la tarde flotando. En invierno es especialmente bueno: frío afuera, agua caliente. Hay restaurante en el complejo. Si querés algo más tranquilo y rural, Termas del Arapey está a 60km más al norte — menos infraestructura pero ambiente más selvático.',
      },
      {
        _type: 'object',
        _key: key(),
        day: 'Día 2 — Ciudad de Salto',
        content: 'La segunda ciudad de Uruguay tiene su propio ritmo, completamente diferente a Montevideo. Mercado central, teatro, costanera sobre el Río Uruguay. El Parque Harriague vale la visita. Si viajás en auto, podés volver por una ruta diferente pasando por Paysandú.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Complejo Termas del Daymán', url: 'https://www.termasdeldayman.com/' },
      { _type: 'object', _key: key(), label: 'Ver alquileres en Airbnb', url: 'https://www.airbnb.com/s/Salto--Uruguay/homes' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Termas del Daymán', url: 'https://www.termasdeldayman.com/' },
      { _type: 'object', _key: key(), label: 'Termas del Arapey', url: 'https://www.google.com/maps/search/Termas+del+Arapey+Uruguay' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Mercado Central de Salto', url: 'https://www.google.com/maps/search/Mercado+Central+Salto+Uruguay' },
      { _type: 'object', _key: key(), label: 'Restaurantes en Salto', url: 'https://www.tripadvisor.com/Restaurants-g312734-Salto_Salto_Department.html' },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. CIUDAD VIEJA & PUERTO — basic
  // ─────────────────────────────────────────────
  {
    _type: 'ruta',
    title: 'Ciudad Vieja & Puerto',
    slug: { _type: 'slug', current: 'ciudad-vieja-puerto' },
    duration: '1 día',
    distance: 'A pie',
    vibe: 'Montevideo',
    interestLabel: 'Historia',
    teaser: 'El corazón histórico de Montevideo. Mercado del Puerto, murales, arquitectura art-déco y el mejor chivito de la ciudad.',
    stops: ['Mercado del Puerto', 'Plaza Independencia', 'Teatro Solís', 'Rambla Sur'],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Ver hoteles en Booking', url: 'https://www.booking.com/searchresults.es.html?ss=Montevideo%2C+Uruguay' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Mercado del Puerto', url: 'https://www.mercadodelpuerto.com/' },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. PUNTA DEL DIABLO — basic
  // ─────────────────────────────────────────────
  {
    _type: 'ruta',
    title: 'Punta del Diablo',
    slug: { _type: 'slug', current: 'punta-del-diablo' },
    duration: 'Fin de semana',
    distance: '4h 30min en auto',
    vibe: 'Pueblo de pescadores',
    interestLabel: 'Playa',
    teaser: 'El pueblo de pescadores que se convirtió en el favorito de los viajeros. Casas de madera, olas bravas y muy buen ambiente.',
    stops: ['Playa de los Pescadores', 'Playa Grande', 'Parque Santa Teresa', 'Laguna Negra'],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Ver alquileres en Airbnb', url: 'https://www.airbnb.com/s/Punta-del-Diablo--Uruguay/homes' },
      { _type: 'object', _key: key(), label: 'Ver hospedajes en Booking', url: 'https://www.booking.com/searchresults.es.html?ss=Punta+del+Diablo%2C+Uruguay' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Parque Nacional Santa Teresa', url: 'https://www.google.com/maps/search/Parque+Nacional+Santa+Teresa+Uruguay' },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. CARMELO & BODEGAS — basic
  // ─────────────────────────────────────────────
  {
    _type: 'ruta',
    title: 'Carmelo & bodegas',
    slug: { _type: 'slug', current: 'carmelo-bodegas' },
    duration: 'Fin de semana',
    distance: '3h en auto',
    vibe: 'Enoturismo',
    interestLabel: 'Gastronomía',
    teaser: 'La región vitivinícola más cercana a Montevideo. Bodegas boutique, olivares y el mejor asado con maridaje que vas a tener.',
    stops: ['Bodega Narbona', 'Bodega Irurtia', 'Colonia Estrella', 'Río de la Plata'],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Narbona Wine Lodge', url: 'https://www.narbona.com.uy/' },
      { _type: 'object', _key: key(), label: 'Ver alquileres en Airbnb', url: 'https://www.airbnb.com/s/Carmelo--Uruguay/homes' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Bodega Narbona', url: 'https://www.narbona.com.uy/' },
      { _type: 'object', _key: key(), label: 'Bodega Irurtia', url: 'https://www.google.com/maps/search/Bodega+Irurtia+Uruguay' },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. VALLE DEL LUNAREJO — basic
  // ─────────────────────────────────────────────
  {
    _type: 'ruta',
    title: 'Valle del Lunarejo',
    slug: { _type: 'slug', current: 'valle-del-lunarejo' },
    duration: '4–7 días',
    distance: '4h en auto',
    vibe: 'Biodiversidad',
    interestLabel: 'Naturaleza',
    teaser: 'El secreto mejor guardado de Uruguay. Cañones, cascadas, aves únicas y cero turistas. El Uruguay que no aparece en Instagram.',
    stops: ['Cañón del Lunarejo', 'Pueblo de Rivera', 'Posadas rurales', 'Quebradas'],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Ver alojamientos rurales', url: 'https://www.airbnb.com/s/Rivera--Uruguay/homes' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Valle del Lunarejo', url: 'https://www.google.com/maps/search/Valle+del+Lunarejo+Uruguay' },
    ],
  },
]

async function main() {
  console.log(`Seeding ${rutas.length} rutas…`)

  const existing = await client.fetch(`*[_type == "ruta"]{ _id, "slug": slug.current }`)
  const existingSlugs = new Set(existing.map((r) => r.slug))

  let created = 0
  let skipped = 0

  for (const ruta of rutas) {
    if (existingSlugs.has(ruta.slug.current)) {
      console.log(`  skip  ${ruta.title} (already exists)`)
      skipped++
      continue
    }
    await client.create(ruta)
    console.log(`  ✓     ${ruta.title}`)
    created++
  }

  console.log(`\nDone. Created: ${created}  Skipped: ${skipped}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
