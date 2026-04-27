// Run with: node --env-file=.env.local scripts/update-rutas.mjs
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

let _k = 0
const key = () => `k${++_k}${Math.random().toString(36).slice(2, 7)}`

// ─── PATCHES FOR EXISTING ROUTES ─────────────────────────────────────────────

const updates = {

  'colonia-del-sacramento': {
    distance: '2h 45min en auto / 1h en ferry desde BA',
    vibe: 'Patrimonio UNESCO',
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'Cómo llegar',
        content: 'En auto desde Montevideo: 2h 45min por Ruta 1. En bus desde Terminal Tres Cruces: COPSA o Turil, ~2h 30min, unos $400 UYU (verificá precio actual en urubus.com.uy). También se puede llegar en ferry desde Buenos Aires: Seacat hace el trayecto en 1h a Colonia, muy usado por quienes vienen de Argentina. Buquebus también opera desde Montevideo.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Mañana — Barrio Histórico',
        content: 'Llegás temprano y caminás el barrio sin apuro. Empezá en la Plaza Mayor y su museo de arqueología colonial. La Calle de los Suspiros (empedrada, con faroles de hierro) es la más fotografiada. Las ruinas del Convento de San Francisco son del siglo XVII. El Portón de Campo —la entrada original de la ciudad muralla— te da la escala de lo que fue esta ciudad. Todo el casco histórico es Patrimonio UNESCO desde 1995. Tardás 2 horas en verlo bien si caminás despacio.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Mediodía — Faro y Puerto',
        content: 'Subí al Faro (construido sobre las ruinas de un convento) para la mejor vista del Río de la Plata. En días despejados se ve Buenos Aires al fondo — 45km de agua entre ambas capitales. Bajá al Puerto Viejo: los barcos coloridos de los pescadores locales, las gaviotas. La zona tiene varios restaurantes con terraza al río; el mediodía es perfecto para comer mariscos o pasta fresca.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Tarde — Casas históricas y vuelta',
        content: 'Recorrés el museo del Azulejo portugués y la Casa Nacarello. Heladería artesanal en Calle Real antes de salir. Si viajás en auto y salís antes de las 17h llegás a Montevideo antes de la noche. Si querés quedarte, el atardecer sobre el río desde el puerto viejo es uno de los mejores del país. Muchas personas hacen este viaje en una sola jornada desde Buenos Aires vía ferry.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Ver hoteles en Booking', url: 'https://www.booking.com/searchresults.es.html?ss=Colonia+del+Sacramento%2C+Uruguay' },
      { _type: 'object', _key: key(), label: 'Ver alquileres en Airbnb', url: 'https://www.airbnb.com/s/Colonia-del-Sacramento--Uruguay/homes' },
      { _type: 'object', _key: key(), label: 'Turismo Colonia (oficial)', url: 'https://asociacionturisticacolonia.com.uy/' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Barrio Histórico (Patrimonio UNESCO)', url: 'https://whc.unesco.org/en/list/747/' },
      { _type: 'object', _key: key(), label: 'Faro de Colonia', url: 'https://www.google.com/maps/search/Faro+de+Colonia+del+Sacramento' },
      { _type: 'object', _key: key(), label: 'Ferry desde Buenos Aires — Seacat', url: 'https://www.seacatcolonia.com.uy/' },
      { _type: 'object', _key: key(), label: 'Ferry Buquebus', url: 'https://www.buquebus.com/' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'El Drugstore (cocina cuidada, centro histórico)', url: 'https://www.tripadvisor.com/Restaurant_Review-g312724-d1013543-Reviews-El_Drugstore-Colonia_del_Sacramento_Colonia_Department.html' },
      { _type: 'object', _key: key(), label: 'Mesón de la Plaza (clásico, terraza)', url: 'https://www.google.com/maps/search/Meson+de+la+Plaza+Colonia+del+Sacramento' },
      { _type: 'object', _key: key(), label: 'Restaurantes con vista al río', url: 'https://www.tripadvisor.com/Restaurants-g312724-Colonia_del_Sacramento_Colonia_Department.html' },
    ],
  },

  'punta-del-este-jose-ignacio': {
    distance: '1h 20min en auto',
    vibe: 'Costa & gastronomía',
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'Cómo llegar',
        content: 'En auto: Ruta Interbalnearia (Ruta 9), 1h 20min desde Montevideo. En bus desde Tres Cruces: COT o Buquebus Bus, 2h, ~$500 UYU. Temporada alta (diciembre–febrero): mucho tráfico los viernes. Si podés, viajá un sábado temprano o fuera de temporada (marzo–noviembre es más tranquilo y más barato).',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 1 — La Mano y las playas',
        content: 'La parada obligada primero: La Mano en la Arena, la escultura de Mario Irarrázabal enterrada en Playa Brava. Es el spot más fotografiado de Uruguay. La Brava tiene las olas del Atlántico (surfistas, corriente fuerte); La Mansa tiene agua tranquila sobre el Río de la Plata. Son literalmente dos mares distintos separados por la punta del cabo. Para el atardecer, movete a Punta Ballena: Casapueblo (la obra de Carlos Páez Vilaró) organiza un ritual diario al atardecer con su pintura y música. Vale mucho la visita.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 1 noche — Puerto de Punta del Este',
        content: 'El puerto viejo tiene los mejores restaurantes de la ciudad. Lo de Tere es el clásico: mariscos, fresco, sin glamour exagerado. En verano toda la zona tiene ambiente hasta tarde. Fuera de temporada es mucho más tranquilo — los restaurantes siguen abiertos pero con otra energía, más local. El centro comercial Punta Shopping está a 5 minutos si necesitás algo.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 2 — José Ignacio',
        content: 'El pueblo tiene unas 800 casas y un ambiente completamente diferente a Punta. Llegá antes del mediodía para caminar la playa vacía (en temporada se llena). El faro de José Ignacio es pequeño pero da buenas vistas. La experiencia gastronómica más famosa de Uruguay está acá: La Huella, con los pies en la arena. En temporada alta necesitás reservar semanas antes. Hay otras opciones más accesibles en el pueblo. De vuelta, Piriápolis es una parada interesante: la ciudad balnearia original de Uruguay, art-déco, mucho más familiar y tranquila que Punta.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Ver hoteles en Booking', url: 'https://www.booking.com/searchresults.es.html?ss=Punta+del+Este%2C+Uruguay' },
      { _type: 'object', _key: key(), label: 'Ver alquileres en Airbnb', url: 'https://www.airbnb.com/s/Punta-del-Este--Uruguay/homes' },
      { _type: 'object', _key: key(), label: 'Opciones en Piriápolis (más barato)', url: 'https://www.booking.com/searchresults.es.html?ss=Piri%C3%A1polis%2C+Uruguay' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Casapueblo (visita + atardecer)', url: 'https://www.tripadvisor.com/Attraction_Review-g312740-d316792-Reviews-Casapueblo-Punta_del_Este_Maldonado_Department.html' },
      { _type: 'object', _key: key(), label: 'La Mano en la Arena (Playa Brava)', url: 'https://www.google.com/maps/search/La+Mano+en+la+Arena+Playa+Brava+Punta+del+Este' },
      { _type: 'object', _key: key(), label: 'Faro José Ignacio', url: 'https://www.google.com/maps/search/Faro+Jose+Ignacio+Uruguay' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'La Huella — José Ignacio (reservar)', url: 'https://www.lahuella.com.uy/' },
      { _type: 'object', _key: key(), label: 'Lo de Tere — Puerto', url: 'https://www.google.com/maps/search/Lo+de+Tere+Punta+del+Este' },
      { _type: 'object', _key: key(), label: 'Restaurantes en Punta del Este', url: 'https://www.tripadvisor.com/Restaurants-g312740-Punta_del_Este_Maldonado_Department.html' },
    ],
  },

  'cabo-polonio': {
    distance: '4h en bus + 20min en jeep 4x4',
    vibe: 'Off-grid, sin electricidad de red',
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'Cómo llegar',
        content: 'Bus desde Terminal Tres Cruces hasta el km 264 de Ruta 10 (COPSA o similar). Desde ese punto, hay camionetas 4x4 que cruzan los 9 km de dunas hasta el cabo. Las camionetas salen cuando se llenan (~$500 UYU ida, verificá precio actual). En temporada alta (enero–febrero) hay muchos turnos; fuera de temporada los horarios son más limitados — consultá con el alojamiento antes de ir. Cabo Polonio es un Área Protegida del SNAP (Sistema Nacional de Áreas Protegidas). No hay carreteras de acceso público ni electricidad de red.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 1 — Llegada y primeras horas',
        content: 'Llegás al cabo y lo primero que notás es el silencio. Sin semáforos, sin autos, sin wifi. Dejás la mochila en el alojamiento (hostels y cabañas simples con energía solar o velas). El pueblo tiene unas pocas casas, una estación de guardaparques y dos o tres puestos de comida. La colonia de lobos marinos —de dos pelos (Arctocephalus australis)— vive en las rocas junto al faro: cientos de animales a metros de distancia. El Faro de Cabo Polonio se puede visitar en horario habitual (consultá el día que viajás). La primera noche, si hay luna creciente o llena, las dunas brillan. Si no hay luna: el cielo estrellado es de los mejores de Uruguay.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 2 — Dunas y playas vírgenes',
        content: 'Por la mañana caminás hacia el norte: las dunas grandes están a unos 2 km del pueblo. No hay marcas, vas por la arena. Las playas a ambos lados del cabo son completamente vírgenes. En verano el agua del Atlántico está fría pero se puede nadar. En invierno no nadás, pero la experiencia es más salvaje y hay mucho menos gente. Las opciones de comida son limitadas: los puestos del pueblo sirven platos simples. Llevá snacks. La vuelta en camioneta tiene horarios fijos — tu alojamiento te va a decir cuáles. Reservá el turno con anticipación en temporada alta.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Alojamientos en Airbnb', url: 'https://www.airbnb.com/s/Cabo-Polonio--Uruguay/homes' },
      { _type: 'object', _key: key(), label: 'Opciones en Booking', url: 'https://www.booking.com/searchresults.es.html?ss=Cabo+Polonio%2C+Uruguay' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'SNAP — Área Protegida Cabo Polonio', url: 'https://vidasilvestre.org.uy' },
      { _type: 'object', _key: key(), label: 'Faro de Cabo Polonio', url: 'https://www.google.com/maps/search/Faro+Cabo+Polonio' },
      { _type: 'object', _key: key(), label: 'Turismo Rocha (oficial)', url: 'https://turismorocha.gub.uy/' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Restaurantes en Cabo Polonio', url: 'https://www.tripadvisor.com/Restaurants-g1808260-Cabo_Polonio_Rocha_Department.html' },
    ],
  },

  'termas-de-salto': {
    distance: '5h en auto o bus nocturno desde Tres Cruces',
    vibe: 'Termas & ciudad auténtica',
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'Cómo llegar',
        content: 'En auto: Ruta 3 hasta Salto, ~5h. En bus: varias empresas desde Terminal Tres Cruces (EGA, Turil, Cita), tanto diurnos como nocturnos. El bus nocturno es cómodo: salís a las 22–23h y llegás de mañana, ahorrás una noche de alojamiento. Precio aproximado: $800–1,100 UYU (verificá en urubus.com.uy). Termas del Daymán está a 8km del centro de Salto — el alojamiento suele estar en el mismo complejo o muy cerca.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 1 — Termas del Daymán',
        content: 'El Complejo Termas del Daymán es el más grande del país: 11+ piletas con agua termal entre 28°C y 42°C, zona de niños, jacuzzis al aire libre y cubiertos, sector adultos, restaurante. El agua sale de la tierra a temperatura natural. En invierno (mayo–agosto) es la experiencia máxima: aire frío afuera, agua caliente. En verano también funciona pero tiene más gente. Podés quedarte en el complejo mismo (cabañas, hotel) o en alojamientos en el pueblo de Daymán a 2km. Si querés algo más natural y tranquilo, Termas de Salto Grande (13km de Salto) tiene una atmósfera más selvática junto al embalse.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 2 — Ciudad de Salto',
        content: 'Salto es la segunda ciudad de Uruguay y tiene su propio ritmo, completamente diferente a Montevideo. El casco histórico tiene arquitectura de principios del siglo XX. El Mercado Central es el punto de encuentro: desayunás bien y comprás algo local. La costanera del Río Uruguay (el río que divide Uruguay de Argentina) es ideal para caminar al atardecer. El Parque Harriague tiene plantaciones de palmas Yatay —autóctonas— y es bueno para picnic. La Represa de Salto Grande (12km del centro) es una obra de ingeniería binacional que vale conocer.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Complejo Termas del Daymán (alojamiento propio)', url: 'https://www.termasdeldayman.com/' },
      { _type: 'object', _key: key(), label: 'Alojamientos en Airbnb — Salto', url: 'https://www.airbnb.com/s/Salto--Uruguay/homes' },
      { _type: 'object', _key: key(), label: 'Hoteles en Booking — Salto', url: 'https://www.booking.com/searchresults.es.html?ss=Salto%2C+Uruguay' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Termas del Daymán (oficial)', url: 'https://www.termasdeldayman.com/' },
      { _type: 'object', _key: key(), label: 'Termas de Salto Grande', url: 'https://turismo.salto.gub.uy/termal' },
      { _type: 'object', _key: key(), label: 'Turismo Salto (oficial)', url: 'https://turismo.salto.gub.uy/' },
      { _type: 'object', _key: key(), label: 'Destino Termas Uruguay', url: 'https://destinotermas.gub.uy/' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Restaurante en Termas del Daymán', url: 'https://www.termasdeldayman.com/' },
      { _type: 'object', _key: key(), label: 'Mercado Central de Salto', url: 'https://www.google.com/maps/search/Mercado+Central+Salto+Uruguay' },
      { _type: 'object', _key: key(), label: 'Restaurantes en Salto', url: 'https://www.tripadvisor.com/Restaurants-g312734-Salto_Salto_Department.html' },
    ],
  },

  'ciudad-vieja-puerto': {
    distance: 'Dentro de Montevideo — a pie o en bus',
    vibe: 'Historia, murales y mercado',
    teaser: 'El corazón histórico de Montevideo. Mercado del Puerto, murales, arquitectura art-déco y el mejor chivito de la ciudad. Una jornada perfecta sin salir de la capital.',
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'Mañana — Ciudad Vieja',
        content: 'Empezá en la Plaza Independencia: el Palacio Salvo (el edificio más emblemático de Uruguay, art-déco, terminado en 1928), la estatua ecuestre de Artigas y el Mausoleo bajo ella. Caminá por la peatonal Sarandí hacia Ciudad Vieja: el Teatro Solís —uno de los más importantes de América del Sur— tiene visitas guiadas gratuitas algunos días. La Ciudad Vieja está llena de murales callejeros de altísimo nivel. El Museo Torres García (Sarandí 683) es uno de los mejores museos del país, pequeño, manejable y gratuito los domingos.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Mediodía — Mercado del Puerto',
        content: 'El sábado al mediodía, el Mercado del Puerto es el lugar. Parrilladas encendidas, humo, el ruido de la carne, milonga de fondo. No es barato pero es la experiencia culinaria más uruguaya que existe: una tablita con asado, chorizos y morcilla, un medio y medio (champagne + vino blanco). Entre semana también abre, con menos ambiente pero misma calidad. La madrugada siguiente al sábado es cuando el Mercado tiene su mayor fervor. Si querés algo más barato: la Feria de Tristán Narvaja (domingo en el barrio Cordón) es el mercado de pulgas más famoso de Montevideo.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Tarde — Rambla y Cerro',
        content: 'La Rambla de Montevideo tiene 22km de paseo costero. Desde Ciudad Vieja podés caminar hacia el este por la Rambla Sur. El Cerro de Montevideo (al otro lado de la bahía) tiene la única fortaleza militar del país y vistas panorámicas de la ciudad. Se llega en bus desde Ciudad Vieja (~30min). Para el atardecer, quedarte en el muelle de Ciudad Vieja o caminar hacia el puerto nuevo —hay bares informales con buenas vistas.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Hoteles en Montevideo (Booking)', url: 'https://www.booking.com/searchresults.es.html?ss=Ciudad+Vieja%2C+Montevideo%2C+Uruguay' },
      { _type: 'object', _key: key(), label: 'Airbnb en Ciudad Vieja y alrededores', url: 'https://www.airbnb.com/s/Ciudad-Vieja--Montevideo--Uruguay/homes' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Mercado del Puerto', url: 'https://www.mercadodelpuerto.com/' },
      { _type: 'object', _key: key(), label: 'Teatro Solís (visitas guiadas)', url: 'https://www.teatrosolis.org.uy/' },
      { _type: 'object', _key: key(), label: 'Museo Torres García', url: 'https://www.torresgarcia.org.uy/' },
      { _type: 'object', _key: key(), label: 'Rambla de Montevideo', url: 'https://www.google.com/maps/search/Rambla+Montevideo' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Mercado del Puerto (parrilladas)', url: 'https://www.mercadodelpuerto.com/' },
      { _type: 'object', _key: key(), label: 'Mercado Agrícola de Montevideo (MAM)', url: 'https://mam.com.uy/' },
      { _type: 'object', _key: key(), label: 'Restaurantes en Ciudad Vieja', url: 'https://www.tripadvisor.com/Restaurants-g312741-Montevideo_Montevideo_Department.html' },
    ],
  },

  'punta-del-diablo': {
    distance: '4h 30min en auto o bus',
    vibe: 'Pueblo de pescadores & naturaleza',
    teaser: 'El pueblo de pescadores que se convirtió en el favorito de los viajeros. Casas de madera, olas bravas y el Parque Santa Teresa a 12km. El Rocha más auténtico.',
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'Cómo llegar',
        content: 'En auto desde Montevideo: Ruta Interbalnearia (Ruta 9) hasta Rocha, luego Ruta 10 norte hasta Punta del Diablo. Total ~4h 30min. En bus: COPSA desde Tres Cruces con parada en Punta del Diablo, ~5h. El pueblo no tiene cajero automático confiable — llevá efectivo. En temporada alta (enero–febrero) está muy lleno; la mejor época para ir es noviembre–diciembre o marzo–abril: buen clima, menos gente.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 1 — Parque Nacional Santa Teresa',
        content: 'Si llegás temprano, pasá primero por el Parque Nacional Santa Teresa (12km antes de Punta del Diablo). Es uno de los mejores parques del Uruguay: la Fortaleza de Santa Teresa (colonial, del siglo XVIII), el vivero de plantas autóctonas, playas largas y con poca gente dentro del parque, y bosques de pinos y eucaliptos. Entrada libre. Hay camping. Las playas dentro del parque (Playa Grande de Santa Teresa) son las mejores de la zona.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 1 tarde — Llegada al pueblo',
        content: 'El pueblo de Punta del Diablo en sí es pequeño: unas pocas calles de tierra, casas de madera pintadas de colores, la Playa de los Pescadores donde los barcos todavía salen de madrugada. La Playa Grande tiene olas buenas para surf (hay escuelas). El ambiente de noche en temporada es joven, informal, mucha hoguera en la playa.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 2 — Laguna Negra y vuelta',
        content: 'La Laguna Negra está a 30km al norte, camino a Castillos. No es muy conocida pero es enorme (la segunda laguna más grande de Uruguay) y tiene birdwatching notable. De vuelta parás en La Paloma o La Pedrera si querés otra playa en el camino. La Pedrera tiene un ambiente boutique y tranquilo, muy diferente a Punta del Diablo. Ambas son buenas opciones para dividir el regreso.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Alojamientos en Airbnb', url: 'https://www.airbnb.com/s/Punta-del-Diablo--Uruguay/homes' },
      { _type: 'object', _key: key(), label: 'Hospedajes en Booking', url: 'https://www.booking.com/searchresults.es.html?ss=Punta+del+Diablo%2C+Uruguay' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Parque Nacional Santa Teresa', url: 'https://www.google.com/maps/search/Parque+Nacional+Santa+Teresa+Uruguay' },
      { _type: 'object', _key: key(), label: 'Turismo Rocha (oficial)', url: 'https://turismorocha.gub.uy/' },
      { _type: 'object', _key: key(), label: 'Laguna Negra', url: 'https://www.google.com/maps/search/Laguna+Negra+Rocha+Uruguay' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Restaurantes en Punta del Diablo', url: 'https://www.tripadvisor.com/Restaurants-g2181897-Punta_del_Diablo_Rocha_Department.html' },
    ],
  },

  'carmelo-bodegas': {
    distance: '3h en auto',
    vibe: 'Enoturismo & Río de la Plata',
    teaser: 'La región vitivinícola más cercana a Montevideo. Bodegas boutique, olivares y el mejor asado con maridaje del país. El Tannat uruguayo en su ambiente natural.',
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'Cómo llegar y el camino',
        content: 'En auto: Ruta 1 hacia Colonia, luego Ruta 21 hacia Carmelo, ~3h. El camino por Ruta 21 ya pasa por paisaje de viñedos y estancias. Una opción más original: ferryboat desde Tigre (Buenos Aires) a Carmelo —una experiencia única que permite conectar Argentina con Uruguay de forma no convencional.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 1 — Bodegas y viñedos',
        content: 'Bodega Narbona es la más conocida: complejo de campo con bodega boutique, olivar, restaurante y hotel. El almuerzo en Narbona (cordero, pasta fresca, tabla de quesos) con maridaje de su Tannat es una experiencia gastronómica de alto nivel. Reservá con anticipación. Bodega Irurtia es más austera pero histórica — una de las más antiguas del país. Colonia Estrella hace quesos artesanales en la misma zona: vale la parada para comprar.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 2 — Carmelo y el río',
        content: 'Carmelo es una ciudad pequeña y tranquila a orillas del Río de la Plata (acá llamado "Arroyo Las Vacas"). Tiene un encanto colonial y muy poca presión turística. El casino, el puerto fluvial y la plaza central son los puntos de encuentro. Desde el puerto podés tomar el ferryboat a la isla Martín García (argentina), punto histórico de la región del Plata. De vuelta a Montevideo podés pasar por Colonia del Sacramento (1h) para completar el circuito.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Narbona Wine Lodge (enoturismo)', url: 'https://www.narbona.com.uy/' },
      { _type: 'object', _key: key(), label: 'Alojamientos en Airbnb — Carmelo', url: 'https://www.airbnb.com/s/Carmelo--Uruguay/homes' },
      { _type: 'object', _key: key(), label: 'Hoteles en Booking — Carmelo', url: 'https://www.booking.com/searchresults.es.html?ss=Carmelo%2C+Uruguay' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Bodega Narbona', url: 'https://www.narbona.com.uy/' },
      { _type: 'object', _key: key(), label: 'Bodega Irurtia', url: 'https://www.google.com/maps/search/Bodega+Irurtia+Uruguay' },
      { _type: 'object', _key: key(), label: 'Turismo Colonia (región)', url: 'https://asociacionturisticacolonia.com.uy/' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Restaurante Narbona (reservar)', url: 'https://www.narbona.com.uy/' },
      { _type: 'object', _key: key(), label: 'Colonia Estrella — quesos artesanales', url: 'https://www.google.com/maps/search/Colonia+Estrella+Quesos+Uruguay' },
    ],
  },

  'valle-del-lunarejo': {
    distance: '4h en auto hasta Tacuarembó + 1h más al valle',
    vibe: 'Gaucho & naturaleza remota',
    teaser: 'El secreto mejor guardado de Uruguay. Cañones, cascadas, vegetación subtropical y cero turistas. El lado del país que no aparece en ninguna guía.',
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'Día 1 — Viaje y Tacuarembó',
        content: 'La ruta hacia el norte de Uruguay ya es parte de la experiencia: campos abiertos, cuchillas (colinas suaves), ganado. Tacuarembó es la capital del departamento y el corazón de la cultura gaucha. La ciudad tiene varios museos de gaucho bien curados. Quedarte una noche en Tacuarembó antes de seguir al valle es la mejor estrategia. El Festival de la Patria Gaucha (marzo) es el más importante de la región: jineteada, artesanías, música folklórica, vestimenta tradicional. Si coincide con tu visita, no te lo pierdas.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 2 — Valle del Lunarejo',
        content: 'El Valle del Lunarejo está a 1h al norte de Tacuarembó, cerca de Rivera. Es una garganta subtropical completamente inesperada en Uruguay: palmeras, helechos, loros, cascadas. El paisaje rompe con la imagen del país plano de la costa. Hay senderos, pozas para bañarse y posadas rurales. La biodiversidad de aves es excepcional — birdwatchers de todo el país vienen acá. No hay muchas señales ni mapas: es útil ir con guía local o preguntar bien en la posada.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Días 3–4 — Rivera y frontera Brasil',
        content: 'Rivera es una ciudad única en el mundo: el centro del lado uruguayo es indistinguible del centro de Santana do Livramento (Brasil). Literalmente cruzás una calle y estás en otro país, sin control migratorio cotidiano para los locales. El comercio tiene precios mixtos (free shops uruguayos, mercados brasileños), la gastronomía es una fusión, y el idioma que escuchás es el "Portuñol" — mezcla oral de español y portugués que es lengua propia de la frontera.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Posadas rurales (Valle del Lunarejo)', url: 'https://www.lunarejo.uy' },
      { _type: 'object', _key: key(), label: 'Alojamientos en Tacuarembó (Booking)', url: 'https://www.booking.com/searchresults.es.html?ss=Tacuaremb%C3%B3%2C+Uruguay' },
      { _type: 'object', _key: key(), label: 'Airbnb — Rivera', url: 'https://www.airbnb.com/s/Rivera--Uruguay/homes' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Valle del Lunarejo (oficial)', url: 'https://www.lunarejo.uy' },
      { _type: 'object', _key: key(), label: 'Turismo Tacuarembó (oficial)', url: 'https://www.tacuaremboturismo.gub.uy/' },
      { _type: 'object', _key: key(), label: 'AllTrails — senderos Uruguay', url: 'https://www.alltrails.com/uruguay' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Restaurantes en Tacuarembó', url: 'https://www.tripadvisor.com/Restaurants-g312731-Tacuarembo_Tacuarembo_Department.html' },
    ],
  },
}

// ─── 4 NEW HIDDEN GEM ROUTES ─────────────────────────────────────────────────

const newRoutes = [

  // ─── HIDDEN GEM 1: LAVALLEJA ─────────────────────────────────────────────
  {
    _type: 'ruta',
    title: 'Lavalleja — Villa Serrana & Grutas del Palacio',
    slug: { _type: 'slug', current: 'lavalleja-villa-serrana-grutas' },
    duration: 'Fin de semana',
    distance: '1h 30min en auto',
    vibe: 'Geología & aldea de montaña',
    interestLabel: 'Naturaleza',
    teaser: 'A solo 90 minutos de Montevideo, el Uruguay que parece otro país. Grutas de basalto columnar, un pueblo diseñado por un arquitecto de culto y termas naturales escondidas en el monte.',
    stops: ['Grutas del Palacio', 'Villa Serrana', 'Cerro Arequita', 'Manantiales Serranos'],
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'Cómo llegar — la ventaja de Lavalleja',
        content: 'Lavalleja es el secreto mejor guardado cerca de Montevideo: a solo 1h 30min por Ruta 8 hacia el este. La capital del departamento es Minas, ciudad tranquila y auténtica que actúa como base. En bus: COPSA desde Tres Cruces hasta Minas, ~1h 30min, muy frecuente. Desde Minas hay combis y taxis hacia los diferentes atractivos. Con auto es mucho más flexible.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 1 — Grutas del Palacio (Geoparque)',
        content: 'Las Grutas del Palacio son uno de los sitios geológicos más únicos de Uruguay: columnas de basalto hexagonal de millones de años, similares a las de Irlanda del Norte o Islandia pero completamente desconocidas por los turistas. Es un Geoparque con aspiración UNESCO. La entrada es económica y hay guías locales disponibles. El paisaje alrededor es de sierras bajas, montes nativos y silencio total. A 15km está el Cerro Arequita, con cuevas y vistas panorámicas de las sierras del este — se puede escalar acompañado.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 2 — Villa Serrana',
        content: 'Villa Serrana es un pueblo de 200 personas diseñado por el arquitecto uruguayo Julio Vilamajó en los años 40: casas de piedra y madera integradas al paisaje, sin electricidad de red en las zonas más remotas, senderos entre arroyos y cascadas. Es posiblemente el lugar más bello del interior de Uruguay y casi nadie lo conoce. Hay posadas pequeñas, almuerzos caseros, kayak en el arroyo. El ambiente es muy tranquilo: los mismos vecinos te orientan.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Opcional — Manantiales Serranos',
        content: 'A 20km de Minas, el complejo Manantiales Serranos tiene termas naturales en un entorno de monte nativo. Completamente diferente a las termas industriales del norte: aquí es una piscina termal al aire libre con vista a las sierras, sin multitudes. Hay camping, cabaña y restaurante. Muy recomendado para cerrar el fin de semana antes de volver a Montevideo.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Posadas en Villa Serrana (Airbnb)', url: 'https://www.airbnb.com/s/Villa-Serrana--Uruguay/homes' },
      { _type: 'object', _key: key(), label: 'Manantiales Serranos (termas + cabaña)', url: 'https://manantialesserranos.uy/' },
      { _type: 'object', _key: key(), label: 'Hoteles en Minas (Booking)', url: 'https://www.booking.com/searchresults.es.html?ss=Minas%2C+Uruguay' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Geoparque Grutas del Palacio', url: 'https://www.geoparque.uy/' },
      { _type: 'object', _key: key(), label: 'Cerro Arequita', url: 'https://www.google.com/maps/search/Cerro+Arequita+Lavalleja+Uruguay' },
      { _type: 'object', _key: key(), label: 'Turismo Lavalleja (oficial)', url: 'https://lavalleja.uy/' },
      { _type: 'object', _key: key(), label: 'AllTrails — senderos Lavalleja', url: 'https://www.alltrails.com/uruguay' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Manantiales Serranos (restaurante)', url: 'https://manantialesserranos.uy/' },
      { _type: 'object', _key: key(), label: 'Restaurantes en Minas', url: 'https://www.tripadvisor.com/Restaurants-g644248-Minas_Lavalleja_Department.html' },
    ],
  },

  // ─── HIDDEN GEM 2: QUEBRADA DE LOS CUERVOS ───────────────────────────────
  {
    _type: 'ruta',
    title: 'Quebrada de los Cuervos',
    slug: { _type: 'slug', current: 'quebrada-de-los-cuervos' },
    duration: 'Fin de semana',
    distance: '4h en auto hasta Treinta y Tres',
    vibe: 'Birdwatching & selva subtropical',
    interestLabel: 'Naturaleza',
    teaser: 'Uruguay tiene una garganta subtropical llena de buitres negros, loros y vegetación de otra latitud. La Quebrada de los Cuervos es el parque natural más sorprendente del país, y casi nadie sabe que existe.',
    stops: ['Quebrada principal', 'Mirador de buitres', 'Arroyo', 'Treinta y Tres'],
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'Cómo llegar',
        content: 'En auto: Ruta 8 este hacia Treinta y Tres, luego acceso indicado por Ruta 98. Total desde Montevideo: ~4h. Es un destino que requiere planificación: hay que contactar con la guardaparques antes de ir (SNAP) y el acceso puede variar según la época. No hay transporte público hasta el parque — necesitás auto o taxi desde Treinta y Tres. La ciudad de Treinta y Tres es la base: tranquila, auténtica, muy sin pretensiones turísticas.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 1 — La garganta',
        content: 'La Quebrada de los Cuervos es un Área Protegida del SNAP. Lo que hace única a esta garganta: en un país de llanuras y suaves cuchillas, de repente aparece un corte profundo de roca con vegetación subtropical que no deberías encontrar en esta latitud. Helechos arbóreos, palmeras butiá, montes cerrados con lianas. Y los cuervos: en realidad son buitres negros (Coragyps atratus) que anidan en las paredes rocosas. Al amanecer planean en grupos. Es uno de los mejores lugares de Uruguay para observar aves.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 2 — Senderismo y arroyos',
        content: 'Los senderos internos del parque permiten llegar al fondo de la quebrada, donde corre un arroyo con pozas de agua clara. En verano se puede nadar. En otoño el color de la vegetación es espectacular. Hay posibilidad de acampar dentro del parque (coordinar con SNAP). El tiempo de caminata desde el ingreso hasta el fondo y de vuelta son unas 3–4 horas. Llevá calzado de trekking, repelente y agua — no hay tiendas ni servicios dentro.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Alojamientos en Treinta y Tres (Airbnb)', url: 'https://www.airbnb.com/s/Treinta-y-Tres--Uruguay/homes' },
      { _type: 'object', _key: key(), label: 'Hoteles en Treinta y Tres (Booking)', url: 'https://www.booking.com/searchresults.es.html?ss=Treinta+y+Tres%2C+Uruguay' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'SNAP — Sistema Nacional de Áreas Protegidas', url: 'https://www.gub.uy/ministerio-ambiente/areas-protegidas' },
      { _type: 'object', _key: key(), label: 'Ministerio de Turismo Uruguay', url: 'https://turismo.gub.uy/' },
      { _type: 'object', _key: key(), label: 'AllTrails Uruguay (senderos GPS)', url: 'https://www.alltrails.com/uruguay' },
      { _type: 'object', _key: key(), label: 'Xperience Uruguay (trekking organizado)', url: 'https://www.xperience.uy/' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Restaurantes en Treinta y Tres', url: 'https://www.google.com/maps/search/restaurantes+Treinta+y+Tres+Uruguay' },
    ],
  },

  // ─── HIDDEN GEM 3: PAYSANDÚ ──────────────────────────────────────────────
  {
    _type: 'ruta',
    title: 'Paysandú & Termas del Litoral',
    slug: { _type: 'slug', current: 'paysandu-termas-litoral' },
    duration: 'Fin de semana',
    distance: '4h 30min en auto',
    vibe: 'Termas tranquilas & frontera argentina',
    interestLabel: 'Relax & Termas',
    teaser: 'Las termas menos conocidas de Uruguay, en la ciudad que mejor vive su carnaval. Paysandú es el litoral sin el turismo masivo de Salto, con paso de frontera a Argentina incluido.',
    stops: ['Termas de Guaviyú', 'Termas del Almirón', 'Centro histórico', 'Puente internacional'],
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'Cómo llegar',
        content: 'En auto desde Montevideo: Ruta 3 hacia el norte, ~4h 30min. En bus: Turil, Cita o Bussur desde Tres Cruces, ~4h. Paysandú es la tercera ciudad de Uruguay y la más importante del litoral norte. Hay un puente internacional que conecta con Colón, Argentina — algunos turistas hacen el cruce para ver las termas del lado argentino también (Colón tiene sus propias termas).',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 1 — Termas de Guaviyú',
        content: 'Las Termas de Guaviyú están a 60km al norte de Paysandú, en un entorno selvático junto al Río Uruguay. El complejo es mucho más natural que Daymán: las piletas están entre árboles, hay menos infraestructura y más tranquilidad. Las aguas salen a temperatura natural y tienen propiedades sulfurosas. En invierno es especialmente bueno. No hay tanta gente como en Salto. Hay cabañas en el complejo para alojarse.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Día 2 — Ciudad de Paysandú',
        content: 'Paysandú tiene uno de los carnavales más fuertes del interior uruguayo (febrero), con comparsas propias y mucha participación local. El casco histórico tiene arquitectura italiana de principios del siglo XX bien conservada. La costanera del Río Uruguay es larga y bien mantenida. El Puente Internacional General Artigas te lleva en 5 minutos a Colón, Argentina: otra moneda, otros precios, otra gastronomía. El intercambio binacional es algo especial para experimentar.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'Cabañas en Termas de Guaviyú', url: 'https://www.google.com/maps/search/Termas+de+Guaviyu+Uruguay' },
      { _type: 'object', _key: key(), label: 'Hoteles en Paysandú (Booking)', url: 'https://www.booking.com/searchresults.es.html?ss=Paysand%C3%BA%2C+Uruguay' },
      { _type: 'object', _key: key(), label: 'Airbnb en Paysandú', url: 'https://www.airbnb.com/s/Paysandú--Uruguay/homes' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Destino Termas Uruguay (oficial)', url: 'https://destinotermas.gub.uy/' },
      { _type: 'object', _key: key(), label: 'Destino Binacional Paysandú–Colón', url: 'https://www.destinobinacional.uy' },
      { _type: 'object', _key: key(), label: 'Termas de Almirón', url: 'https://www.google.com/maps/search/Termas+de+Almiron+Uruguay' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Restaurantes en Paysandú', url: 'https://www.tripadvisor.com/Restaurants-g312728-Paysandu_Paysandu_Department.html' },
      { _type: 'object', _key: key(), label: 'Gastronomía en Colón, Argentina (cruzando el puente)', url: 'https://www.google.com/maps/search/restaurantes+Colon+Entre+Rios+Argentina' },
    ],
  },

  // ─── HIDDEN GEM 4: BODEGAS DE CANELONES ─────────────────────────────────
  {
    _type: 'ruta',
    title: 'Ruta del Vino — Canelones',
    slug: { _type: 'slug', current: 'ruta-del-vino-canelones' },
    duration: '1 día',
    distance: '30–45min en auto desde Montevideo',
    vibe: 'Vino uruguayo & campo',
    interestLabel: 'Gastronomía',
    teaser: 'Las mejores bodegas de Uruguay están a media hora de Montevideo. El Tannat —la uva emblema del país— nació en Canelones. Una vuelta entera en un solo día sin salir de la región metropolitana.',
    stops: ['Bodega Bouza', 'Bodega Pisano', 'Bodega Juanicó', 'Bodega De Lucca'],
    itinerary: [
      {
        _type: 'object', _key: key(),
        day: 'El vino uruguayo — contexto',
        content: 'Uruguay es el cuarto productor de vino de América del Sur y el de mayor consumo per cápita de la región. La cepa emblema es el Tannat, originaria del suroeste de Francia, que en Uruguay encontró su tierra más famosa. El departamento de Canelones concentra el 60% de la producción vinícola del país. Lo bueno: las bodegas están tan cerca de Montevideo que podés hacer toda una ruta en un solo día.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Mañana — Bodega Bouza y Bodega Pisano',
        content: 'Bodega Bouza (a 20 minutos de Montevideo) es probablemente la más conocida entre los visitantes internacionales: tasting premium, colección de autos antiguos, arquitectura moderna. Requiere reserva. Bodega Pisano es una bodega familiar de altísima calidad, menos turística, más íntima. Sus Tannat y sus blends han ganado premios internacionales. El recorrido incluye la cava y el viñedo.',
      },
      {
        _type: 'object', _key: key(),
        day: 'Tarde — Juanicó y De Lucca',
        content: 'Bodega Juanicó (fundada en 1830) es la bodega histórica más grande del Uruguay. El casco principal es un establecimiento patrimonial. Hacen tours y tienen una tienda bien surtida. Bodega De Lucca es más artesanal y más cara — entre las más apreciadas por los sommeliers locales. Si tenés tiempo para una sola bodega "de culto", es esta. Para el almuerzo, varias bodegas tienen restorán en la propiedad o hay un par de parrilladas de campo en la zona. El regreso a Montevideo es antes del atardecer.',
      },
    ],
    stayLinks: [
      { _type: 'object', _key: key(), label: 'No es necesario alojarse (1 día desde Montevideo)', url: 'https://www.booking.com/searchresults.es.html?ss=Canelones%2C+Uruguay' },
    ],
    doLinks: [
      { _type: 'object', _key: key(), label: 'Bodega Bouza (reservar visita)', url: 'https://www.bodegabouza.com/' },
      { _type: 'object', _key: key(), label: 'Bodega Juanicó', url: 'https://www.juanico.com/' },
      { _type: 'object', _key: key(), label: 'Turismo Canelones — Ruta del Vino', url: 'https://atccanelones.com.uy/' },
      { _type: 'object', _key: key(), label: 'Bodegas Pisano', url: 'https://www.pisanowinery.com/' },
    ],
    eatLinks: [
      { _type: 'object', _key: key(), label: 'Restaurante en Bodega Bouza', url: 'https://www.bodegabouza.com/' },
      { _type: 'object', _key: key(), label: 'Parrilladas de campo en Canelones', url: 'https://www.google.com/maps/search/parrillada+Canelones+Uruguay' },
    ],
  },
]

// ─── RUNNER ──────────────────────────────────────────────────────────────────

async function main() {
  // 1. Patch existing routes
  const existing = await client.fetch(`*[_type == "ruta"]{ _id, "slug": slug.current }`)
  const bySlug = Object.fromEntries(existing.map(r => [r.slug, r._id]))

  console.log('Patching existing routes…')
  for (const [slug, patch] of Object.entries(updates)) {
    const id = bySlug[slug]
    if (!id) { console.log(`  ⚠  Not found: ${slug}`); continue }
    await client.patch(id).set(patch).commit()
    console.log(`  ✓  ${slug}`)
  }

  // 2. Create new routes (skip if slug exists)
  console.log('\nCreating new routes…')
  for (const ruta of newRoutes) {
    const slug = ruta.slug.current
    if (bySlug[slug]) { console.log(`  skip  ${ruta.title} (already exists)`); continue }
    await client.create(ruta)
    console.log(`  ✓  ${ruta.title}`)
  }

  console.log('\nDone.')
}

main().catch(err => { console.error(err); process.exit(1) })
