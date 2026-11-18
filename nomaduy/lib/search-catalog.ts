import { serviceGroups } from '@/lib/services'
import { sanityFetch, searchGuidesQuery, rutasQuery } from '@/lib/sanity'
import { allPlaces, featuredPlaceSlugs } from '@/lib/regional-places'
import { regionalRoutes } from '@/lib/regional-routes'
import { colivings } from '@/lib/colivings'
import * as directories from '@/lib/discover'
import type { Listing } from '@/lib/discover'
import type { GuideCard, Ruta } from '@/types'
import type { SearchItem } from '@/lib/planner'
import { arrivalLocale } from '@/lib/arrival-links'

const curated = [
 ['/guias/primeras-48h#fase-2', ['Prex y Midinero', 'Prex and Midinero', 'Prex e Midinero'], ['Tarjetas prepagas y cómo solicitarlas.', 'Prepaid cards and how to apply.', 'Cartões pré-pagos e como solicitar.'], 'prex midinero banco tarjeta dinero money prepaid credit debit cartao prepago'],
 ['/recursos#delivery', ['PedidosYa y Rappi', 'PedidosYa and Rappi', 'PedidosYa e Rappi'], ['Apps para pedir comida.', 'Food delivery apps.', 'Apps para pedir comida.'], 'comida delivery restaurante restaurantes food takeout entrega'],
 ['/comunidad#cursos-y-talleres', ['Idiomas, cursos y talleres', 'Languages, classes and workshops', 'Idiomas, cursos e oficinas'], ['Clases para aprender y conocer gente.', 'Classes to learn and meet people.', 'Aulas para aprender e conhecer pessoas.'], 'ingles portugues idiomas ceramica pintura musica cocinar clases cursos workshops cooking language'],
 ['/conocer-uruguay#apps-turismo', ['Turisteando y turismo rural', 'Turisteando and rural tourism', 'Turisteando e turismo rural'], ['Apps y recursos para explorar Uruguay.', 'Apps and resources to explore Uruguay.', 'Apps e recursos para explorar o Uruguai.'], 'turisteando turismo rural natural descubri montevideo'],
 ['/recursos#creadores', ['Uruguay en Instagram y TikTok', 'Uruguay on Instagram and TikTok', 'Uruguai no Instagram e TikTok'], ['Creadores que cuentan cómo es Uruguay.', 'Creators sharing life in Uruguay.', 'Criadores que mostram a vida no Uruguai.'], 'influencers instagram tiktok mateoexperience vivernouruguai viveremuruguai'],

 ['/llegada', ['Recién llegué', 'Just arrived', 'Acabei de chegar'], ['Organizá tus primeras semanas en Uruguay.', 'Plan your first weeks in Uruguay.', 'Organize suas primeiras semanas no Uruguai.'], 'arrival llegada chegada mascotas pets dog perro cachorro'],
 ['/llegada#colivings', ['Colivings y viviendas compartidas', 'Coliving and shared homes', 'Coliving e moradias compartilhadas'], ['Opciones de vivienda con comunidad.', 'Housing with a community.', 'Moradia com comunidade.'], 'alquiler mensual amueblado meses rental monthly housing aluguel mobiliado coliving'],
 ['/servicios#vivienda', ['Alquiler por mes y vivienda', 'Monthly rentals and housing', 'Aluguel mensal e moradia'], ['Portales, inmobiliarias y preguntas antes de reservar.', 'Portals, agencies and questions before booking.', 'Portais, imobiliárias e perguntas antes de reservar.'], 'alquiler temporal garantia deposito monthly rental furnished aluguel caução'],
 ['/explora#apps-transporte', ['Transporte en Uruguay', 'Transport in Uruguay', 'Transporte no Uruguai'], ['Ómnibus, viajes compartidos, taxis y alquiler de autos.', 'Buses, ridesharing, taxis and car rental.', 'Ônibus, caronas, táxis e aluguel de carros.'], 'sin auto sem carro without car transporte omnibus onibus bus'],
 ['/conocer-uruguay#sin-auto', ['Escapadas sin auto', 'Trips without a car', 'Passeios sem carro'], ['Ideas para recorrer Uruguay y comprobar el regreso.', 'Explore Uruguay and plan the return trip.', 'Explore o Uruguai e planeje a volta.'], 'pasear viajar sin auto sem carro without car bus'],
 ['/comunidad#conocer-gente', ['Conocer gente', 'Meet people', 'Conhecer pessoas'], ['Encuentros, actividades y grupos.', 'Meetups, activities and groups.', 'Encontros, atividades e grupos.'], 'amigos friends people amigos pessoas cenas idiomas deporte solo'],
 ['/ayuda#consulados', ['Consulados y embajadas', 'Consulates and embassies', 'Consulados e embaixadas'], ['Buscá asistencia consular por país.', 'Find consular assistance by country.', 'Busque assistência consular por país.'], 'passport pasaporte lost perdido embaixada embassy consulate'],
 ['/recursos#coworks', ['Coworks', 'Coworking spaces', 'Coworkings'], ['Espacios para trabajar por localidad.', 'Workspaces by location.', 'Espaços de trabalho por localidade.'], 'trabajar remoto work cowork internet trabalhar'],
 ['/recursos#costo-de-vida', ['Costo de vida', 'Cost of living', 'Custo de vida'], ['Calculadora para planear tu presupuesto.', 'Calculator to plan your budget.', 'Calculadora para planejar seu orçamento.'], 'presupuesto budget custo costo money dinero'],
 ['/guias/primeras-48h#fase-1', ['Chip y eSIM', 'SIM and eSIM', 'Chip e eSIM'], ['Conexión al llegar y operadores de telefonía.', 'Getting connected and mobile providers.', 'Conexão na chegada e operadoras de celular.'], 'chip esim sim internet mobile celular'],
 ['/ayuda', ['Necesito ayuda', 'I need help', 'Preciso de ajuda'], ['Emergencias, apoyo a migrantes y denuncias.', 'Emergencies, migrant support and reporting.', 'Emergências, apoio a migrantes e denúncias.'], 'emergency help ayuda ajuda salud crisis'],
 ['/servicios', ['Servicios del día a día', 'Everyday services', 'Serviços do dia a dia'], ['Lavanderías, cajeros, trámites y servicios del hogar.', 'Laundry, ATMs, errands and home services.', 'Lavanderias, caixas e serviços para casa.'], 'lavanderia laundry banco atm cajero cambio currency'],
] as const

export async function searchCatalog(locale: string): Promise<SearchItem[]> {
 const i = { es: 0, en: 1, pt: 2 }[arrivalLocale(locale)]
 const kinds = [['Guía', 'Guide', 'Guia'], ['Lugar', 'Place', 'Lugar'], ['Ruta', 'Route', 'Roteiro'], ['Servicio', 'Service', 'Serviço']]
 const results = await Promise.allSettled([
   sanityFetch<(GuideCard & { body?: { children?: { text?: string }[] }[] })[]>(searchGuidesQuery, { locale }),
   allPlaces(locale),
   sanityFetch<Ruta[]>(rutasQuery, { locale }),
 ])
 const guides = results[0].status === 'fulfilled' ? results[0].value : []
 const places = results[1].status === 'fulfilled' ? results[1].value : []
 const routes = results[2].status === 'fulfilled' ? results[2].value : []
 const catalog: SearchItem[] = curated.map(([href, titles, summaries, keywords]) => ({ href, title: titles[i], summary: summaries[i], keywords, kind: kinds[0][i] }))
 catalog.push({ href: 'https://www.gub.uy/tramites/solicitud-ingreso-mascotas-uruguay', title: ['Venir con mascotas', 'Arriving with pets', 'Chegar com animais de estimação'][i], summary: ['Requisitos oficiales de ingreso de mascotas.', 'Official pet entry requirements.', 'Requisitos oficiais para entrada de animais.'][i], keywords: 'perro mascota gato cachorro dog pet pets animais', kind: kinds[0][i] })
 for (const guide of guides.filter(guide => guide.status === 'ready')) catalog.push({ href: '/guias/' + guide.slug.current, title: guide.title, summary: guide.summary, keywords: [guide.tags?.join(' '), ...(guide.body?.flatMap(block => block.children?.map(child => child.text ?? '') ?? []) ?? [])].join(' '), kind: kinds[0][i] })
 for (const place of places) catalog.push({ href: featuredPlaceSlugs.some(slug => slug === place.slug.current) ? '/vivir/lugares/' + place.slug.current : '/vivir?place=' + place.slug.current, title: place.title, summary: place.tagline, keywords: place.region, kind: kinds[1][i] })
 const routeMap = new Map([...routes, ...regionalRoutes(locale)].map(route => [route.slug.current, route]))
 for (const route of routeMap.values()) catalog.push({ href: '/conocer-uruguay?ruta=' + route.slug.current, title: route.title, summary: route.teaser ?? route.itinerary?.[0]?.content ?? '', keywords: [route.interestLabel, ...route.stops ?? []].join(' '), kind: kinds[2][i] })
 for (const [id, titles, descriptions, links] of serviceGroups) {
   catalog.push({ href: '/servicios#' + id, title: titles[i], summary: descriptions[i], keywords: titles.join(' '), kind: kinds[3][i] })
   for (const [name, href] of links) catalog.push({
     href, title: typeof name === 'string' ? name : name[i], summary: descriptions[i],
     keywords: titles.join(' '), kind: kinds[3][i],
   })
 }
 const listings: Listing[] = [directories.cafes, directories.cowork, directories.social, directories.founders, directories.transport, directories.stays, directories.trips, directories.creators, directories.agenda, directories.interiorAgenda, directories.football].flat()
 const services: Listing[] = [...colivings(locale), ...listings]
 for (const item of services) {
   const href = item.href ?? (item.map ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.map) : undefined)
   if (href) catalog.push({ href, title: item.title, summary: item.description, keywords: item.region + ' ' + item.kind, kind: kinds[3][i] })
 }
 for (const [label, href] of Object.entries(directories.arrivalLinks)) {
   const names: Record<string, string> = { prex: 'Prex', midinero: 'Midinero', claroEsim: 'Claro eSIM', antel: 'Antel', tigo: 'Tigo', claro: 'Claro' }
   catalog.push({ href, title: names[label], summary: ['Trámite y requisitos en el sitio del proveedor.', 'Details and requirements on the provider’s site.', 'Informações e requisitos no site do prestador.'][i], keywords: 'chip esim sim celular movil tarjetas prepagas prepaid cartao internet', kind: kinds[3][i] })
 }
 const unique = new Map<string, SearchItem>()
 for (const item of catalog) {
   const previous = unique.get(item.href)
   unique.set(item.href, previous ? {
     ...previous, keywords: [previous.keywords, item.title, item.summary, item.keywords].join(' '),
   } : item)
 }
 return [...unique.values()]
}
