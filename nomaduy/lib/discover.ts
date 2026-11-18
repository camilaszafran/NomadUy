export type Listing = {
  title: string
  region: string
  kind: string
  description: string
  href?: string
  label?: string
  map?: string
}

export const tourism = [
  ["Instagram de Turisteando", "https://www.instagram.com/appturisteando/"],
  ['Turisteando para Android', 'https://play.google.com/store/apps/details?hl=es&id=com.athanor.turisteando'],
  ['Turisteando para iPhone', 'https://apps.apple.com/uy/app/turisteando/id6480015882'],
] as const

export const arrivalLinks = {
  antel: 'https://roaming.antel.com.uy/plan/749/prepago_lte',
  claro: 'https://www.claro.com.uy/personas/chips',
  claroEsim: 'https://asistencia.claro.com.uy/asistencia/servicios-en-tu-celu/chip-y-cobertura/quien-puede-usar-la-esim-de-claro',
  tigo: 'https://ayuda.tigo.com.uy/hc/centro-de-ayuda/articles/37177628164511-informacion-sobre-linea-y-chips-tigo',
  prex: 'https://www.prexcard.com/ayuda/2.1',
  midinero: 'https://www.midinero.com.uy/productos/midinero-tarjeta-prepaga-uruguay/',
}

export const transport: Listing[] = [
  {title:'URUBUS',region:'Todo Uruguay',kind:'Ómnibus',description:'Buscá pasajes a destinos de todo Uruguay. Consultá qué empresas venden en la plataforma y compará también el regreso.',href:'https://www.urubus.com.uy/?lang=es',label:'Buscar pasajes'},
  {title:'Tres Cruces',region:'Montevideo',kind:'Terminal',description:'Consultá servicios, partidas y arribos de la terminal de Montevideo. Confirmá con la empresa las paradas intermedias.',href:'https://www.trescruces.com.uy/terminal/',label:'Consultar la terminal'},
  {title:'Viatik',region:'Todo Uruguay',kind:'Viaje compartido',description:'Buscá a alguien que ya haga tu recorrido y coordiná el punto de encuentro y el aporte del viaje en la plataforma.',href:'https://www.viatik.com/uy',label:'Buscar viajes compartidos'},
  {title:'TripWip',region:'Todo Uruguay',kind:'Alquiler de autos',description:'Si tu destino requiere auto, buscá un vehículo para manejar vos. Revisá requisitos, cobertura y lugar de retiro antes de reservar.',href:'https://tripwip.app/',label:'Buscar autos'},
  {title:'Uber',region:'Según la ciudad',kind:'Traslados',description:'Pedí un viaje desde la app. Consultá la cobertura por ciudad y la disponibilidad desde tu ubicación.',href:'https://www.uber.com/global/es-es/r/uruguay/cities/',label:'Ver cobertura'},
  {title:'Cabify',region:'Montevideo y Maldonado',kind:'Traslados',description:'Pedí un traslado desde la app. Cabify lista Montevideo y Maldonado; verificá que haya servicio para tu punto de partida.',href:'https://help.cabify.com/hc/es/articles/115000996089--En-qu%C3%A9-ciudades-opera-Cabify',label:'Ver cobertura'},
  {title:'Voy en Taxi',region:'Montevideo',kind:'Taxi',description:'Pedí un taxi desde el celular en Montevideo y seguí el vehículo que va a buscarte.',href:'https://www.voyentaxi.com/',label:'Ver la app'},
]

export const stays: Listing[] = [
  {title:'Hostelworld',region:'Uruguay',kind:'Hostels',description:'Buscá una cama compartida o habitación privada. Compará los espacios comunes y la ubicación antes de reservar.',href:'https://www.hostelworld.com/es/albergues/america-del-sur/uruguay/montevideo/',label:'Buscar hostels'},
  {title:'Airbnb',region:'Uruguay',kind:'Estadías temporarias',description:'Buscá habitaciones, apartamentos y casas. Si vas a trabajar, consultá por Wi-Fi y mesa antes de reservar.',href:'https://es.airbnb.com/uruguay/stays',label:'Buscar alojamientos'},
  {title:'CheckRent',region:'Uruguay',kind:'Alquiler temporario',description:'Plataforma uruguaya de alquileres temporarios, nacida en Punta del Este.',href:'https://www.checkrent.com.uy/',label:'Consultar propiedades'},
]

export const cafes: Listing[] = [
  {title:'Escaramuza',region:'Montevideo',kind:'Librería y café',description:'Libros y café en Cordón. Podés combinar la merienda con una recorrida por la librería o consultar sus talleres.',href:'https://escaramuza.com.uy/site/index',map:'Escaramuza, Montevideo, Uruguay'},
  {title:'La Beduina Café',region:'Colonia',kind:'Merienda',description:'Casa de té y café para hacer una pausa en Colonia del Sacramento.',href:'https://www.labeduinacafe.com/',map:'La Beduina Café, Colonia del Sacramento, Uruguay'},
  {title:'Serrano Café',region:'Colonia',kind:'Café de especialidad',description:'Espresso bar para sumar a un paseo por Colonia del Sacramento.',href:'https://cafeserrano.store/',map:'Serrano Café, Colonia del Sacramento, Uruguay'},
  {title:'Checa y Tomate',region:'Maldonado',kind:'Merienda',description:'Pastelería en Piriápolis nacida del encuentro entre una emprendedora checa y un cocinero uruguayo.',href:'https://www.instagram.com/checa_en_uruguay/',map:'Checa y Tomate, Piriápolis, Uruguay'},
  {title:'Oceanida',region:'Rocha',kind:'Parada en la costa',description:'Restaurante y cafetería en La Paloma. Consultá sus horarios antes de ir fuera de temporada.',href:'https://www.instagram.com/oceanida_resto/',map:'Oceanida, La Paloma, Rocha, Uruguay'},
  {title:'Panadería Minerva',region:'Salto',kind:'Merienda',description:'Panadería con salón de café para sentarte a merendar o llevarte algo para el camino.',href:'https://panaderiaminerva.uy/',map:'Panadería Minerva, Salto, Uruguay'},
  {title:'Seis Montes',region:'Montevideo',kind:'Café de especialidad',description:'Tostadores de café con locales en Montevideo. Su sitio lista las direcciones para elegir la más cercana.',href:'https://www.seismontes.com/cafes',map:'Seis Montes Café, Montevideo, Uruguay'},
]

export const trips: Listing[] = [
  {title:'Colonia del Sacramento',region:'Colonia',kind:'Por el día',description:'Desde Tres Cruces, buscá llegada a la terminal de Colonia. Seguí a pie hacia el Barrio Histórico y volvé desde la misma terminal. Reservá tiempo para caminar por la rambla.',map:'Terminal de Ómnibus, Colonia del Sacramento, Uruguay'},
  {title:'Piriápolis',region:'Maldonado',kind:'Por el día',description:'Buscá un servicio desde Montevideo que entre a Piriápolis. Desde la terminal podés recorrer la rambla y el puerto a pie. Confirmá el último ómnibus antes de salir.',map:'Terminal de Ómnibus de Piriápolis, Uruguay'},
  {title:'Minas',region:'Lavalleja',kind:'Por el día',description:'Llegá a la terminal de Minas y recorré el centro a pie. Para sumar un destino de las sierras, coordiná el traslado y el regreso con antelación.',map:'Terminal de Ómnibus de Minas, Uruguay'},
  {title:'La Paloma',region:'Rocha',kind:'Fin de semana',description:'Buscá el servicio a la terminal de La Paloma. El centro y el faro se pueden combinar caminando. Consultá si tu horario requiere conexión en Rocha.',map:'Terminal de Ómnibus La Paloma, Rocha, Uruguay'},
  {title:'Salto',region:'Salto',kind:'Fin de semana',description:'Buscá un ómnibus interdepartamental a Salto. Para conocer las termas de Daymán, confirmá por separado el transporte local y sus últimos horarios.',map:'Terminal de Ómnibus de Salto, Uruguay'},
  {title:'Rivera',region:'Rivera',kind:'Fin de semana',description:'Buscá un servicio a la terminal de Rivera. Podés recorrer el centro y la Plaza Internacional, y reservar tiempo para conocer la vida de frontera. Si cruzás a Brasil, revisá las condiciones de ingreso.',map:'Plaza Internacional, Rivera, Uruguay'},
]

export const social: Listing[] = [
  {title:'Vinito y Amigos',region:'Montevideo y Maldonado',kind:'Comidas y encuentros',description:'Encuentros para conocer gente en Montevideo y Punta del Este. Consultá las fechas y cómo reservar si vas solo.',href:'https://www.vinitoyamigos.com/uy',label:'Ver encuentros'},
  {title:'Portal Bosque',region:'Maldonado',kind:'Arte, cerámica y música',description:'Club familiar en La Barra, zona de Punta del Este. Combina naturaleza con talleres y actividades; consultá edades, agenda y acceso.',href:'https://www.portalbosque.com/propuestas',label:'Ver propuestas',map:'Portal Bosque, La Barra, Maldonado'},
  {title:'Escaramuza',region:'Montevideo',kind:'Lectura y talleres',description:'Clubes de lectura y talleres de escritura, dibujo e idiomas en una librería con café. Consultá las inscripciones.',href:'https://escaramuza.com.uy/talleres',label:'Ver talleres y clubes'},
  {title:'Jugones Uruguay',region:'Todo Uruguay',kind:'Juegos de mesa',description:'Agenda para sumarte a mesas y encuentros, con opciones en Montevideo y actividades anunciadas en el interior.',href:'https://jugones.uy/eventos/',label:'Ver agenda de juegos'},
  {title:'Asados Random',region:'Uruguay',kind:'Comidas y encuentros',description:'Anotate para conocer gente alrededor de un asado. El sitio explica cómo se arman los grupos.',href:'https://asados.nomad.com.uy/',label:'Ver cómo sumarte'},
  {title:'Peepl',region:'Montevideo',kind:'Comidas y encuentros',description:'Experiencias en grupo y planes para sumarte aunque no conozcas a nadie.',href:'https://peepl.me/',label:'Ver próximos planes'},
  {title:'Timeleft',region:'Montevideo',kind:'Comidas y encuentros',description:'Cenas organizadas para conocer a otras personas. La plataforma muestra las opciones disponibles por ciudad.',href:'https://timeleft.com/es/',label:'Ver disponibilidad'},
  {title:'Montevideo Social and Language Exchange',region:'Montevideo',kind:'Idiomas',description:'Para practicar conversación y conocer gente de otros países. Consultá próximas fechas y condiciones en la agenda del organizador.',href:'https://www.eventbrite.com/e/montevideo-social-and-language-exchange-make-new-friends-tickets-1989651417951',label:'Ver encuentros'},
  {title:'La Herradura y otras escuelas de español',region:'Maldonado y Montevideo',kind:'Idiomas',description:'El directorio de Live in Uruguay incluye clases de español para extranjeros y opciones grupales en Punta del Este y Montevideo.',href:'https://www.liveinuruguay.uy/es/learn-spanish',label:'Ver escuelas de español'},
  {title:'Español para extranjeros · Udelar',region:'Montevideo',kind:'Idiomas',description:'Cursos de español según el perfil del estudiante, con opciones para migrantes. Consultá requisitos de cada convocatoria.',href:'https://fhce.edu.uy/espanol-lengua-extranjera/',label:'Ver cursos'},
  {title:'Anglo',region:'Todo Uruguay',kind:'Idiomas',description:'Directorio de centros de inglés. Elegí tu sede y preguntá por clases grupales para adultos y principiantes.',href:'https://www.anglo.edu.uy/centros-anglo/',label:'Buscar un centro'},
  {title:'Alianza',region:'Todo Uruguay',kind:'Idiomas',description:'Red de centros de inglés. Consultá la sede de tu localidad, los niveles y si hay opciones presenciales.',href:'https://www.alianza.edu.uy/es/nosotros/centros.html',label:'Buscar un centro'},
  {title:'Centros de Lenguas de ANEP',region:'Todo Uruguay',kind:'Idiomas',description:'Oferta para estudiantes que cumplen las condiciones del programa. Consultá idiomas y requisitos en tu localidad.',href:'https://www.anep.edu.uy/codicen/politicas-linguisticas/cle/contactos',label:'Ver centros y contactos'},
  {title:'Evidence Run Club',region:'Montevideo',kind:'Deporte en grupo',description:'Club social de running. Consultá su punto de encuentro y el ritmo antes de ir por primera vez.',href:'https://evidence.uy/',label:'Consultar salidas'},
  {title:'Carpediem',region:'Maldonado',kind:'Deporte en grupo',description:'Entrenamiento grupal. Consultá horarios y si podés arrancar con una clase de prueba.',href:'https://carpediemgym.com/',label:'Consultar entrenamientos'},
  {title:'Runners UY Interior',region:'Todo Uruguay',kind:'Deporte en grupo',description:'Punto de partida para encontrar grupos de running fuera de la capital y preguntar cómo sumarte.',href:'https://www.runners.com.uy/interior/',label:'Buscar grupos'},
  {title:'Xperience Uruguay',region:'Todo Uruguay',kind:'Senderismo',description:'Salidas de trekking y senderismo. Revisá dificultad, punto de encuentro, equipo y traslado en cada actividad.',href:'https://www.xperience.uy/',label:'Ver salidas'},
  {title:'TECHO Uruguay',region:'Uruguay',kind:'Voluntariado',description:'Consultá las convocatorias para participar en actividades de voluntariado y conocer al equipo.',href:'https://uruguay.techo.org/voluntariado/',label:'Ver convocatorias'},
  {title:'Escuelas de Formación Artística',region:'Maldonado',kind:'Arte, cerámica y música',description:'Oferta departamental de talleres de artes visuales, cerámica y música. Consultá qué se dicta en Maldonado, Piriápolis y otras sedes.',href:'https://www.maldonado.gub.uy/sites/default/files/2026-02/Propuesta%20Educativa%20de%20Cultura%20IDM%202026.pdf',label:'Ver propuesta educativa'},
  {title:'Cursos de la Intendencia de Maldonado',region:'Maldonado',kind:'Cocina y oficios',description:'Cursos por localidad de gastronomía, oficios e idiomas. Consultá el próximo período de inscripción.',href:'https://www.maldonado.gub.uy/noticias/comenzaron-las-inscripciones-los-cursos-2026-intendencia-maldonado',label:'Ver cursos por localidad'},
  {title:'Espacio Cultural Eduardo Piñeyro',region:'Salto',kind:'Arte, cerámica y música',description:'La Intendencia publica talleres como pintura decorativa, restauración y teatro. Consultá qué está abierto a principiantes.',href:'https://www.salto.gub.uy/espacio-cultural-eduardo-pineyro/cursos-y-talleres',label:'Ver talleres'},
  {title:'Escuela Departamental de Artesanías',region:'Paysandú',kind:'Arte, cerámica y música',description:'Una puerta de entrada a los cursos de artesanía del departamento. Consultá los talleres y períodos de inscripción.',href:'https://www.paysandu.gub.uy/2026/06/04/comienzan-las-inscripciones-en-la-escuela-departamental-de-artesanias/',label:'Consultar la escuela'},
  {title:'Talleres de la Dirección de Cultura',region:'Paysandú',kind:'Arte, cerámica y música',description:'La Dirección de Cultura informa cómo inscribirte a talleres departamentales. Consultá la oferta por localidad.',href:'https://www.gub.uy/tramites/inscripcion-taller-direccion-cultura-paysandu',label:'Consultar inscripciones'},
  {title:'Centros Culturales Nacionales',region:'Todo Uruguay',kind:'Arte, cerámica y música',description:'Buscá espacios de cultura en Rocha, Rivera, Tacuarembó, Lavalleja, Colonia y otros departamentos. Preguntá localmente por música, cerámica, pintura, lectura y juegos de mesa.',href:'https://www.gub.uy/ministerio-educacion-cultura/sites/ministerio-educacion-cultura/files/documentos/noticias/Catalogo-Espacios_2025-EC_SIC-v3.pdf',label:'Ver catálogo de espacios'},
  {title:'UTU · Oferta por escuela',region:'Todo Uruguay',kind:'Cocina y oficios',description:'Buscá formación presencial en cocina y gastronomía por escuela. Revisá duración, requisitos y si se trata de un curso regular.',href:'https://oferta.utu.edu.uy/cursosporescuela/',label:'Buscar escuelas'},
]

export const creators: Listing[] = [
  {title:'Viver em Uruguai',region:'Brasil → Uruguay',kind:'Vivir en Uruguay',description:'Contenido en portugués para descubrir Uruguay desde la experiencia de vivir acá.',href:'https://www.instagram.com/vivernouruguai/',label:'Instagram'},
  {title:'Mateo Experience',region:'Uruguay',kind:'Escapadas',description:'Ideas para recorrer Uruguay y descubrir experiencias y rincones nuevos.',href:'https://www.instagram.com/mateoexperience/',label:'Instagram'},
  {title:'Turista en Uruguay',region:'Uruguay',kind:'Escapadas',description:'Escapadas y paseos por el país contados en español.',href:'https://www.instagram.com/turistaenuruguay/',label:'Instagram'},
  {title:'Paseos en Familia',region:'Uruguay',kind:'Escapadas',description:'Planes para salir con niños y descubrir lugares en familia.',href:'https://www.instagram.com/paseos_en_familia/',label:'Instagram'},
  {title:'Te Partís la Boca',region:'Uruguay',kind:'Gastronomía',description:'Recomendaciones para comer y viajar en español.',href:'https://www.tiktok.com/@tepartislaboca',label:'TikTok'},
  {title:'Somos Comiendo',region:'Argentina → Uruguay',kind:'Gastronomía',description:'Pareja rosarina radicada en Uruguay. Recorre bares y restaurantes y comparte su mapa y redes.',href:'https://lnk.bio/Somoscomiendo',label:'Redes y mapa'},
  {title:'Daria',region:'Rusia → Maldonado',kind:'Vivir en Uruguay',description:'Una mirada en español sobre cómo es instalarse y vivir en Maldonado.',href:'https://www.tiktok.com/@dariipixie',label:'TikTok'},
  {title:'Zuzana · Checa en Uruguay',region:'Chequia → Piriápolis',kind:'Vivir en Uruguay',description:'Su experiencia emprendiendo en gastronomía y haciendo vida en Piriápolis.',href:'https://www.instagram.com/checa_en_uruguay/',label:'Instagram'},
  {title:'Maddie in Montevideo',region:'Australia → Montevideo',kind:'Vivir en Uruguay',description:'Vida cotidiana, mate y costumbres montevideanas desde una mirada australiana.',href:'https://lnk.bio/maddiemalan',label:'Instagram y TikTok'},
  {title:'Velu Oliveira',region:'Brasil → Uruguay',kind:'Vivir en Uruguay',description:'Humor en torno a las diferencias entre las costumbres brasileñas y uruguayas.',href:'https://www.tiktok.com/@veluoliiveira',label:'TikTok'},
  {title:'Guru’Guay',region:'Gales → Uruguay',kind:'Vivir en Uruguay',description:'Karen Higgs cuenta cómo es recorrer el país e instalarse, con contenido en inglés y español.',href:'https://www.instagram.com/guruguay1/',label:'Instagram'},
  {title:'Uruguai por uma brasileira',region:'Brasil → Uruguay',kind:'Vivir en Uruguay',description:'Relatos y consejos en portugués sobre mudarse y vivir en Uruguay.',href:'https://www.viveruruguay.com/',label:'Sitio de la autora'},
]

export const interiorAgenda: Listing[] = [
  {title:'Agenda de Rocha',region:'Rocha',kind:'Ferias y actividades',description:'Consultá las fechas con el organizador. Para la costa, buscá el servicio a tu balneario y confirmá el regreso fuera de temporada.',href:'https://turismorocha.gub.uy/',label:'Ver agenda de turismo'},
  {title:'Actividades de Maldonado',region:'Maldonado',kind:'Cultura y aire libre',description:'Elegí la localidad y consultá cómo llegar desde la terminal de Maldonado, Piriápolis o Punta del Este.',href:'https://maldonado.gub.uy/actividades',label:'Ver actividades'},
  {title:'Agenda de Salto',region:'Salto',kind:'Escapadas y eventos',description:'Consultá las propuestas locales y verificá el último tramo si la actividad es fuera de la ciudad.',href:'https://www.salto.uy/eventos',label:'Ver eventos'},
]

export const football: Listing[] = [
  {title:'Baby fútbol de barrio',region:'Todo Uruguay',kind:'Fútbol infantil',description:'En las canchas de barrio se encuentran familias, clubes y vecinos. Buscá la liga en ONFI y preguntá al club cuándo podés ver un encuentro.',href:'https://onfi.org.uy/',label:'Consultar ONFI'},
  {title:'Museo del Fútbol · Estadio Centenario',region:'Montevideo',kind:'Museo',description:'En Parque Batlle. Es el punto de partida para conocer la historia de la selección y del primer Mundial. Consultá entradas y horarios antes de ir.',href:'https://www.estadiocentenario.com.uy/es/museo-del-futbol/',label:'Consultar visita',map:'Museo del Fútbol, Estadio Centenario, Montevideo'},
  {title:'Gran Parque Central',region:'Montevideo',kind:'Estadio',description:'El estadio de Nacional, en La Blanqueada. Consultá al club por entradas a partidos o fechas de visitas guiadas.',href:'https://nacional.uy/',label:'Consultar a Nacional',map:'Gran Parque Central, Montevideo'},
  {title:'Campeón del Siglo',region:'Área metropolitana',kind:'Estadio',description:'El estadio de Peñarol está sobre Ruta 102. Planificá el traslado de ida y vuelta y confirmá con el club las fechas de partidos o visitas.',href:'https://www.xn--pearol-xwa.org/',label:'Consultar a Peñarol',map:'Estadio Campeón del Siglo, Uruguay'},
]

export const agenda: Listing[] = [
  {title:'Tickantel',region:'Uruguay',kind:'Entradas',description:'Buscá espectáculos, recitales, teatro y otros eventos, y comprá entradas cuando estén disponibles.',href:'https://tickantel.com.uy/',label:'Ver espectáculos'},
  {title:'RedTickets',region:'Uruguay',kind:'Entradas',description:'Consultá fechas y entradas para fiestas, música en vivo, actividades y otros eventos.',href:'https://redtickets.uy/',label:'Buscar eventos'},
  {title:'Cartelera',region:'Uruguay',kind:'Agenda cultural',description:'Ideas para salir, con programación de cine, teatro y recitales. Consultá en cada ficha dónde reservar.',href:'https://cartelera.montevideo.com.uy/',label:'Ver cartelera'},
]

export const cowork: Listing[] = [
  {title:'Infoteca',region:'Rivera',kind:'Sala por hora',description:'Sala para reuniones, capacitación o trabajo en Rivera. Consultá disponibilidad y capacidad antes de reservar.',href:'https://infoteca.com.uy/cowork-rivera-infoteca-alquiler-de-salon-por-hora/'},
  {title:'Rocha para trabajar a distancia',region:'Rocha',kind:'Directorio',description:'La Dirección de Turismo de Rocha reúne referencias para trabajar a distancia en el departamento. Confirmá conexión y acceso con el lugar.',href:'https://turismorocha.gub.uy/de-interes/rocha-un-lugar-para-vivir-y-trabajar-127'},
  {title:'Sinergia',region:'Montevideo',kind:'Red de coworks',description:'Espacios compartidos, oficinas y salas de reuniones. Consultá sus sedes y modalidades.',href:'https://sinergia.uy/cowork'},
  {title:'Co-Work LatAm',region:'Montevideo',kind:'Red de coworks',description:'Oficinas y espacios compartidos. Elegí la sede uruguaya y consultá acceso y planes.',href:'https://www.coworklatam.com/sedes/uruguay/'},
  {title:'Conexo',region:'Montevideo',kind:'Cowork y oficinas',description:'Cowork y oficinas en Montevideo. Consultá puestos, salas y disponibilidad.',href:'https://cnx.uy/'},
  {title:'Smart Office',region:'Montevideo',kind:'Cowork y oficinas',description:'Espacios de trabajo y oficinas. Consultá las opciones de cowork y salas.',href:'https://smartoffice.com.uy/cowork/'},
  {title:'Lighthouse Cowork',region:'Montevideo',kind:'Cowork y oficinas',description:'Espacio de trabajo identificado por Uruguay XXI. Usá el directorio para consultar al operador.',href:'https://www.uruguayxxi.gub.uy/en/service-directory/lighthouse-cowork/'},
  {title:'Cowork 18',region:'Montevideo',kind:'Cowork y oficinas',description:'Espacio de trabajo en el Centro. Consultá la ficha de Uruguay XXI y confirmá la modalidad de acceso.',href:'https://www.uruguayxxi.gub.uy/es/directorio-servicio/cowork-18/'},
  {title:'Box Garden',region:'Maldonado',kind:'Cowork y oficinas',description:'Espacios de trabajo y oficinas en Punta del Este. Consultá planes y salas.',href:'https://boxgarden.com.uy/'},
  {title:'Wonder Works',region:'Maldonado',kind:'Cowork y café',description:'Cowork en Punta del Este con café y propuestas de videojuegos.',href:'https://www.bewonderworks.com/es/'},
  {title:'CoWorkers',region:'Maldonado',kind:'Cowork y oficinas',description:'Comunidad y puestos para freelancers, emprendedores y trabajadores remotos en Punta del Este.',href:'https://coworkers.com.uy/cowork/'},
  {title:'Visita Punta del Este',region:'Maldonado',kind:'Directorio',description:'Directorio local para encontrar más espacios de cowork. Confirmá cada sede antes de ir.',href:'https://visitapuntadeleste.com/info/espacios-coworking/'},
  {title:'Gepian Cowork',region:'Salto',kind:'Cowork y oficinas',description:'Espacio de trabajo compartido en Salto. Consultá puestos y condiciones de reserva.',href:'https://www.gepian.com.uy/cowork/'},
  {title:'Colonia Co-Work',region:'Colonia',kind:'Cowork y oficinas',description:'Espacio compartido en Colonia del Sacramento, con página de reservas.',href:'https://addagio.io/book/colonia-co-work-colonia-del-sacramento'},
  {title:'Viajero Hostel Colonia',region:'Colonia',kind:'Cowork y alojamiento',description:'Espacio de trabajo en un hostel de Colonia del Sacramento. Consultá el acceso con el alojamiento o en la plataforma de reserva.',href:'https://pluria.co/es/espacio-de-coworking/uruguay/colonia-del-sacramento/2670--viajero-hostel-colonia'},
  {title:'Zona C · Cowork Atlántida',region:'Canelones',kind:'Cowork y oficinas',description:'Espacio compartido en Atlántida. Contactá al operador para confirmar disponibilidad.',href:'https://www.uruguayemprendedor.uy/emprendimiento/zona-c-cowork-atlantida/'},
  {title:'Espacio Vivo',region:'Canelones',kind:'Cowork y oficinas',description:'Espacio en Ciudad de la Costa. Consultá las modalidades en su agenda de reservas.',href:'https://espaciovivo.setmore.com/'},
  {title:'Nodo Lunarejo',region:'Rivera',kind:'Cowork rural',description:'Trabajo remoto y comunidad en el Valle del Lunarejo. Coordiná el acceso antes de viajar.',href:'https://sites.google.com/villapancha.uy/nodolunarejo'},
  {title:'CCIFA Cowork',region:'Canelones',kind:'Cowork y oficinas',description:'Espacio de trabajo compartido del centro comercial local. Consultá horarios y reservas.',href:'https://ccifa.com.uy/cowork/'},
  {title:'Uruguay XXI',region:'Todo Uruguay',kind:'Directorio',description:'Directorio de oficinas y espacios de cowork para ampliar la búsqueda.',href:'https://www.uruguayxxi.gub.uy/es/directorio-servicios/oficinas-y-espacios-de-co-work/'},
]

export const founders: Listing[] = [
  {title:'Centros Pymes · ANDE',region:'Todo Uruguay',kind:'Orientación',description:'Primer contacto para emprender o mejorar una pequeña empresa. Buscá el centro de tu departamento y consultá sus servicios.',href:'https://ande.org.uy/centros-pymes.html',label:'Encontrar un Centro Pyme'},
  {title:'Uruguay Emprendedor',region:'Todo Uruguay',kind:'Convocatorias y redes',description:'Encontrá instituciones y llamados según la etapa de tu proyecto, desde idea hasta puesta en marcha.',href:'https://www.uruguayemprendedor.uy/',label:'Explorar apoyos'},
  {title:'ANII · Red de incubadoras',region:'Todo Uruguay',kind:'Incubación y financiamiento',description:'Consultá incubadoras apoyadas, instituciones patrocinadoras y convocatorias para proyectos innovadores.',href:'https://anii.org.uy/emprendimientos/incubadoras-anii/',label:'Consultar incubadoras'},
  {title:'Ingenio',region:'Montevideo',kind:'Incubación y financiamiento',description:'Incubadora del LATU para emprendimientos innovadores. Consultá perfil y apertura de llamados.',href:'https://anii.org.uy/emprendimientos/incubadoras-anii/163/ingenio/'},
  {title:'Khem',region:'Canelones',kind:'Incubación y financiamiento',description:'Incubadora de empresas de base tecnológica. Consultá condiciones y etapas de apoyo.',href:'https://www.khem.org.uy/'},
  {title:'ThalesLab',region:'Montevideo',kind:'Incubación y financiamiento',description:'Apoyo a emprendimientos de base tecnológica. Revisá el foco y cómo postularte.',href:'https://anii.org.uy/emprendimientos/incubadoras-anii/174/thaleslab/'},
  {title:'CIE · Universidad ORT',region:'Montevideo',kind:'Incubación y financiamiento',description:'Centro de Innovación y Emprendimientos. Consultá programas de acompañamiento y requisitos.',href:'https://cie.ort.edu.uy/'},
  {title:'Ithaka · Universidad Católica',region:'Montevideo',kind:'Incubación y financiamiento',description:'Centro de innovación y emprendimientos. Consultá mentorías, programas y convocatorias.',href:'https://anii.org.uy/emprendimientos/incubadoras-anii/172/centro-ithaka/'},
  {title:'UTEC · Programa de Emprendimientos',region:'Interior del país',kind:'Orientación',description:'Acompañamiento para desarrollar proyectos y conectarte con el ecosistema emprendedor en el interior.',href:'https://utec.edu.uy/es/innovacion/programa-de-emprendimientos/'},
]
