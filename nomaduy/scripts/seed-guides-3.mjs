// Run with: node --env-file=.env.local scripts/seed-guides-3.mjs
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

const guide = {
  _type: 'guide',
  title: 'Gastronomía uruguaya — qué comer, dónde y cómo',
  slug: { _type: 'slug', current: 'gastronomia-uruguaya' },
  status: 'ready',
  featured: false,
  order: 8,
  icon: 'heart',
  category: 'llegada',
  tags: ['Comida', 'Cultura'],
  summary: 'Del chivito al asado, de las facturas al Tannat — una guía honesta sobre qué comer en Uruguay, dónde comerlo y por qué la gastronomía uruguaya te va a sorprender más de lo que esperás.',
  readTime: 9,
  persona: ['nomad', 'expat', 'immigrant'],
  body: [
    p('La gastronomía uruguaya no tiene la fama internacional de la peruana ni el marketing de la argentina, pero tiene algo que muchas cocinas más conocidas no tienen: honestidad. Pocos ingredientes, buena materia prima, preparaciones directas. Una vez que entrás en su lógica, es difícil no quedar enganchado.'),

    h2('El chivito — el plato nacional'),
    p('Si tuvieras que comer una sola cosa en Uruguay, sería el chivito. Es el sandwich nacional: carne de res fina (churrasco), jamón cocido, bacon, huevo frito o duro, queso, tomate, lechuga, morrón, aceitunas y mayonesa, todo en un pan de miga blando. Es excesivo en el mejor sentido posible.'),
    li('El nombre no tiene nada que ver con el cabrito. Según la historia más aceptada, en los años 40 un restaurante de Montevideo no tenía carne de chivo para un cliente y lo suplantó con este sandwich. El nombre quedó.'),
    li('Existe en versión "al plato" (sin pan, con guarnición de papas fritas) y en versión "canadiense" (con más ingredientes todavía).'),
    li('Dónde comerlo: en cualquier confitería o bar de barrio. El nivel varía mucho — preguntá a algún local cuál es el mejor del barrio.'),
    callout('blue', 'El debate eterno', 'En Uruguay hay una discusión seria sobre cuál confitería hace el mejor chivito de Montevideo. Cada barrio tiene su favorito. No hay respuesta correcta, pero sí hay respuestas equivocadas — evitá los de los shoppings.'),

    h2('El asado — cultura en llamas'),
    p('El asado uruguayo merece su propia guía (y la tiene), pero en el contexto de la gastronomía: la tradición parrillera uruguaya es de las mejores del mundo. La carne uruguaya viene de ganado criado a pasto, sin feedlots, en campos abiertos. Eso se nota en el sabor.'),
    h3('Cortes que tenés que conocer'),
    li('Tira de asado: costillas cortadas transversales. El corte más clásico. Se cocina lento, a fuego bajo.'),
    li('Vacío: flanco de la res, jugoso y con mucho sabor. El favorito de muchos uruguayos.'),
    li('Entraña: corte delgado y sabroso. Más rápido de cocinar, muy popular en parrillas informales.'),
    li('Mollejas: glándulas del toro, a la parrilla. Textura cremosa, sabor intenso. No las saltees sin probarlas.'),
    li('Chorizos: de cerdo o mezcla, a la parrilla. El choripán (chorizo en pan con chimichurri) es el snack más uruguayo que existe.'),
    h3('Dónde comer el mejor asado de Montevideo'),
    li('Mercado del Puerto (Ciudad Vieja): el templo del asado montevideano. Parrilladas enormes, ambiente histórico, precios altos pero la experiencia vale. Mejor el sábado al mediodía. — Puerto de Montevideo, Ciudad Vieja.'),
    li('Parrillas de barrio: las mejores experiencias suelen ser en restaurantes sin pretensiones en Cordón, Palermo o Pocitos. Buscá los que tienen fuego a la vista desde la vereda.'),
    callout('green', 'Tip local', 'El Mercado del Puerto tiene mucho turismo. Si querés una experiencia más auténtica y más barata, pedile a algún uruguayo que te lleve a su parrilla de confianza del barrio. Esa es la versión que los locales eligen el domingo.'),

    h2('Las facturas — el desayuno uruguayo'),
    p('Las facturas son la categoría genérica para los productos de panadería dulces que se comen en el desayuno o la merienda. Uruguay tiene una cultura de panaderías muy fuerte — la panadería del barrio es tan importante como el almacén.'),
    li('Medialunas: croissants uruguayos, más dulces y blandos que los franceses. Hay de manteca y de grasa.'),
    li('Cañas: enrolladas con crema pastelera o dulce de leche. Muy populares.'),
    li('Vigilantes: masa hojaldrada rellena de membrillo o pasta de guayaba.'),
    li('Bizcochos: varios tipos de masa seca o hojaldrada, dulces o salados.'),
    li('Tortas fritas: masa frita en grasa o aceite, servida con azúcar. El clásico para los días de lluvia. La relación torta frita-día lluvioso en Uruguay es casi un condicionamiento cultural.'),
    callout('blue', 'El desayuno uruguayo estándar', 'Café con leche (feca) + medialunas o bizcochos. En cualquier confitería o bar de barrio, esto cuesta entre $150 y $280 UYU (~$3–6 USD). Es uno de los placeres más honestos y baratos de vivir en Uruguay.'),

    h2('La influencia italiana — pasta y pizza uruguaya'),
    p('Uruguay recibió una ola migratoria italiana enorme entre 1880 y 1950. Eso se nota en la cocina: la pasta es un alimento central en la dieta uruguaya, y la pizza tiene su propia versión local.'),
    h3('Pasta'),
    p('El 29 de cada mes es el "día de los ñoquis" — una tradición de origen italiano muy arraigada en Uruguay. Se pone dinero debajo del plato para atraer la prosperidad del mes. Los restaurantes de pasta se llenan. Es completamente en serio.'),
    li('Ñoquis, ravioles, canelones y fideos caseros son comida cotidiana, no especial.'),
    li('Las mejores pastelerías italianas de Montevideo están en Cordón y en el barrio Goes — descendientes de inmigrantes que siguen con los negocios de familia.'),
    h3('Pizza uruguaya'),
    p('La pizza uruguaya es diferente a la italiana y a la argentina. Es más gruesa, con mucho queso, a veces con fainá encima (más sobre eso abajo). Se come en pizzerías que tienen décadas de historia en los mismos locales.'),
    li('Pizza a la piedra vs. pizza al molde: las dos existen. La "al molde" es la versión uruguaya más clásica — más esponjosa, bordes altos.'),
    li('El combo clásico: pizza + fainá + medio y medio. No negociable.'),
    callout('gold', 'Fainá', 'La fainá es una torta de harina de garbanzo de origen genovés, horneada y servida encima de la pizza o sola. Es densa, levemente aceitosa y perfecta. Si pedís pizza en una pizzería tradicional y no pedís fainá, te van a mirar raro.'),

    h2('El dulce de leche — la obsesión nacional'),
    p('El dulce de leche uruguayo tiene fama propia, incluso entre los argentinos que también lo reclaman como suyo. Es más firme que el argentino, menos empalagoso, con un caramelizado más pronunciado. Se usa en todo: medialunas, alfajores, tortas, helados, panqueques, o simplemente con una cuchara directo del frasco.'),
    li('Las marcas más queridas: Conaprole (la más clásica, producción nacional de cooperativa), Los Nietitos, Colun.'),
    li('El alfajor uruguayo: dos tapas de galletita con dulce de leche en el medio, bañado en chocolate o glaseado. Cada panadería tiene el suyo.'),
    callout('green', 'Para llevar de Uruguay', 'Un frasco de dulce de leche Conaprole o una caja de alfajores artesanales son los regalos más apreciados para llevar cuando viajás. Mejor que cualquier souvenir de tienda de turismo.'),

    h2('Lo que toman los uruguayos'),
    h3('Tannat — el vino nacional'),
    p('El Tannat es la uva emblema de Uruguay. Es una variedad de origen francés (del sudoeste) que encontró en los suelos uruguayos su expresión más lograda. Los vinos Tannat uruguayos son tintos estructurados, con taninos firmes y mucha personalidad. La región principal es Canelones, a 30–60 minutos de Montevideo.'),
    li('Bodegas recomendadas para visitar: Bouza, Pisano, Carrau, Juanicó, De Lucca, Alto de la Ballena.'),
    li('Para comprar en supermercado: Pisano, Juanicó y Don Pascual son buenas opciones de precio accesible.'),
    li('Maridaje natural: con el asado, especialmente con cortes más grasos como el vacío o la tira.'),
    h3('Medio y medio'),
    p('El medio y medio es la bebida montevideana por excelencia: mitad vino blanco tranquilo, mitad vino blanco espumante. Fresco, bajo en alcohol, perfecto para acompañar pizza y fainá. Se originó en el bar La Ronda de Ciudad Vieja y hoy se sirve en toda la ciudad.'),
    h3('Grappamiel'),
    p('Grappa mezclada con miel. Suena raro, funciona perfecto. Es el digestivo uruguayo. Se toma después de comer, especialmente en los meses fríos. Está en todos los almacenes y bares.'),
    h3('Clericó'),
    p('Sangría uruguaya: vino blanco o rosado con frutas de estación, azúcar y a veces un poco de soda. Se hace en jarra y se sirve bien frío. El trago del verano.'),

    h2('Dónde comer en Montevideo'),
    h3('Mercados y ferias'),
    li('Mercado Agrícola de Montevideo (MAM): food hall en el barrio Goes. Puestos de comida artesanal, quesos, fiambres, frutas, restaurantes y bares internos. Abierto todos los días. — Bulevar José Batlle y Ordóñez 3002.'),
    li('Mercado del Puerto: parrilladas tradicionales en Ciudad Vieja. El más turístico pero también el más icónico. Mejor al mediodía de sábado. — Rambla 25 de Agosto, Ciudad Vieja.'),
    li('Feria de Tristán Narvaja: mercado de pulgas dominical en Cordón. También hay puestos de comida callejera, tortas fritas, choripán y empanadas. — Calle Tristán Narvaja, Cordón.'),
    h3('Delivery'),
    li('Pedidos Ya: la app de delivery más usada en Uruguay. Cubre Montevideo y ciudades del interior. Restaurantes, supermercados, farmacias. — pedidosya.com.uy'),
    li('Rappi: también disponible en Montevideo para delivery de comida y supermercados.'),
    callout('blue', 'Menú del día', 'De lunes a viernes al mediodía, casi todos los restaurantes y bares ofrecen el "menú del día" o "plato del día": entrada + plato principal + postre o bebida por un precio fijo. Ronda entre $350 y $600 UYU (~$7–13 USD). Es la forma más barata y completa de comer bien en Montevideo.'),

    h2('Supermercados — dónde hacer las compras'),
    p('Uruguay tiene una red de supermercados muy completa. Los precios son más altos que en Argentina o Paraguay, pero la calidad es consistente y los productos locales son excelentes.'),
    li('Tienda Inglesa: la cadena premium. Mejor selección de importados, quesos, vinos. Precios más altos. Varias sucursales en Pocitos, Punta Carretas y Carrasco.'),
    li('Disco / Devoto: rango medio. Buena relación calidad-precio. Muy completo. Presencia en todos los barrios.'),
    li('Ta-Ta: la opción económica. Buenos precios en básicos. Menos variedad de importados.'),
    li('Géant: hipermercado. Si necesitás comprar en cantidad o encontrar productos especiales.'),
    callout('green', 'Para cocinar en casa', 'Los productos lácteos uruguayos (quesos, yogures, manteca) son de muy buena calidad y precio razonable. La carne en carnicerías de barrio es significativamente más barata y mejor que en los supermercados. Buscá la carnicería más cercana a tu apartamento — los carniceros de barrio son un recurso de vida.'),
  ],
}

console.log('Creating cuisine guide in Sanity...')

try {
  const result = await client.create(guide)
  console.log(`✓ Created: "${guide.title}" (${result._id})`)
} catch (err) {
  console.error(`✗ Failed:`, err.message)
}

console.log('\nDone! Check your Sanity Studio at localhost:3000/studio')
