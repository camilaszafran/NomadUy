import type { Ruta } from '@/types'
import { arrivalLocale } from '@/lib/arrival-links'

const categories = {
  wine: ['Vino y olivos', 'Wine and olives', 'Vinho e azeite'],
  food: ['Quesos y gastronomía', 'Cheese and food', 'Queijos e gastronomia'],
  hike: ['Senderismo', 'Hiking', 'Trilhas'],
  reserve: ['Áreas protegidas', 'Protected areas', 'Áreas protegidas'],
  beach: ['Playa', 'Beach', 'Praia'],
  town: ['Pueblos y patrimonio', 'Villages and heritage', 'Povoados e patrimônio'],
  water: ['Náutica', 'Boating', 'Náutica'],
  argentina: ['Frontera con Argentina', 'Argentina border', 'Fronteira com a Argentina'],
  brazil: ['Frontera con Brasil', 'Brazil border', 'Fronteira com o Brasil'],
} as const

const itineraries = [
  [
    "vino-olivos-maldonado",
    "wine",
    2,
    [
      "Vino y olivos entre Pueblo Edén y Garzón",
      "Wine and olive oil from Pueblo Edén to Garzón",
      "Vinhos e azeites entre Pueblo Edén e Garzón"
    ],
    [
      "Pueblo Edén",
      "Ruta 12",
      "Garzón"
    ],
    [
      [
        "Reservá una visita a una bodega de la Ruta 12 y almorzá en Pueblo Edén.",
        "Book a Route 12 winery visit and have lunch in Pueblo Edén.",
        "Reserve uma visita a uma vinícola da Ruta 12 e almoce em Pueblo Edén."
      ],
      [
        "Seguí a Garzón para conocer el pueblo. Coordiná la segunda degustación o una almazara y organizá un traslado si vas a tomar.",
        "Explore Garzón. Book a second tasting or olive mill visit and arrange a ride if you will be drinking.",
        "Conheça Garzón. Reserve outra degustação ou visite um lagar de azeite e organize transporte se for beber."
      ]
    ],
    "https://maldonado.gub.uy/camino-vid-los-olivos"
  ],
  [
    "quesos-colonia-suiza",
    "food",
    1,
    [
      "Quesos de Colonia Suiza y Colonia Valdense",
      "Cheese in Colonia Suiza and Colonia Valdense",
      "Queijos de Colonia Suiza e Colonia Valdense"
    ],
    [
      "Nueva Helvecia",
      "Colonia Valdense"
    ],
    [
      [
        "Empezá en la Plaza de los Fundadores de Nueva Helvecia. Consultá si la quesería Teófilo Karlen recibe visitas o vende al público. Después pasá por Colonia Valdense para completar el recorrido por las colonias del este de Colonia.",
        "Start at Nueva Helvecia’s founders’ square. Check whether Teófilo Karlen cheese dairy accepts visitors or sells directly. Continue to Colonia Valdense to explore the eastern settlements of Colonia.",
        "Comece na Praça dos Fundadores de Nueva Helvecia. Confira se a queijaria Teófilo Karlen recebe visitas ou vende ao público. Siga para Colonia Valdense, no leste de Colonia."
      ]
    ],
    "https://www.colonia.gub.uy/turismo/unaCiudad.php?x=b1d5781111d84f7b3fe45a0852e59758cd7a87e5"
  ],
  [
    "senderos-arequita-minas",
    "hike",
    1,
    [
      "Minas y senderos del Arequita",
      "Minas and the Arequita trails",
      "Minas e trilhas do Arequita"
    ],
    [
      "Minas",
      "Cerro Arequita"
    ],
    [
      [
        "Visitá el centro de Minas y reservá la tarde para el entorno del Arequita. Consultá qué senderos y accesos están habilitados y elegí el recorrido según el clima y tu experiencia.",
        "Visit central Minas and spend the afternoon around Arequita. Check which trails and entrances are open and pick a walk that suits weather and experience.",
        "Visite o centro de Minas e reserve a tarde para o entorno do Arequita. Confira quais trilhas e acessos estão abertos e escolha conforme o clima e sua experiência."
      ]
    ],
    "https://uruguaynatural.com/es/destinos-regiones/"
  ],
  [
    "montes-del-queguay-guichon",
    "reserve",
    2,
    [
      "Guichón y Montes del Queguay",
      "Guichón and Montes del Queguay",
      "Guichón e Montes del Queguay"
    ],
    [
      "Guichón",
      "Montes del Queguay"
    ],
    [
      [
        "Usá Guichón como base y consultá por caminos, sectores habilitados y guías del área protegida.",
        "Base yourself in Guichón and ask about road access, open areas and guides.",
        "Use Guichón como base e consulte sobre estradas, setores abertos e guias."
      ],
      [
        "Salí temprano para recorrer monte nativo por un sendero habilitado. Elegí con el guía según el estado de los caminos.",
        "Start early for a walk through native woodland on an open trail. Choose your route with a guide according to road conditions.",
        "Saia cedo para caminhar pela mata nativa em trilha autorizada. Escolha o percurso com o guia conforme o estado das estradas."
      ]
    ],
    "https://www.gub.uy/ministerio-ambiente/nuestras-areas-protegidas"
  ],
  [
    "santiago-vazquez-humedales",
    "reserve",
    1,
    [
      "Santiago Vázquez y Humedales de Santa Lucía",
      "Santiago Vázquez and the Santa Lucía wetlands",
      "Santiago Vázquez e zonas úmidas do Santa Lucía"
    ],
    [
      "Santiago Vázquez",
      "Río Santa Lucía"
    ],
    [
      [
        "Caminá por el pueblo y la costa del río. Llevá binoculares para observar aves desde los puntos permitidos y consultá si el centro de visitantes está abierto antes de ir.",
        "Walk through the village and along the river. Bring binoculars to watch birds from permitted spots and check visitor centre hours before leaving.",
        "Caminhe pelo povoado e pela margem do rio. Leve binóculos para observar aves dos pontos permitidos e confirme o horário do centro de visitantes."
      ]
    ],
    "https://www.gub.uy/ministerio-ambiente/nuestras-areas-protegidas"
  ],
  [
    "san-javier-nuevo-berlin-farrapos",
    "reserve",
    2,
    [
      "San Javier, Nuevo Berlín y Esteros de Farrapos",
      "San Javier, Nuevo Berlín and Esteros de Farrapos",
      "San Javier, Nuevo Berlín e Esteros de Farrapos"
    ],
    [
      "San Javier",
      "Esteros de Farrapos",
      "Nuevo Berlín"
    ],
    [
      [
        "Recorré el casco de San Javier y consultá en el centro de visitantes por el sendero de Puerto Viejo.",
        "Explore San Javier and ask at the visitor centre about the Puerto Viejo trail.",
        "Explore San Javier e consulte o centro de visitantes sobre a trilha de Puerto Viejo."
      ],
      [
        "Seguí a Nuevo Berlín y paseá por el muelle. Si querés salir al agua, coordiná con un guía local y confirmá el estado del río.",
        "Continue to Nuevo Berlín and walk by the pier. If you want to go on the water, book a guide and confirm river conditions.",
        "Siga para Nuevo Berlín e caminhe pelo cais. Para sair na água, combine com um guia e confirme as condições do rio."
      ]
    ],
    "https://uruguaynatural.com/es/places/san-javier/"
  ],
  [
    "la-paloma-la-pedrera-laguna",
    "beach",
    2,
    [
      "La Paloma, La Pedrera y Laguna de Rocha",
      "La Paloma, La Pedrera and Rocha Lagoon",
      "La Paloma, La Pedrera e Lagoa de Rocha"
    ],
    [
      "La Paloma",
      "La Pedrera",
      "Laguna de Rocha"
    ],
    [
      [
        "Arrancá por el faro de Cabo Santa María en La Paloma y seguí al mirador de La Pedrera. Para bañarte, elegí un sector habilitado y mirá las banderas.",
        "Start at the Cabo Santa María lighthouse in La Paloma and head to the La Pedrera lookout. Swim in designated areas and check the flags.",
        "Comece pelo farol do Cabo Santa María e siga ao mirante de La Pedrera. Para nadar, escolha uma área autorizada e confira as bandeiras."
      ],
      [
        "Dedicá la mañana a observar aves en Laguna de Rocha desde los accesos permitidos. Confirmá el estado del camino antes de salir.",
        "Spend the morning birdwatching at Rocha Lagoon from permitted access points. Check road conditions before heading out.",
        "Passe a manhã observando aves na Lagoa de Rocha pelos acessos permitidos. Confira o estado da estrada antes de sair."
      ]
    ],
    "https://turismorocha.gub.uy/destinos/la-paloma"
  ],
  [
    "costa-de-oro-atlantida",
    "beach",
    1,
    [
      "Costa de Oro: Atlántida, El Águila y Parque del Plata",
      "Gold Coast: Atlántida, El Águila and Parque del Plata",
      "Costa de Oro: Atlántida, El Águila e Parque del Plata"
    ],
    [
      "Atlántida",
      "Villa Argentina",
      "Parque del Plata"
    ],
    [
      [
        "Recorré la rambla de Atlántida y mirá El Águila desde el espacio público en Villa Argentina. Cerrá el día junto a la desembocadura del arroyo Solís Chico en Parque del Plata.",
        "Walk Atlántida’s waterfront and see El Águila from public areas in Villa Argentina. Finish by the mouth of the Solís Chico stream in Parque del Plata.",
        "Caminhe pela orla de Atlántida e veja El Águila de um espaço público em Villa Argentina. Termine junto à foz do arroio Solís Chico, em Parque del Plata."
      ]
    ],
    "https://www.uruguay.uy/balnearios-y-pueblos"
  ],
  [
    "aigua-sierra-carape",
    "town",
    2,
    [
      "Aiguá y los pueblos de las sierras",
      "Aiguá and the villages of the hills",
      "Aiguá e os povoados das serras"
    ],
    [
      "Aiguá",
      "Sierras de Carapé",
      "Pueblo Edén"
    ],
    [
      [
        "Recorré el centro de Aiguá y consultá en turismo local por visitas o caminatas rurales con guía.",
        "Explore central Aiguá and ask the tourism office about guided rural walks and visits.",
        "Explore o centro de Aiguá e pergunte no turismo local sobre visitas e caminhadas guiadas."
      ],
      [
        "Reservá una comida en Pueblo Edén y armá el traslado por las sierras con rutas habilitadas. Consultá el estado de los caminos rurales si llovió.",
        "Book lunch in Pueblo Edén and plan the drive through the hills on open roads. Check rural road conditions after rain.",
        "Reserve o almoço em Pueblo Edén e planeje a travessia das serras por vias abertas. Confira as estradas rurais após chuva."
      ]
    ],
    "https://maldonado.gub.uy/camino-vid-los-olivos"
  ],
  [
    "san-gregorio-murales-rio",
    "town",
    2,
    [
      "San Gregorio de Polanco: murales y río Negro",
      "San Gregorio de Polanco: murals and the Río Negro",
      "San Gregorio de Polanco: murais e rio Negro"
    ],
    [
      "San Gregorio de Polanco",
      "Museo Abierto",
      "Río Negro"
    ],
    [
      [
        "Recorré a pie los murales y esculturas del Museo Abierto en el centro del pueblo.",
        "Walk through the village to see the open-air museum’s murals and sculptures.",
        "Percorra a pé os murais e as esculturas do museu a céu aberto."
      ],
      [
        "Dedicá el segundo día a la costa del río Negro. Si querés salir en kayak, coordiná la actividad y consultá viento, acceso y puntos seguros de embarque.",
        "Spend the second day by the Río Negro. For kayaking, book ahead and check the wind, river access and safe launch points.",
        "Dedique o segundo dia à margem do rio Negro. Para andar de caiaque, combine antes e verifique vento, acesso e pontos seguros de embarque."
      ]
    ],
    "https://uruguaynatural.com/es/destinos-regiones/"
  ],
  [
    "mercedes-villa-soriano-nautica",
    "water",
    2,
    [
      "Río Negro náutico: Mercedes y Villa Soriano",
      "Río Negro by water: Mercedes and Villa Soriano",
      "Rio Negro pela água: Mercedes e Villa Soriano"
    ],
    [
      "Mercedes",
      "Río Negro",
      "Villa Soriano"
    ],
    [
      [
        "Caminá la rambla de Mercedes y consultá a Turismo de Soriano por salidas del catamarán y reservas. Confirmá el itinerario antes de organizarte alrededor de él.",
        "Walk the Mercedes waterfront and ask Soriano Tourism about catamaran departures and bookings. Confirm the itinerary before planning around it.",
        "Caminhe pela orla de Mercedes e consulte Turismo de Soriano sobre saídas e reservas do catamarã. Confirme o itinerário antes de montar o passeio."
      ],
      [
        "Seguí a Villa Soriano por tierra si no hay navegación. Recorré el muelle y el casco histórico.",
        "Continue to Villa Soriano by road if boats are not operating. Explore the pier and historic centre.",
        "Siga por terra a Villa Soriano se não houver passeio náutico. Conheça o cais e o centro histórico."
      ]
    ],
    "https://www.mobile.soriano.gub.uy/turismo.html"
  ],
  [
    "fray-bentos-puente-argentina",
    "argentina",
    2,
    [
      "Fray Bentos, el Anglo y el puente hacia Argentina",
      "Fray Bentos, the Anglo and the bridge to Argentina",
      "Fray Bentos, o Anglo e a ponte rumo à Argentina"
    ],
    [
      "Fray Bentos",
      "Barrio Anglo",
      "Puente General San Martín"
    ],
    [
      [
        "Visitá el Paisaje Industrial y el Barrio Anglo en Fray Bentos. Confirmá si hay visita guiada en tu fecha.",
        "Visit the Industrial Landscape and Anglo neighbourhood in Fray Bentos. Check for guided visits on your dates.",
        "Visite a Paisagem Industrial e o Bairro Anglo em Fray Bentos. Confira se há visita guiada na data."
      ],
      [
        "Paseá por Las Cañas o dedicá el día al cruce hacia Gualeguaychú. Si cruzás, verificá documentos migratorios, seguro del vehículo y autorización de la rentadora.",
        "Visit Las Cañas or spend the day crossing towards Gualeguaychú. If crossing, check immigration documents, vehicle insurance and rental permission.",
        "Visite Las Cañas ou dedique o dia a cruzar rumo a Gualeguaychú. Confira documentos migratórios, seguro do carro e autorização da locadora."
      ]
    ],
    "https://destinorionegro.gub.uy/fray-bentos-2/"
  ],
  [
    "salto-concordia-frontera",
    "argentina",
    2,
    [
      "Salto y Concordia por el puente de Salto Grande",
      "Salto and Concordia across the Salto Grande bridge",
      "Salto e Concordia pela ponte de Salto Grande"
    ],
    [
      "Salto",
      "Puente Salto Grande",
      "Concordia"
    ],
    [
      [
        "Conocé el centro y la costanera de Salto. Averiguá si hay visitas disponibles al complejo de Salto Grande.",
        "Explore Salto’s centre and waterfront. Ask whether visits to the Salto Grande complex are available.",
        "Conheça o centro e a orla de Salto. Confira se há visitas ao complexo de Salto Grande."
      ],
      [
        "Si cruzás a Concordia, consultá el puesto de frontera por documentación y verificá cómo volver si vas sin auto.",
        "If crossing to Concordia, check documentation with the border post and plan your return if travelling without a car.",
        "Se cruzar para Concordia, confira a documentação no posto de fronteira e planeje a volta se estiver sem carro."
      ]
    ],
    "https://www.gub.uy/ministerio-defensa-nacional/salto"
  ],
  [
    "rio-branco-jaguarao-frontera",
    "brazil",
    2,
    [
      "Río Branco y Jaguarão: patrimonio de frontera",
      "Río Branco and Jaguarão: border heritage",
      "Río Branco e Jaguarão: patrimônio de fronteira"
    ],
    [
      "Río Branco",
      "Puente Barón de Mauá",
      "Jaguarão"
    ],
    [
      [
        "Recorré el centro de Río Branco y acercate al puente Barón de Mauá. Si vas a cruzar, verificá requisitos del paso y seguro del vehículo.",
        "Explore Río Branco and walk towards the Barón de Mauá bridge. If crossing, check entry requirements and vehicle insurance.",
        "Explore Río Branco e conheça a ponte Barão de Mauá. Se for cruzar, confira os requisitos e o seguro do veículo."
      ],
      [
        "Del lado brasileño, recorré el centro histórico de Jaguarão y planificá el regreso con tiempo para los controles.",
        "On the Brazilian side, explore historic Jaguarão and allow time for the border checks on the way back.",
        "Do lado brasileiro, visite o centro histórico de Jaguarão e reserve tempo para os controles na volta."
      ]
    ],
    "https://www.aduanas.gub.uy/innovaportal/v/26880/1/innova.front/avances-en-facilitacion-del-proyecto-de-gestion-coordinada-de-fronteras-del-mercosur.html"
  ],
  [
    "chuy-san-miguel-frontera",
    "brazil",
    2,
    [
      "Chuy, Barra del Chuy y Fuerte San Miguel",
      "Chuy, Barra del Chuy and Fort San Miguel",
      "Chuy, Barra del Chuy e Forte San Miguel"
    ],
    [
      "Chuy",
      "Barra del Chuy",
      "Fuerte San Miguel"
    ],
    [
      [
        "Caminá la avenida fronteriza del Chuy y seguí hacia la playa de Barra del Chuy, del lado uruguayo. Si entrás a Brasil, confirmá dónde hacer el control migratorio que corresponda.",
        "Walk Chuy’s border avenue and visit the beach at Barra del Chuy on the Uruguayan side. If entering Brazil, confirm where to complete any required immigration checks.",
        "Caminhe pela avenida de fronteira em Chuy e visite a praia de Barra del Chuy, no lado uruguaio. Se entrar no Brasil, confira onde fazer o controle migratório exigido."
      ],
      [
        "Visitá el Fuerte San Miguel y los alrededores del parque por los sectores habilitados. Consultá horarios y accesos antes de salir.",
        "Visit Fort San Miguel and the open areas of the park. Check opening hours and access in advance.",
        "Visite o Forte San Miguel e as áreas abertas do parque. Confira horários e acessos antes de sair."
      ]
    ],
    "https://www.gub.uy/ministerio-ambiente/nuestras-areas-protegidas"
  ]
] as const

export function regionalRoutes(locale: string): Ruta[] {
  const index = { es: 0, en: 1, pt: 2 }[arrivalLocale(locale)]
  const day = ['Día', 'Day', 'Dia'][index]
  return itineraries.map(([slug, category, length, titles, stops, legs, source]) => ({
    _id: 'regional-' + slug,
    slug: { current: slug },
    title: titles[index],
    interestLabel: categories[category][index],
    duration: length === 1 ? ['1 día', '1 day', '1 dia'][index] : ['Fin de semana', 'Weekend', 'Fim de semana'][index],
    durationKey: length === 1 ? '1 día' : 'Fin de semana',
    stops: [...stops],
    itinerary: legs.map((text, i) => ({ _key: String(i + 1), day: day + ' ' + (i + 1), content: text[index] })),
    doLinks: [{ _key: 'source', label: ['Consultar información oficial', 'Check official information', 'Consultar informações oficiais'][index], url: source }],
  }))
}
