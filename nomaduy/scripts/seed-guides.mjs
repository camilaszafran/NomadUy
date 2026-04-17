// Run with: node --env-file=.env.local scripts/seed-guides.mjs
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// --- Portable Text helpers ---
let _k = 0
const key = () => `k${++_k}${Math.random().toString(36).slice(2, 6)}`

const h2 = (text) => ({
  _type: 'block', _key: key(), style: 'h2', markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})
const h3 = (text) => ({
  _type: 'block', _key: key(), style: 'h3', markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})
const p = (text) => ({
  _type: 'block', _key: key(), style: 'normal', markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})
const li = (text) => ({
  _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})
const oli = (text) => ({
  _type: 'block', _key: key(), style: 'normal', listItem: 'number', level: 1, markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})
const callout = (type, title, body) => ({ _type: 'callout', _key: key(), type, title, body })

// --- Guide content ---

const guides = [

  // ─────────────────────────────────────────────────────────
  // GUIDE 1: LEGAL & VISAS
  // ─────────────────────────────────────────────────────────
  {
    _type: 'guide',
    title: 'Legal & Visas',
    slug: { _type: 'slug', current: 'legal-visas' },
    status: 'ready',
    featured: false,
    order: 2,
    icon: 'scales',
    category: 'legal',
    tags: ['Legal', 'Trámites', 'Visas'],
    summary: 'Turista, nómada digital, residente temporaria o fiscal — cada situación tiene sus documentos. Esta guía explica qué necesitás según cuánto tiempo te quedás, con los pasos exactos y los links oficiales.',
    readTime: 12,
    persona: ['nomad', 'expat', 'immigrant'],
    body: [
      p('Lo primero que define tus trámites es cuánto tiempo vas a vivir en Uruguay. No es lo mismo pasar tres meses que quedarte a largo plazo. Cada situación tiene sus documentos — y la buena noticia es que Uruguay hace las cosas relativamente simples comparado con el resto de la región.'),

      h2('Turista — Hasta 90 días'),
      p('La mayoría de las nacionalidades entran sin visa. Solo necesitás pasaporte vigente. La estadía turista es de 90 días, prorrogables por otros 90 días en la Dirección Nacional de Migración (total 180 días en el año).'),
      li('No hay costo de entrada.'),
      li('Trabajar de forma remota para clientes en el exterior está en una zona gris legal. En la práctica, miles de nómadas lo hacen sin problemas.'),
      li('Si necesitás extender más allá de los 180 días, la opción más común es tramitar el Permiso de Nómada Digital o iniciar residencia.'),
      callout('blue', 'Verificá tu nacionalidad', 'La mayoría de países de Latinoamérica, Europa, EE.UU. y Canadá no necesitan visa. Podés verificar tu caso en liveinuruguay.uy/es/entryprocedures'),

      h2('Permiso de Nómada Digital — De 3 a 12 meses'),
      p('Uruguay tiene uno de los permisos de nómada digital más accesibles del mundo. Se tramita online, cuesta ~$312 UYU (menos de $10 USD), y permite vivir y trabajar legalmente por hasta 6 meses, renovable una vez (hasta 12 meses en total).'),
      h3('Requisitos'),
      li('Pasaporte vigente'),
      li('Formulario online con datos personales'),
      li('Declaración jurada de medios económicos (descargable en el sitio de la DNM)'),
      li('Estar físicamente en Uruguay al momento de la solicitud (no se puede tramitar desde el exterior)'),
      h3('Cómo tramitarlo'),
      oli('Ingresá al portal de Migraciones: migracion.minterior.gub.uy'),
      oli('Completá el formulario de solicitud y adjuntá la documentación'),
      oli('Pagá el arancel (~$312 UYU) en Abitab, RedPagos o Correo Uruguayo'),
      oli('Esperá 5 a 15 días hábiles para la resolución'),
      callout('green', 'El beneficio fiscal', 'Con residencia legal en Uruguay activás el régimen de exoneración de impuestos sobre ingresos del exterior. Uruguay tiene sistema fiscal territorial — lo que ganás afuera generalmente no tributa acá durante los primeros 10 años.'),

      h2('Residencia Temporaria — Más de un año'),
      p('Si tu plan es quedarte, querés tramitar la residencia. El proceso varía según tu nacionalidad.'),
      h3('Residencia Temporaria Mercosur (la vía rápida)'),
      p('Para ciudadanos de Argentina, Brasil, Paraguay, Bolivia, Chile, Colombia, Ecuador, Perú, Venezuela, Guyana y Surinam. Es significativamente más simple y rápida.'),
      li('Duración: 2 años, renovable'),
      li('Requisitos: documento de identidad + antecedentes penales del país de origen'),
      li('Brasil: no requiere apostilla (acuerdo bilateral Mercosur)'),
      li('Resto: los documentos extranjeros deben estar apostillados y traducidos al español'),
      h3('Residencia Temporaria (No Mercosur)'),
      p('Para el resto de las nacionalidades. El proceso demora entre 3 y 6 meses.'),
      li('Pasaporte vigente'),
      li('Partida de nacimiento (apostillada + traducida al español)'),
      li('Antecedentes penales del país de residencia (apostillados + traducidos)'),
      li('Certificado médico emitido en Uruguay'),
      li('Prueba de ingresos, empleo, estudio o propiedad'),
      li('2 fotos carné'),
      callout('gold', 'Importante sobre los documentos extranjeros', 'Todos los documentos de tu país necesitan apostilla o legalización consular antes de presentarlos. Si tu país firmó el Convenio de La Haya, el trámite de apostilla es simple. Consultá con tu consulado antes de viajar.'),

      h2('Residencia Permanente'),
      p('Se obtiene después de 3 años de residencia legal continua en Uruguay (cualquier status cuenta). Los ciudadanos Mercosur pueden saltear la etapa temporaria y solicitar permanente directamente.'),
      callout('blue', 'Trámites oficiales', 'Residencia Temporaria: gub.uy/tramites/residencia-legal-temporaria — Residencia Permanente: gub.uy/tramites/residencia-legal-permanente'),

      h2('Cédula de Identidad'),
      p('Una vez que iniciás cualquier trámite de residencia, podés tramitar la cédula de identidad uruguaya. Es el documento de uso cotidiano: te la piden para abrir cuentas bancarias, alquilar un apartamento, acceder al sistema de salud y casi cualquier trámite.'),
      h3('Qué llevar al DNIC o Correo Uruguayo'),
      li('Pasaporte original + fotocopia'),
      li('Dirección en Uruguay (puede ser alojamiento temporal)'),
      li('~$700 UYU de costo (verificá el valor actualizado en gub.uy)'),
      p('Tiempo de espera: 2 a 4 semanas para recibirla en tu domicilio.'),

      h2('Residencia Fiscal — Para los que quieren optimizar impuestos'),
      p('Uruguay es uno de los pocos países con sistema fiscal territorial: los ingresos generados fuera del país generalmente no tributan localmente. Para acceder a este beneficio como residente formal, debés cumplir al menos uno de estos criterios:'),
      li('Pasar más de 183 días al año en Uruguay'),
      li('Tener en Uruguay el "núcleo principal de actividades" o "centro de intereses económicos"'),
      h3('El beneficio'),
      p('Como nuevo residente fiscal podés elegir entre: 10 años de exoneración sobre ingresos de capital del exterior, o una tasa fija del 7% de forma permanente sobre esos ingresos. En ambos casos, es mucho menos que en la mayoría de los países.'),
      callout('gold', 'Cambio importante desde enero 2026', 'Los ingresos de capital e inmuebles provenientes de entidades no residentes ahora se consideran renta de fuente uruguaya para los residentes fiscales. Afecta principalmente a inversores con estructuras offshore. Si tenés ese perfil, consultá un contador local antes de tomar decisiones.'),
      callout('green', 'Vale la pena asesorarte', 'Una consulta con un contador uruguayo especializado en extranjeros (~$100–150 USD) puede ahorrarte miles. La comunidad NomadUY tiene una lista de contadores recomendados.'),
    ],
  },

  // ─────────────────────────────────────────────────────────
  // GUIDE 2: BARRIOS DE MONTEVIDEO
  // ─────────────────────────────────────────────────────────
  {
    _type: 'guide',
    title: 'Barrios de Montevideo',
    slug: { _type: 'slug', current: 'barrios-montevideo' },
    status: 'ready',
    featured: false,
    order: 3,
    icon: 'mapPin',
    category: 'vivienda',
    tags: ['Vivienda', 'Montevideo'],
    summary: 'Pocitos, Palermo, Ciudad Vieja, Cordón, Carrasco — cada barrio tiene una personalidad distinta. Esta guía te dice qué esperar de cada uno, los precios reales y para quién sirve.',
    readTime: 10,
    persona: ['nomad', 'expat', 'immigrant'],
    body: [
      p('Montevideo es una ciudad manejable — de punta a punta tardás 30 minutos en auto. Eso significa que el barrio que elijas no te encierra: podés estar en Ciudad Vieja a tomar mate y en Pocitos caminando por la rambla en el mismo día. Aun así, cada barrio tiene una personalidad muy distinta, y elegir bien puede hacer una gran diferencia en cómo vivís la ciudad.'),

      h2('Pocitos — El barrio expat por excelencia'),
      p('Pocitos es donde aterriza la mayoría de los extranjeros, y por buenas razones. Tiene la mejor rambla de Montevideo, una playa urbana, supermercados premium, restaurantes internacionales y una densidad de coworkings muy alta.'),
      li('La vibe: moderno, seguro, internacional. Más ciudad que barrio.'),
      li('Para quién: nómadas que quieren comodidad desde el día uno, familias extranjeras, ejecutivos en relocation.'),
      li('Alquiler: de los más altos de la ciudad. Monoambiente moderno amueblado desde ~$600–850 USD/mes. 2 ambientes desde ~$800–1.200 USD/mes.'),
      li('Lo mejor: la rambla para correr o andar en bici, ferias los fines de semana, todo a distancia caminable.'),
      li('Lo menos bueno: puede sentirse genérico. Si buscás sumergirte en la cultura local, puede quedarse corto.'),
      callout('blue', 'Tip de la comunidad', 'En Pocitos conviene buscar en las calles paralelas a la rambla (Bulevar España, Rivera, Benito Blanco) para precios más razonables sin perder las ventajas del barrio.'),

      h2('Palermo — Para los que quieren vivir como local'),
      p('Palermo es el barrio que eligen los que ya conocen Montevideo y quieren algo con más carácter. Limita con el Parque Rodó y tiene la mayor concentración de bares, cafés de especialidad y vida nocturna de la ciudad.'),
      li('La vibe: artístico, joven, bohemio. Calles arboladas, mucho movimiento de miércoles a sábado.'),
      li('Para quién: trabajadores remotos que quieren comunidad local, creatives, personas entre 25 y 40 años.'),
      li('Alquiler: razonable. Monoambiente amueblado desde ~$400–600 USD/mes.'),
      li('Lo mejor: escena gastronómica, cafés para trabajar, el parque a dos cuadras, mercados de pulgas los fines de semana.'),
      li('Lo menos bueno: ruidoso los fines de semana en calles principales. Menos opciones de supermercados grandes.'),

      h2('Ciudad Vieja — Historia, cultura y precio accesible'),
      p('Ciudad Vieja es el centro histórico de Montevideo: edificios coloniales, la bahía, museos, el Mercado del Puerto. Es el barrio que más cambió en los últimos años, con fuerte inversión en restauración y un movimiento creciente de bares y restaurantes.'),
      li('La vibe: histórica de día, activa de noche en las zonas renovadas. Mezcla de oficinas, turismo y vida residencial.'),
      li('Para quién: amantes de la arquitectura, los que trabajan en el centro, personas que quieren estar en el corazón de la ciudad.'),
      li('Alquiler: muy variable. Apartamentos nuevos en edificios restaurados son caros; los tradicionales, muy accesibles.'),
      li('Lo mejor: la arquitectura, el Mercado del Puerto los domingos, acceso a pie a todo el centro, la bahía.'),
      callout('gold', 'Importante', 'Ciudad Vieja tiene zonas muy distintas entre sí. Las calles cerca de la rambla y del Mercado del Puerto son las más seguras y activas. Visitalo en distintos horarios antes de alquilar.'),

      h2('Cordón — El barrio de los que se quedan'),
      p('Cordón es el barrio más "montevideano" de todos. Sin pretensiones, central, lleno de almacenes, panaderías, plazas y vida de barrio real. Es donde viven los universitarios, los artistas y los locales que valoran el precio sobre el status.'),
      li('La vibe: auténtica, tranquila, central. La ciudad como la viven los uruguayos.'),
      li('Para quién: inmigrantes que quieren integrarse, personas con presupuesto ajustado, los que ya conocen Montevideo y quieren salir del circuito expat.'),
      li('Alquiler: de los más accesibles de la zona central. Monoambiente sin amueblar desde ~$300 USD/mes.'),
      li('Lo mejor: precio, centralidad, vida de barrio genuina, cerca de todo.'),
      li('Lo menos bueno: menos opciones de restaurantes internacionales, algunos edificios viejos con mantenimiento irregular.'),

      h2('Punta Carretas — Tranquilo y seguro'),
      p('Punta Carretas es el barrio más tranquilo de la zona costera. Residencial, cuidado, con el shopping mall más tradicional de Montevideo y una plaza central muy activa. Popular entre profesionales y familias con un presupuesto algo más alto.'),
      li('La vibe: upscale, quieto, familiar. Veredas anchas, árboles, poco ruido.'),
      li('Para quién: profesionales con ingresos estables, familias, los que valoran la tranquilidad sobre la vida nocturna.'),
      li('Alquiler: alto. Similar a Pocitos o algo más caro. 2 ambientes desde ~$1.000–1.500 USD/mes.'),
      li('Lo mejor: seguridad, calidad de vida, cercanía a la rambla sin el movimiento de Pocitos.'),

      h2('Carrasco — Para familias con presupuesto alto'),
      p('Carrasco es el barrio más exclusivo de Montevideo: casas amplias, jardines, calles tranquilas, cerca del aeropuerto y con los mejores colegios bilingües de la ciudad.'),
      li('La vibe: residencial, familiar, seguro. Más suburbio que ciudad.'),
      li('Para quién: familias con niños, ejecutivos en relocation corporativo, los que priorizan seguridad y espacio.'),
      li('Alquiler: el más alto de Montevideo. Casa familiar con jardín desde ~$2.500 USD/mes.'),
      li('Lo mejor: seguridad, espacios verdes, cercanía al aeropuerto, colegios internacionales.'),
      li('Lo menos bueno: lejos de la vida nocturna y cultural. Necesitás auto para todo.'),

      callout('green', '¿Cuál es para vos?', 'Primera vez en Uruguay: Pocitos o Palermo. Presupuesto ajustado: Cordón o Parque Rodó. Con familia: Punta Carretas o Carrasco. Querés integrarte: Cordón o Ciudad Vieja. La comunidad NomadUY tiene un tablón de housing con opciones verificadas.'),
    ],
  },

  // ─────────────────────────────────────────────────────────
  // GUIDE 3: MOVERSE EN URUGUAY
  // ─────────────────────────────────────────────────────────
  {
    _type: 'guide',
    title: 'Moverse en Uruguay',
    slug: { _type: 'slug', current: 'moverse-uruguay' },
    status: 'ready',
    featured: false,
    order: 4,
    icon: 'bus',
    category: 'moverse',
    tags: ['Transporte', 'Montevideo'],
    summary: 'STM, Uber, bicicleta, ómnibus interurbanos, ferry y carpooling — todo lo que necesitás saber para moverte dentro de Montevideo y entre ciudades, con precios y links actualizados.',
    readTime: 8,
    persona: ['nomad', 'expat', 'immigrant'],
    body: [
      p('Uruguay es un país pequeño y bien conectado. Montevideo tiene transporte público funcional, Uber opera sin problemas, y las principales ciudades están a pocas horas en ómnibus. Esta guía cubre todo lo que necesitás para moverte desde el primer día.'),

      h2('Dentro de Montevideo'),

      h3('STM — El sistema de buses'),
      p('El STM (Sistema de Transporte Metropolitano) cubre toda Montevideo y parte de Canelones y San José. Es la forma más económica de moverse.'),
      li('Tarifa (enero 2026): $52 UYU/hora con tarjeta STM electrónica, $64 UYU en efectivo. Boleto de 2 horas: $78 UYU electrónico.'),
      li('La Tarjeta STM se compra en Abitab, RedPagos u oficinas STM (~$100 UYU). Se recarga en los mismos puntos.'),
      li('Principal empresa operadora: CUTCSA (cutcsa.com.uy). También operan COETC, COME y Raincoop.'),
      li('App recomendada: Cómo Ir (Android/iOS) — rastreo en tiempo real de todos los ómnibus de Montevideo.'),
      callout('blue', 'Líneas útiles para extranjeros', 'Línea 121: Pocitos ↔ Centro. Línea 183: Pocitos ↔ Ciudad Vieja. Línea 64: Parque Rodó. Verificá el recorrido en la app Cómo Ir antes de salir.'),

      h3('Uber, Cabify y DiDi'),
      p('Los tres operan legalmente en Uruguay y son muy utilizados. Uber es el más extendido y confiable. DiDi es generalmente más barato. Cabify es buena opción para viajes programados.'),
      li('Uber: la opción más usada. Funciona perfecto desde el aeropuerto.'),
      li('DiDi: precios más bajos, buen servicio en Montevideo.'),
      li('Cabify: útil para reservar con anticipación.'),
      li('Taxis tradicionales: blancos con franja negra. App Easy Taxi. Metraje medido.'),

      h3('Bicicleta — MiMovi'),
      p('La Intendencia de Montevideo tiene un sistema de bicicletas públicas llamado MiMovi, con estaciones distribuidas por toda la ciudad. La rambla tiene ciclovías extensas — ideal para ir del trabajo a la playa.'),

      h3('Alquiler de auto'),
      p('Tu licencia de conducir del país de origen es válida durante 90 días en Uruguay. Después necesitás licencia uruguaya o Permiso Internacional de Conducir (IDP). Se maneja por la derecha.'),
      li('Alquiler en aeropuerto de Carrasco: Hertz, Avis, Europcar y empresas locales.'),
      li('P2P alternativa: TripWip (app uruguaya para alquilar autos de particulares). Más barato y flexible.'),
      callout('green', 'TripWip', 'TripWip es una plataforma uruguaya para alquilar autos de particulares. 400+ vehículos disponibles. Ideal para escapadas de fin de semana sin el costo de una empresa tradicional.'),

      h2('Entre ciudades'),

      h3('Ómnibus — La opción principal'),
      p('Uruguay tiene una red de ómnibus interurbanos excelente. La mayoría de las ciudades del interior son alcanzables en 2 a 6 horas desde Montevideo. La terminal principal es Terminal Tres Cruces (General Flores y Bulevar Artigas).'),
      p('URUBUS (urubus.com.uy) es el agregador online donde comprás pasajes de todas las empresas: COPSA, COT, Turil, CITA, Núñez, Bussur, EGA.'),
      li('Colonia del Sacramento: 2.5h — ~$350–500 UYU'),
      li('Punta del Este: 2h — ~$400–600 UYU'),
      li('Salto (termas): 5–6h — ~$800–1.100 UYU'),
      li('Paysandú: 4.5h — ~$650–850 UYU'),
      li('La Paloma / Rocha: 3h — ~$450–600 UYU'),
      li('Rivera: 5.5h — ~$800–1.000 UYU'),
      callout('blue', 'Precios aproximados de enero 2026', 'Los precios del transporte interurbano se actualizan periódicamente. Verificá el precio actual en urubus.com.uy al momento de comprar.'),

      h3('Carpooling — Viatik'),
      p('Viatik es una plataforma uruguaya que conecta conductores y pasajeros para viajes interurbanos. No es un ómnibus — es compartir auto con alguien que ya va en esa dirección. Más flexible y a menudo más barato. 70.000+ usuarios registrados. Rutas más activas: Montevideo ↔ Maldonado, Salto, Paysandú.'),

      h3('Ferry — Montevideo ↔ Buenos Aires'),
      p('Una de las rutas más usadas por expats de la región. Dos opciones principales:'),
      li('Buquebus (buquebus.com): Montevideo ↔ Buenos Aires, puerto a puerto. ~3 horas. La más directa.'),
      li('Seacat / FRS: Colonia del Sacramento ↔ Buenos Aires. ~1 hora de cruce. Más barata si vas desde Colonia.'),
      callout('green', 'Tip Buenos Aires', 'Si querés ir a BA, la combinación más económica es tomar el ómnibus a Colonia (2.5h, ~$400 UYU) y luego el ferry rápido (1h). Sale más barato que el Buquebus directo desde Montevideo.'),

      h3('Vuelos'),
      p('El Aeropuerto Internacional de Carrasco (MVD) es el principal hub del país. Vuelos directos a Buenos Aires, São Paulo, Lima, Bogotá, Madrid, París, Miami, entre otros. Aerolíneas principales: LATAM, Aerolíneas Argentinas, American, Air France, Iberia, Copa.'),
      p('Vuelos domésticos son muy limitados (PLUNA cerró hace años). Para destinos dentro de Uruguay, el ómnibus es la opción estándar.'),
    ],
  },

  // ─────────────────────────────────────────────────────────
  // GUIDE 4: SALUD & MUTUALISTAS
  // ─────────────────────────────────────────────────────────
  {
    _type: 'guide',
    title: 'Salud & Mutualistas',
    slug: { _type: 'slug', current: 'salud-mutualistas' },
    status: 'ready',
    featured: false,
    order: 5,
    icon: 'firstAid',
    category: 'salud',
    tags: ['Salud', 'Mutualistas'],
    summary: 'ASSE o mutualista, cómo afiliarte, qué cubre cada plan y cuánto cuesta — todo lo que necesitás saber sobre el sistema de salud uruguayo explicado sin tecnicismos.',
    readTime: 9,
    persona: ['nomad', 'expat', 'immigrant'],
    body: [
      p('Uruguay tiene uno de los mejores sistemas de salud de América Latina. No es perfecto, pero es accesible, funcional y mucho más ordenado que la mayoría de la región. Como extranjero, tenés opciones reales — tanto en el sistema público como en el privado.'),

      h2('Cómo funciona el sistema'),
      p('El sistema de salud uruguayo se llama SNIS (Sistema Nacional Integrado de Salud) y tiene dos pilares:'),
      li('ASSE (Administración de los Servicios de Salud del Estado): el sistema público. Gratuito o de muy bajo costo. Tiempos de espera más largos.'),
      li('Mutualistas: instituciones privadas de salud financiadas parcialmente por el Estado. La principal opción para expats y nómadas.'),
      p('El fondo que coordina el acceso a las mutualistas se llama FONASA. Si trabajás formalmente en Uruguay y aportás al BPS (seguridad social), FONASA te subsidia el costo de la mutualista. Si no, la pagás directamente.'),

      h2('ASSE — El sistema público'),
      p('ASSE es gratuito para residentes uruguayos que cumplan ciertos criterios de ingresos. Como extranjero con o sin residencia en trámite, podés afiliarte si tus ingresos son bajos.'),
      li('Cobertura: consultas médicas, urgencias, estudios básicos, medicamentos con descuento.'),
      li('Tiempo de espera: mayor que en las mutualistas. Especialistas pueden demorar semanas.'),
      li('Cómo afiliarse: afiliaciones.asse.com.uy o en las policlínicas del barrio.'),
      callout('blue', 'Para quién es ASSE', 'ASSE es una buena opción si tenés presupuesto muy ajustado o si llegás al país y necesitás cobertura inmediata mientras esperás la cédula para contratar una mutualista. Para atención de urgencias funciona razonablemente bien.'),

      h2('Mutualistas — Las prepagas uruguayas'),
      p('Las mutualistas son instituciones privadas de salud (HMOs) que funcionan como medicina prepaga. Tienen médicos de cabecera, especialistas, urgencias domiciliarias y hospitales propios. Para la mayoría de los expats y nómadas, esta es la opción recomendada.'),
      h3('Principales mutualistas'),
      li('Médica Uruguaya: la más grande del país. Fuerte servicio de emergencias. Amplia red de especialistas.'),
      li('CASMU: grande, bien organizada, presencia en toda la ciudad. Buena relación calidad-precio.'),
      li('SMI (Servicio Médico Integral): muy bien valorada entre expats. Buena atención personalizada.'),
      li('Médica TCC: sólida opción de rango medio.'),
      li('Asociación Española: histórica, muy reconocida. Tope de edad para nuevos afiliados (~60–65 años).'),
      li('British Hospital: staff bilingüe español/inglés. Tope de edad para nuevos afiliados. Ideal si necesitás atención en inglés.'),
      li('Hospital Evangélico: más pequeño, buena calidad, buenos precios.'),
      callout('green', 'Para expats: CASMU o SMI', 'El consenso en la comunidad expat es que CASMU y SMI ofrecen el mejor balance entre costo, cobertura y atención. British Hospital es ideal si necesitás atención en inglés, pero tiene límite de edad para nuevos socios.'),

      h2('Cómo elegir tu mutualista'),
      p('Antes de decidir, considerá estos factores:'),
      li('Edad: algunas mutualistas no aceptan nuevos afiliados mayores de 60–65 años.'),
      li('Ubicación: revisá dónde quedan sus policlínicas y hospital respecto a tu barrio.'),
      li('Costo mensual: varía según edad y proveedor. Usá el comparador oficial en atuservicio.msp.gub.uy para ver precios actualizados.'),
      li('Cobertura de especialistas: si tenés una condición médica específica, verificá que la mutualista tenga especialistas en esa área.'),
      p('El costo mensual varía entre $5.000 y $12.000 UYU/mes (~$100–250 USD) según proveedor y edad. Este es uno de los costos fijos más importantes de vivir en Uruguay.'),
      callout('blue', 'Comparador oficial', 'Podés comparar precios y cobertura de todas las mutualistas en el sitio oficial del MSP: atuservicio.msp.gub.uy. Los precios se actualizan periódicamente, siempre verificá ahí antes de contratar.'),

      h2('Qué cubre una mutualista'),
      p('La cobertura básica incluida en todos los planes de mutualista:'),
      li('Médico de cabecera (médico de referencia personal)'),
      li('Acceso a especialistas (traumatología, cardiología, ginecología, etc.)'),
      li('Urgencias y emergencias 24/7, incluyendo servicio a domicilio'),
      li('Estudios diagnósticos (análisis de sangre, radiografías, ecografías)'),
      li('Internación hospitalaria'),
      li('Cirugías y procedimientos cubiertos por el plan'),
      li('Medicamentos con descuento (ticket moderador)'),
      callout('gold', 'Ticket moderador', 'En Uruguay, las consultas y estudios tienen un costo compartido llamado "ticket moderador" o "órdenes". Es un monto fijo bajo (~$100–400 UYU por consulta) que pagás en el momento. No es como el copago en otros países — es simbólico. Algunos planes tienen tickets más bajos que otros.'),

      h2('Números de emergencia'),
      p('Guardá estos números desde el primer día:'),
      li('SAMU (ambulancia pública): 105'),
      li('Policía: 911'),
      li('Bomberos: 104'),
      li('Tu mutualista: cada una tiene un número de emergencias 24h — guardalo apenas te afilies.'),
      callout('blue', 'Antes de necesitarla', 'Apenas te afilies a una mutualista, agendá una consulta con el médico de cabecera. Es gratis con el plan, sirve para que te conozcan y te da acceso más rápido al sistema cuando realmente la necesitás.'),
    ],
  },
]

// --- Create documents ---
console.log(`Creating ${guides.length} guides in Sanity...`)

for (const guide of guides) {
  try {
    const result = await client.create(guide)
    console.log(`✓ Created: "${guide.title}" (${result._id})`)
  } catch (err) {
    console.error(`✗ Failed: "${guide.title}"`, err.message)
  }
}

console.log('\nDone! Check your Sanity Studio at localhost:3000/studio')
