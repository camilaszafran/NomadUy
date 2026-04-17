// Run with: node --env-file=.env.local scripts/seed-guides-2.mjs
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
const callout = (type, title, body) => ({ _type: 'callout', _key: key(), type, title, body })

const guides = [

  // ─────────────────────────────────────────────────────────
  // GUIDE 5: ENCONTRAR APARTAMENTO O AIRBNB
  // ─────────────────────────────────────────────────────────
  {
    _type: 'guide',
    title: 'Cómo encontrar apartamento o Airbnb',
    slug: { _type: 'slug', current: 'encontrar-apartamento' },
    status: 'ready',
    featured: false,
    order: 6,
    icon: 'house',
    category: 'vivienda',
    tags: ['Vivienda', 'Alquiler'],
    summary: 'Desde Airbnb para los primeros días hasta un contrato de largo plazo — dónde buscar, cómo funciona la garantía y qué esperar del mercado inmobiliario uruguayo.',
    readTime: 10,
    persona: ['nomad', 'expat', 'immigrant'],
    body: [
      p('Encontrar vivienda en Uruguay como extranjero tiene un obstáculo concreto: la garantía. A diferencia de muchos países, en Uruguay los propietarios exigen una garantía antes de alquilar. Pero hay formas de resolverlo — y esta guía te explica todas.'),

      h2('Primeros días: Airbnb y hospedajes temporales'),
      p('Lo más inteligente al llegar es no apurarte a firmar un contrato. Quedarte en un Airbnb, hostel o coliving las primeras 2 a 4 semanas te da tiempo para conocer los barrios, visitar apartamentos en persona y decidir con calma.'),
      li('Airbnb: la opción más usada por nómadas. Amplia oferta en Pocitos, Palermo y Ciudad Vieja. — airbnb.com'),
      li('Booking.com: hoteles y apartamentos de corto plazo. Buena opción para las primeras noches. — booking.com'),
      li('Coliving Montevideo: varias opciones de coliving con habitaciones o estudios amueblados, internet incluido y comunidad. Buscá en Facebook "coliving Montevideo" para opciones actuales.'),
      callout('green', 'Tip de llegada', 'Reservá solo las primeras 2 semanas en Airbnb. Una vez en la ciudad, buscá directamente en los grupos de Facebook y portales locales — los precios son significativamente más bajos que en plataformas internacionales.'),

      h2('Dónde buscar apartamento de largo plazo'),
      h3('Portales inmobiliarios uruguayos'),
      li('Gallito: el portal inmobiliario más grande de Uruguay. Filtrá por barrio, precio y tipo. — gallito.com.uy'),
      li('Infocasas: segunda opción más usada. Interfaz más moderna, buenas fotos. — infocasas.com.uy'),
      li('MercadoLibre Inmuebles: muchos particulares publican acá, a veces sin comisión de inmobiliaria. — inmuebles.mercadolibre.com.uy'),

      h3('Grupos de Facebook'),
      p('Los grupos de Facebook son donde se mueve gran parte del mercado de alquiler orientado a extranjeros. Son más directos, sin comisiones, y con propietarios acostumbrados a alquilarle a expats.'),
      li('"Alquileres Montevideo extranjeros" — el más activo para la comunidad expat'),
      li('"Nómadas Digitales en Uruguay" — también tiene publicaciones de housing'),
      li('"Expats in Uruguay" — mezcla de consultas y ofertas de vivienda'),

      h3('Otras opciones'),
      li('Tablón de la comunidad NomadUY: publicaciones verificadas de miembros de la comunidad.'),
      li('Inmobiliarias especializadas en extranjeros: algunas inmobiliarias de Pocitos y Palermo tienen experiencia alquilándole a expats y manejan los trámites de garantía alternativa.'),

      h2('El tema de la garantía'),
      p('Acá está el nudo del asunto. En Uruguay, para firmar un contrato de alquiler tradicional (2 años), el propietario exige una garantía. Como extranjero, no tenés un propietario local conocido que te avale — pero hay alternativas legítimas:'),
      h3('Opciones de garantía para extranjeros'),
      li('ANDA (Agencia Nacional de Vivienda): garantía estatal. Requiere demostrar ingresos estables. Trámite gratuito. — anda.gub.uy'),
      li('Garantía bancaria: depositás en un banco el equivalente a 12 meses de alquiler como garantía. Lo recuperás al terminar el contrato sin incumplimientos.'),
      li('Inmobiliarias sin garantía: algunas agencias trabajan con propietarios dispuestos a alquilar sin garantía tradicional, a cambio de 1 o 2 meses adicionales de depósito al inicio.'),
      li('Coliving y alquileres temporales: la mayoría no requieren garantía. Ideal para los primeros 3 a 6 meses mientras tramitás residencia y abrís cuenta bancaria.'),
      callout('gold', 'La estrategia más común', 'Llegás → primeras semanas en Airbnb → buscás un coliving o alquiler temporal sin garantía → con unos meses de historial en Uruguay y residencia en trámite, negociás un contrato tradicional con garantía bancaria. Funciona para la gran mayoría.'),

      h2('Precios de alquiler (2025–2026)'),
      p('Los precios en Montevideo se cotizan frecuentemente en dólares, aunque el contrato se firma en pesos uruguayos con ajuste por inflación.'),
      li('Habitación en apartamento compartido: $250–400 USD/mes'),
      li('Monoambiente amueblado en Palermo o Cordón: $400–600 USD/mes'),
      li('Monoambiente amueblado en Pocitos: $600–850 USD/mes'),
      li('2 ambientes amueblado en Pocitos o Punta Carretas: $800–1.200 USD/mes'),
      li('Casa con jardín en Carrasco: $2.500 USD/mes en adelante'),
      callout('blue', 'Precios en UYU vs USD', 'Muchos propietarios cotizan en USD pero el contrato se firma en pesos. El tipo de cambio se fija al momento de firmar. Con inflación ~8–10% anual en Uruguay, es común que los contratos incluyan cláusulas de ajuste cada 6 o 12 meses. Verificá esto antes de firmar.'),

      h2('Qué incluye (y qué no) un alquiler típico'),
      p('En Uruguay, la mayoría de los alquileres de largo plazo no incluyen servicios. Esto es importante saberlo para calcular el costo real mensual.'),
      li('Generalmente incluido: calefacción (a veces), gastos comunes del edificio (en algunos casos).'),
      li('Generalmente NO incluido: luz (UTE), agua (OSE), gas (a veces), internet (ANTEL u operadores privados).'),
      li('Internet: Uruguay tiene fibra óptica de alta velocidad a través de ANTEL y operadores privados. 100–500 Mbps disponible en la mayoría de los apartamentos. Costo: ~$800–1.500 UYU/mes.'),
      li('Luz y agua: entre $500 y $1.500 UYU/mes para un monoambiente, dependiendo del consumo.'),

      h2('Coliving — La opción all-in-one'),
      p('Si preferís simplicidad sobre precio, los espacios de coliving son ideales para los primeros meses. Incluyen habitación o estudio, internet de alta velocidad verificado, limpieza, y una comunidad ya formada. No necesitás garantía, no firmás contrato de 2 años, y llegás con la maleta.'),
      li('Buscá "coliving Montevideo" en Google y en grupos de Facebook para opciones actuales — el mercado cambia seguido.'),
      li('Algunos coworkings también ofrecen coliving: Sinergia y otros espacios en Pocitos tienen acuerdos con edificios cercanos.'),
      callout('green', 'Para nómadas de 1 a 3 meses', 'Si venís por menos de 3 meses, el coliving o un Airbnb de larga estadía (con descuento semanal/mensual) siempre es más conveniente que firmar un contrato. Negociá el precio mensual directamente con el host de Airbnb — la mayoría tiene descuentos no publicados para estadías largas.'),
    ],
  },

  // ─────────────────────────────────────────────────────────
  // GUIDE 6: CULTURA URUGUAYA Y CURIOSIDADES
  // ─────────────────────────────────────────────────────────
  {
    _type: 'guide',
    title: 'Cultura uruguaya y curiosidades',
    slug: { _type: 'slug', current: 'cultura-uruguay' },
    status: 'ready',
    featured: false,
    order: 7,
    icon: 'chatTeardrop',
    category: 'idioma',
    tags: ['Cultura', 'Curiosidades'],
    summary: 'Mate, asado, voseo, carnaval y el ritmo tranquilo del sur — todo lo que necesitás saber sobre la cultura uruguaya para entender (y querer) este país.',
    readTime: 7,
    persona: ['nomad', 'expat', 'immigrant'],
    body: [
      p('Uruguay es un país que se entiende con el tiempo. A primera vista parece quieto, casi aburrido para quien viene de ciudades más caóticas. Pero una vez que entrás en su ritmo, es difícil querer salir. Esta guía es para que entiendas qué hace especial a este pequeño país del sur.'),

      h2('El mate — mucho más que una bebida'),
      p('Uruguay tiene el mayor consumo de mate per cápita del mundo — más que Argentina, más que Paraguay. Pero acá el mate no es solo una infusión: es un ritual social. Lo verás en la rambla, en las oficinas, en los ómnibus, en la playa. La gente camina con el termo bajo el brazo como si fuera parte del cuerpo.'),
      li('El mate se comparte. Si estás en un grupo y te ofrecen el mate, aceptarlo es un gesto de confianza. Rechazarlo está bien, pero decí "gracias" cuando no querés más — esa es la señal de que ya terminaste.'),
      li('El cebador (quien prepara y sirve el mate) lo hace sin azúcar por defecto. Si querés dulce, avisá antes de empezar.'),
      li('No muevas la bombilla. En serio. Es una de las pocas cosas que pueden incomodar genuinamente a un uruguayo.'),
      callout('blue', 'Curiosidad', 'En Uruguay existe un debate eterno entre quienes toman mate amargo y quienes lo toman dulce. Es casi una cuestión de identidad. Si querés integrarte rápido: aprendé a tomar amargo.'),

      h2('El asado — la institución social'),
      p('Si el mate es el ritual diario, el asado es el ritual semanal. El domingo sin asado en Uruguay es una anomalía. No es solo comer carne a la parrilla — es una razón para juntarse, para que la tarde dure horas, para hablar de todo y de nada.'),
      li('El asado uruguayo usa principalmente leña o carbón vegetal. La mayoría de los uruguayos prefiere leña — da otro sabor.'),
      li('Los cortes típicos: tira de asado, vacío, chorizo, morcilla, mollejas. Muy distinto al asado argentino en los tiempos y los cortes.'),
      li('El parrillero tiene autoridad total sobre la parrilla. Nunca le digas cómo hacerlo.'),
      li('El asado empieza "a las 12" y el primer chorizo llega a las 2. Eso es perfectamente normal.'),
      callout('green', 'Para integrarse rápido', 'Si te invitan a un asado, ofrecete a llevar algo. Lo más bien recibido: una botella de vino Tannat uruguayo (el grape local), pan, o una ensalada. Llegar con las manos vacías está bien entre amigos cercanos, pero el gesto suma.'),

      h2('El idioma — voseo y modismos uruguayos'),
      p('El español uruguayo es rioplatense, muy similar al de Buenos Aires. La diferencia más notable para quien viene de México, Colombia o España: en Uruguay se usa "vos" en lugar de "tú", con conjugaciones distintas.'),
      li('"Vos tenés" en vez de "tú tienes". "Vos sabés" en vez de "tú sabes".'),
      li('"Che" — forma de llamar la atención. "Che, ¿cómo estás?" es totalmente normal.'),
      li('"Ta" — abreviatura de "está bien". Sirve como sí, como de acuerdo, como okay. Es la palabra más versátil del español uruguayo.'),
      li('"Bah" — expresión de duda, desestimación suave o matiz. "Bah, no sé…"'),
      li('"Bárbaro" — excelente, genial. "¿Cómo te fue? Bárbaro."'),
      li('"Copado/a" — buena persona, buen ambiente, buena situación. "Es re copado ese lugar."'),
      li('"Feca" — café con leche (jerga montevideana, especialmente en bares tradicionales).'),
      callout('blue', 'El acento', 'Los uruguayos tienen una entonación muy particular, más cantada que los argentinos y con algunas influencias del portuñol en las ciudades del norte. En Rivera (frontera con Brasil) vas a escuchar portuñol — una mezcla espontánea de español y portugués que es completamente funcional.'),

      h2('El carnaval — el más largo del mundo'),
      p('El Carnaval de Montevideo es oficialmente el más largo del mundo: dura más de 40 días, desde enero hasta principios de marzo. No es el carnaval de Rio — es algo completamente distinto y mucho más local.'),
      li('Murga: grupos de entre 14 y 17 personas que cantan teatro satírico político. Es el corazón cultural del carnaval uruguayo. Requiere entender la política local para apreciarlo del todo, pero el espectáculo es impresionante.'),
      li('Candombe: ritmo afro-uruguayo tocado con tambores (chico, repique, piano). Declarado Patrimonio Cultural Inmaterial por la UNESCO. Las llamadas de candombe en el Barrio Sur son de las experiencias más auténticas que podés tener en Montevideo.'),
      li('Tablados: escenarios populares en los barrios donde actúan todas las agrupaciones. Mucho más genuino que los desfiles del centro.'),
      callout('gold', 'Si llegás en verano', 'El carnaval empieza en enero. Si estás en Montevideo en febrero, ir a un tablado de barrio es una de las experiencias más auténticas que podés tener. Son baratos (~$200–400 UYU la entrada), empiezan tarde (22h o más) y duran hasta la madrugada.'),

      h2('La tranquilidad uruguaya — el ritmo del país'),
      p('Una de las primeras cosas que notás al llegar a Uruguay es la calma. No hay el caos de Buenos Aires, ni la intensidad de São Paulo. La ciudad funciona, la gente es amable, y las cosas se resuelven — aunque a veces más despacio de lo que quisieras.'),
      li('Los trámites burocráticos toman tiempo. Presupuestá extra para todo lo que involucre una oficina pública.'),
      li('Los negocios abren tarde y cierran a la siesta. Muchos almacenes y pequeños comercios cierran entre las 13 y las 16h.'),
      li('La puntualidad es flexible. Una reunión social "a las 20h" puede empezar a las 21h sin que nadie lo note.'),
      li('La propina en restaurantes es del 10% y es estándar, aunque no obligatoria.'),
      callout('green', 'La frase que lo explica todo', '"¿Y? ¿Cómo andás?" — Esta pregunta se hace al saludar. No es una invitación a contar tus problemas. La respuesta correcta es "Bien, ¿y vos?" independientemente de cómo estés. Con el tiempo, eso cambia.'),

      h2('Curiosidades que sorprenden a los recién llegados'),
      li('Uruguay fue el primer país del mundo en legalizar el cannabis a nivel nacional (2013) y el primero en América Latina en legalizar el matrimonio igualitario (2013).'),
      li('El fútbol es casi una religión. Uruguay tiene 2 Copas del Mundo (1930 y 1950) con una población de apenas 3,5 millones de personas. Es la mayor tasa de títulos mundiales per cápita de la historia.'),
      li('El mate tiene el mayor consumo per cápita del mundo. Un uruguayo promedio consume más de 8 kg de yerba al año.'),
      li('Uruguay tiene más vacas que personas. La relación es de aproximadamente 3,5 vacas por habitante.'),
      li('Es el país menos corrupto de América Latina según Transparencia Internacional — consistentemente, año tras año.'),
      li('La electricidad de Uruguay proviene en más del 98% de fuentes renovables: viento, agua y sol. Es uno de los líderes mundiales en energía limpia.'),
      li('José Mujica, presidente de 2010 a 2015, donó el 90% de su sueldo a organizaciones sociales y vivió en su chacra durante todo su mandato. Es considerado uno de los líderes más humildes del mundo.'),
      li('En Montevideo existe la Feria de Tristán Narvaja, un mercado de pulgas dominical que lleva más de 100 años funcionando en el barrio Cordón. Es parte de la identidad de la ciudad.'),
      li('El dulce de leche uruguayo es distinto al argentino — más firme y menos empalagoso. Es motivo de orgullo nacional.'),
      li('Uruguay tiene 900 km de costas sobre el Río de la Plata y el Atlántico. Ningún punto del país está a más de 500 km del agua.'),
      callout('blue', 'El chivito', 'El chivito es el sandwich nacional uruguayo: carne de res fina, jamón, bacon, huevo, queso, tomate, lechuga y mayonesa en pan. No tiene nada que ver con chivo (cabra). El nombre viene de una historia de los años 40 en Montevideo. Es el plato más pedido en las confiterías y bares del país. Probarlo es obligatorio.'),

      h2('La relación con Argentina'),
      p('Uruguay y Argentina tienen una relación de hermanos con historia compleja — mucha cultura compartida, mucha competencia, mucho afecto mutuo. El fútbol es el capítulo más intenso de esa historia. Pero en la vida cotidiana, la influencia argentina en Uruguay es enorme: televisión, música, comida, jerga.'),
      p('Los uruguayos son rápidos en diferenciarse de los argentinos cuando viajan al exterior. "No, yo soy uruguayo" es una frase dicha con orgullo. Pero en casa, son los primeros en cruzar a Buenos Aires el fin de semana para ver un show o ir de compras.'),
      callout('green', 'Para entender Uruguay en una sola imagen', 'Un domingo a las 14h: familia en la rambla, termo de mate bajo el brazo, perro suelto, sol y viento del Río de la Plata, olor a asado desde algún balcón. Así es Uruguay en su versión más auténtica.'),
    ],
  },
]

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
