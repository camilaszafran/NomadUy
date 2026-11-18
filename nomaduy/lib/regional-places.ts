import type { Place } from '@/types/place'
import { arrivalLocale } from '@/lib/arrival-links'
import { sanityFetch, placesQuery } from '@/lib/sanity'

const places = [
  [
    "atlantida",
    "Atlántida",
    "Canelones",
    [
      3,
      2,
      2
    ],
    "Costa de Oro, playa y arquitectura",
    "Gold Coast beaches and architecture",
    "Praias e arquitetura na Costa de Oro",
    "Recorré la rambla y acercate a El Águila, en Villa Argentina. Para una estadía larga, comprobá el ómnibus y el tiempo de traslado a Montevideo desde la dirección donde pensás alquilar.",
    "Walk the waterfront and visit El Águila in nearby Villa Argentina. For a longer stay, check buses and the commute to Montevideo from the address you are considering.",
    "Passeie pela orla e visite El Águila, na vizinha Villa Argentina. Para ficar mais tempo, confira os ônibus e o deslocamento a Montevidéu a partir do endereço do imóvel."
  ],
  [
    "piriapolis",
    "Piriápolis",
    "Maldonado",
    [
      3,
      3,
      2
    ],
    "Rambla, playa y cerros",
    "Waterfront, beaches and hills",
    "Orla, praia e morros",
    "Caminá por la rambla y subí al Cerro San Antonio. Si buscás un alquiler mensual, preguntá si la tarifa y la disponibilidad cambian en verano.",
    "Walk the waterfront and head up Cerro San Antonio. For a monthly rental, ask how availability and rates change in summer.",
    "Caminhe pela orla e suba o Cerro San Antonio. Para aluguel mensal, pergunte se a disponibilidade e o preço mudam no verão.",
    "https://maldonado.gub.uy/pagina/piriapolis"
  ],
  [
    "la-paloma",
    "La Paloma",
    "Rocha",
    [
      3,
      2,
      2
    ],
    "Playas atlánticas y el faro de Cabo Santa María",
    "Atlantic beaches and the Cabo Santa María lighthouse",
    "Praias atlânticas e o farol do Cabo Santa María",
    "Combiná el faro con las playas de la bahía o La Balconada. Si vas a trabajar desde ahí fuera del verano, probá la conexión del alojamiento y revisá qué servicios quedan cerca.",
    "Visit the lighthouse and the bay beaches or La Balconada. If you work remotely outside summer, test your accommodation’s internet and check which services are nearby.",
    "Visite o farol e as praias da baía ou La Balconada. Se for trabalhar fora do verão, teste a internet da hospedagem e veja quais serviços ficam perto.",
    "https://www.gub.uy/ministerio-defensa-nacional/sites/ministerio-defensa-nacional/files/2022-08/sugerencias%20fin%20de%20semana%2005%20de%20agosto.pub_.pdf"
  ],
  [
    "minas",
    "Minas",
    "Lavalleja",
    [
      2,
      3,
      3
    ],
    "Una base urbana para recorrer las sierras",
    "An urban base for exploring the hills",
    "Uma base urbana para explorar as serras",
    "Usá Minas como base para visitar Villa Serrana y las sierras de Lavalleja. Antes de alquilar en las afueras, confirmá cómo llegar al centro y qué cobertura de internet tiene el domicilio.",
    "Use Minas as a base for Villa Serrana and the Lavalleja hills. Before renting outside town, check connections to the centre and home internet coverage.",
    "Use Minas como base para visitar Villa Serrana e as serras de Lavalleja. Antes de alugar nos arredores, confira o acesso ao centro e a cobertura de internet."
  ],
  [
    "melo",
    "Melo",
    "Cerro Largo",
    [
      2,
      3,
      3
    ],
    "Capital departamental del noreste",
    "A regional capital in northeastern Uruguay",
    "Capital departamental no nordeste uruguaio",
    "Recorré el centro de Melo y, si querés conocer la frontera, planificá otra salida hacia Río Branco. Para instalarte, compará alquileres a distancia caminable de comercios y servicios.",
    "Explore central Melo and plan a separate outing to Río Branco if you want to visit the border. For a longer stay, compare rentals within walking distance of shops and services.",
    "Explore o centro de Melo e programe um passeio separado a Río Branco para conhecer a fronteira. Para morar, compare aluguéis perto de comércios e serviços."
  ],
  [
    "rivera",
    "Rivera",
    "Rivera",
    [
      2,
      4,
      4
    ],
    "Vida de frontera con Santana do Livramento",
    "Border life alongside Santana do Livramento",
    "Vida de fronteira com Santana do Livramento",
    "Empezá por la Plaza Internacional y reservá otra salida para el Valle del Lunarejo. Si vas a vivir cerca de la frontera, verificá cómo funciona el roaming de tu plan.",
    "Start at the International Square and plan a separate trip to Valle del Lunarejo. If you live near the border, check how roaming works on your mobile plan.",
    "Comece pela Praça Internacional e planeje outro passeio ao Vale do Lunarejo. Se for morar perto da fronteira, confira como funciona o roaming do seu plano."
  ],
  [
    "salto",
    "Salto",
    "Salto",
    [
      2,
      4,
      4
    ],
    "Ciudad del litoral y escapadas termales",
    "A riverside city with nearby hot springs",
    "Cidade do litoral com águas termais por perto",
    "Elegí entre alojarte en la ciudad o cerca de las termas del Daymán. Si vas sin auto, averiguá cómo llegar a las termas desde el alojamiento y cómo volver.",
    "Choose between staying in the city and near the Daymán hot springs. If you are travelling without a car, check the trip from your accommodation and the return option.",
    "Escolha entre ficar na cidade e perto das termas de Daymán. Se estiver sem carro, confira como ir e voltar das termas a partir da hospedagem.",
    "https://www.turismo.salto.gub.uy/"
  ],
  [
    "mercedes",
    "Mercedes",
    "Soriano",
    [
      2,
      3,
      3
    ],
    "Rambla y vida junto al río Negro",
    "Waterfront life on the Río Negro",
    "Orla e vida às margens do rio Negro",
    "Caminá por la rambla y recorré el centro. Para una estadía larga, compará un alquiler cerca de la costa con otro a distancia caminable de los servicios que usás a diario.",
    "Walk the waterfront and explore the town centre. For a longer stay, compare a riverside rental with one within walking distance of the services you use every day.",
    "Caminhe pela orla e visite o centro. Para ficar mais tempo, compare um aluguel perto do rio com outro a uma distância a pé dos serviços que você usa no dia a dia."
  ],
  [
    "fray-bentos",
    "Fray Bentos",
    "Río Negro",
    [
      2,
      3,
      3
    ],
    "Patrimonio industrial y costa del río Uruguay",
    "Industrial heritage and the Uruguay River",
    "Patrimônio industrial e costa do rio Uruguai",
    "Visitá el Paisaje Industrial y el Barrio Anglo; Las Cañas es otra salida cercana. Si venís por el puente desde Argentina, coordiná el traslado final hasta el alojamiento.",
    "Visit the Industrial Landscape and the Anglo neighbourhood; Las Cañas is another nearby outing. If arriving via the bridge from Argentina, arrange the last leg to your accommodation.",
    "Visite a Paisagem Industrial e o Bairro Anglo. Las Cañas é outro passeio próximo. Se vier pela ponte da Argentina, organize o último trecho até a hospedagem.",
    "https://destinorionegro.gub.uy/fray-bentos-2/"
  ],
  [
    "san-gregorio-de-polanco",
    "San Gregorio de Polanco",
    "Tacuarembó",
    [
      2,
      1,
      1
    ],
    "Murales y playas sobre el río Negro",
    "Murals and beaches on the Río Negro",
    "Murais e praias no rio Negro",
    "Recorré el museo abierto de murales y las playas del río Negro. Para quedarte fuera de temporada, confirmá transporte, comercios abiertos y conexión a internet antes de reservar.",
    "Explore the open-air mural museum and the Río Negro beaches. For an off-season stay, check transport, open shops and internet access before booking.",
    "Explore o museu de murais a céu aberto e as praias do rio Negro. Para ficar fora da temporada, confirme o transporte, o comércio aberto e a internet antes de reservar."
  ]
] as const

export const featuredPlaceSlugs = places.map(([slug]) => slug)

export function regionalPlaces(locale: string): Place[] {
  const language = arrivalLocale(locale)
  return places.map(([slug, title, region, [costOfLiving, urbanRural, population], es, en, pt, esBody, enBody, ptBody, source]) => ({
    _id: 'regional-' + slug,
    slug: { current: slug },
    title,
    region,
    costOfLiving, urbanRural, population,
    tagline: { es, en, pt }[language],
    description: { es: esBody, en: enBody, pt: ptBody }[language],
    placeholderGradient: urbanRural <= 2 ? 'linear-gradient(140deg,#0b495c,#397c78)' : 'linear-gradient(140deg,#173760,#466788)',
    links: [{
      label: { es: 'Fuente turística oficial', en: 'Official tourism information', pt: 'Informação turística oficial' }[language],
      category: 'other',
      url: source ?? 'https://uruguaynatural.com/es/destinos-regiones/',
    }],
  }))
}

export async function allPlaces(locale: string) {
  const existing = await sanityFetch<Place[]>(placesQuery, { locale })
  const bySlug = new Map(existing.map(place => [place.slug.current, place]))
  for (const place of regionalPlaces(locale)) {
    if (!bySlug.has(place.slug.current)) bySlug.set(place.slug.current, place)
  }
  return [...bySlug.values()]
}
