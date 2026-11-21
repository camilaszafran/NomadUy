import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { pageSeo, siteOrigin, siteUrl } from '@/lib/seo'
import extras from '@/lib/intent-extras'
import { editorialReviewed, nomadIdentity } from '@/lib/nomad-identity'
import { localizeHref } from '@/lib/locale'
import { arrivalLocale } from '@/lib/arrival-links'

const guides = {
  "viajar": [
    [
      "Viajar a Uruguay: requisitos, qué hacer y cómo moverse",
      "Travel to Uruguay: entry requirements, things to do and transport",
      "Viajar ao Uruguai: requisitos, passeios e transporte"
    ],
    [
      "Qué revisar antes de viajar a Uruguay y cómo organizar alojamiento, dinero, conexión y paseos al llegar.",
      "Plan your trip to Uruguay with entry requirements, accommodation, money, mobile data and places to visit.",
      "Planeje sua viagem ao Uruguai com informações sobre entrada, hospedagem, dinheiro, internet e passeios."
    ],
    [
      [
        [
          "¿Necesito visa para viajar a Uruguay?",
          "Do I need a visa to travel to Uruguay?",
          "Preciso de visto para viajar ao Uruguai?"
        ],
        [
          "Depende del país emisor y el tipo de pasaporte. Consultá a Migración antes de reservar y confirmá con un consulado uruguayo si tu caso requiere un trámite previo.",
          "It depends on your passport type and issuing country. Check Uruguay’s immigration authority before booking and confirm any advance application with a Uruguayan consulate.",
          "Depende do país emissor e do tipo de passaporte. Consulte a autoridade migratória antes de reservar e confirme com um consulado uruguaio se precisa de um pedido prévio."
        ],
        "/guias/legal-visas"
      ],
      [
        [
          "¿Qué hacer en Uruguay sin auto?",
          "What can I do in Uruguay without a car?",
          "O que fazer no Uruguai sem carro?"
        ],
        [
          "Empezá por Montevideo y Colonia o buscá conexiones hacia la costa y el interior. Para una escapada, comprobá el servicio de vuelta antes de salir y si el destino exige un traslado desde la terminal.",
          "Start with Montevideo and Colonia, or look for services to the coast and inland towns. For a day trip, check the return service and whether you need a ride from the terminal.",
          "Comece por Montevidéu e Colônia ou procure conexões para o litoral e o interior. Para um bate-volta, confira a volta e o transporte da rodoviária até o destino."
        ],
        "/conocer-uruguay#sin-auto"
      ],
      [
        [
          "¿Conviene llevar efectivo y cómo consigo internet?",
          "Should I carry cash and how do I get online?",
          "Vale levar dinheiro em espécie e como consigo internet?"
        ],
        [
          "Antes de cambiar o retirar pesos, revisá la cotización y los cargos. Si necesitás datos al aterrizar, compará chip prepago y eSIM, cobertura y compatibilidad de tu equipo.",
          "Before exchanging or withdrawing pesos, check exchange rates and fees. If you need data when you land, compare prepaid SIMs and eSIMs, coverage and device compatibility.",
          "Antes de trocar ou sacar pesos, confira a cotação e as tarifas. Se precisar de internet ao chegar, compare chip pré-pago e eSIM, cobertura e compatibilidade."
        ],
        "/guias/primeras-48h"
      ],
      [
        [
          "¿Dónde alojarme y qué lugares visitar?",
          "Where should I stay and what places can I visit?",
          "Onde ficar e quais lugares visitar?"
        ],
        [
          "Compará una base urbana, un balneario o una ciudad del interior según cómo quieras moverte. Las fichas incluyen costa atlántica, sierras, termas, patrimonio y ciudades de frontera.",
          "Compare a city base, a beach town or an inland destination based on how you want to travel. The directory covers Atlantic beaches, hills, hot springs, heritage and border towns.",
          "Compare uma base urbana, um balneário ou uma cidade do interior conforme seu transporte. O diretório inclui praias atlânticas, serras, termas, patrimônio e cidades de fronteira."
        ],
        "/vivir/lugares"
      ]
    ]
  ],
  "estadia-temporal": [
    [
      "Vivir unos meses en Uruguay: nómadas digitales y estadías temporales",
      "Living in Uruguay short-term: expats and digital nomads",
      "Morar alguns meses no Uruguai: expatriados e nômades digitais"
    ],
    [
      "Cómo planear una estadía de unos meses en Uruguay con trabajo remoto, alquiler mensual, internet y transporte.",
      "Plan a few months in Uruguay with remote work, monthly rentals, internet and transport.",
      "Planeje alguns meses no Uruguai com trabalho remoto, aluguel mensal, internet e transporte."
    ],
    [
      [
        [
          "¿Hay una visa para nómadas digitales en Uruguay?",
          "Does Uruguay have a digital nomad visa?",
          "O Uruguai tem visto para nômades digitais?"
        ],
        [
          "El trámite oficial para quienes cumplen las condiciones se llama Hoja de Identidad Provisoria. Revisá los requisitos de ingreso y de solicitud para tu caso. La residencia fiscal tiene sus propios criterios.",
          "The official procedure for eligible remote workers is called Hoja de Identidad Provisoria. Check the entry and application requirements for your case. Tax residency has separate criteria.",
          "O procedimento oficial para quem atende aos requisitos se chama Hoja de Identidad Provisoria. Confira as condições de entrada e de solicitação para seu caso. A residência fiscal segue critérios próprios."
        ],
        "/guias/legal-visas"
      ],
      [
        [
          "¿Cómo consigo un apartamento amueblado por mes?",
          "How do I find a furnished monthly rental?",
          "Como encontro um apartamento mobiliado por mês?"
        ],
        [
          "Pedí por escrito el costo total con gastos y servicios, las condiciones de salida y la disponibilidad en temporada alta. Si trabajás desde el alojamiento, pedí probar la conexión antes de comprometerte.",
          "Ask for the full price including bills and fees, the cancellation terms and high-season availability in writing. If you will work from the property, ask to test the internet before committing.",
          "Peça por escrito o valor total com taxas e contas, as condições de cancelamento e a disponibilidade na alta temporada. Se trabalhar no imóvel, peça para testar a internet antes de fechar."
        ],
        "/servicios#vivienda"
      ],
      [
        [
          "¿Dónde trabajar y cuánto cuesta vivir en Uruguay?",
          "Where can I work remotely and what does it cost to live in Uruguay?",
          "Onde trabalhar remotamente e quanto custa morar no Uruguai?"
        ],
        [
          "Compará el costo de alojamiento, transporte y comidas según tu ciudad. En Recursos también podés buscar coworks y comprobar si ofrecen pases por día, salas para llamadas o atención en tu idioma.",
          "Compare accommodation, transport and food costs for your city. In Resources you can also look for coworking spaces and check day passes, call rooms and language support.",
          "Compare os custos de moradia, transporte e alimentação na sua cidade. Em Recursos, procure coworkings e confirme diárias, salas para chamadas e atendimento no seu idioma."
        ],
        "/recursos"
      ],
      [
        [
          "¿Cómo conozco gente si llego solo?",
          "How can I meet people if I arrive alone?",
          "Como conhecer pessoas se eu chegar sozinho?"
        ],
        [
          "Probá encuentros, intercambio de idiomas, talleres o actividades al aire libre. Mirá la fecha, el punto de encuentro y si necesitás inscribirte.",
          "Try meetups, language exchanges, workshops or outdoor activities. Check the date, meeting point and whether you need to register.",
          "Experimente encontros, intercâmbios de idiomas, oficinas ou atividades ao ar livre. Confira a data, o ponto de encontro e se é preciso se inscrever."
        ],
        "/comunidad#conocer-gente"
      ]
    ]
  ],
  "mudarse": [
    [
      "Mudarse a Uruguay: residencia, vivienda y primeros trámites",
      "Moving to Uruguay: residency, housing and first steps",
      "Mudar para o Uruguai: residência, moradia e primeiros passos"
    ],
    [
      "Prepará tu mudanza a Uruguay con una guía de residencia, cédula, alquiler, salud y educación para extranjeros.",
      "Prepare your move to Uruguay with a guide to residency, ID, housing, healthcare and education for foreigners.",
      "Prepare sua mudança para o Uruguai com um guia de residência, carteira de identidade, aluguel, saúde e educação para estrangeiros."
    ],
    [
      [
        [
          "¿Cómo sacar la residencia uruguaya y la cédula?",
          "How do I get Uruguayan residency and an ID card?",
          "Como obter residência no Uruguai e carteira de identidade?"
        ],
        [
          "Migración distingue residencia temporaria y permanente, con categorías según nacionalidad y situación. Consultá cuáles son tus requisitos, cuándo podés gestionar la cédula y qué documentos necesitan apostilla, legalización o traducción.",
          "Uruguay offers temporary and permanent residence categories based on nationality and circumstances. Check the applicable requirements, when you can apply for an ID card and whether documents need apostilles, legalisation or translation.",
          "O Uruguai tem categorias de residência temporária e permanente conforme a nacionalidade e a situação. Confira os requisitos, quando solicitar a carteira de identidade e quais documentos exigem apostila, legalização ou tradução."
        ],
        "/guias/legal-visas"
      ],
      [
        [
          "¿Dónde vivir y qué garantía me piden para alquilar?",
          "Where should I live and what rental guarantee will I need?",
          "Onde morar e qual garantia é exigida para alugar?"
        ],
        [
          "Antes de señar, compará barrios o ciudades por transporte y servicios. Confirmá qué garantía acepta la propiedad y cuánto pagarías de comisión y gastos comunes.",
          "Before paying a holding deposit, compare neighbourhoods or cities by transport and services. Confirm which guarantee the landlord accepts and what agency and building fees apply.",
          "Antes de pagar um sinal, compare cidades ou bairros pelo transporte e serviços. Confirme qual garantia o proprietário aceita e quanto vai pagar de comissão e condomínio."
        ],
        "/servicios#vivienda"
      ],
      [
        [
          "¿Cómo organizo salud, escuela y servicios al llegar?",
          "How do I arrange healthcare, schools and utilities after arrival?",
          "Como organizar saúde, escola e serviços ao chegar?"
        ],
        [
          "Revisá la afiliación a ASSE o a otro prestador según tu situación, los requisitos de inscripción educativa y quién se ocupa de la luz, el agua e internet en el alquiler.",
          "Check enrolment with ASSE or another provider, school registration requirements and who sets up electricity, water and internet at your rental.",
          "Confira a inscrição na ASSE ou em outro prestador, os requisitos de matrícula escolar e quem ativa luz, água e internet no imóvel."
        ],
        "/llegada"
      ],
      [
        [
          "¿Dónde consigo ayuda si tengo problemas con mis documentos?",
          "Where can I get help with paperwork or a lost passport?",
          "Onde consigo ajuda com documentos ou passaporte perdido?"
        ],
        [
          "El MIDES ofrece orientación para migrantes. Si perdiste el pasaporte, buscá el consulado que atiende Uruguay y consultá cómo solicitar un documento de emergencia.",
          "MIDES offers guidance for migrants. If you lost your passport, find the consular office responsible for Uruguay and ask how to request an emergency travel document.",
          "O MIDES oferece orientação a migrantes. Se perdeu o passaporte, procure o consulado responsável pelo Uruguai e pergunte como solicitar um documento de emergência."
        ],
        "/ayuda"
      ]
    ]
  ]
} as const
const slugs = Object.keys(guides) as (keyof typeof guides)[]
function getGuide(slug: string) {
  const key = slugs.find(item => item === slug)
  return key ? guides[key] : undefined
}
const language = (locale: string) => ({ es: 0, en: 1, pt: 2 } as const)[arrivalLocale(locale)]
const more = ['Ver guía y enlaces', 'See the guide and links', 'Ver guia e links']
type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return slugs.map(slug => ({ slug }))
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  const [titles, intros] = guide
  const i = language(locale)
  return pageSeo('/uruguay/' + slug, locale, titles[i], intros[i])
}
export default async function UruguayGuide({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const guide = getGuide(slug)
  if (!guide) notFound()
  const [titles, intros, originalSections] = guide
  const sections = [...originalSections, ...extras[slug as keyof typeof extras]]
  const loc = arrivalLocale(locale)
  const labels = { es: ['En esta guía', 'Última revisión editorial', 'Fuentes oficiales y próximos pasos', 'Elegí otra guía', 'Sobre NomadUY'], en: ['In this guide', 'Last editorial review', 'Official sources and next steps', 'Choose another guide', 'About NomadUY'], pt: ['Neste guia', 'Última revisão editorial', 'Fontes oficiais e próximos passos', 'Escolha outro guia', 'Sobre o NomadUY'] }[loc]
  const i = language(locale)
  const canonical = siteUrl('/uruguay/' + slug, locale)
  const data = {
    '@context': 'https://schema.org', '@graph': [{
      '@type': 'WebPage', '@id': canonical + '#page', url: canonical, name: titles[i], description: intros[i],
      inLanguage: locale, isAccessibleForFree: true, dateModified: editorialReviewed,
      author: { '@type': 'Organization', name: nomadIdentity[loc].team },
      publisher: { '@id': siteOrigin + '/#organization' },
      isPartOf: { '@id': siteOrigin + '/#website' },
    }, {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'NomadUY', item: siteUrl('/', locale) },
        { '@type': 'ListItem', position: 2, name: titles[i], item: canonical },
      ],
    }, {
      '@type': 'FAQPage', '@id': canonical + '#questions', inLanguage: locale,
      mainEntity: sections.map(([q, a]) => ({ '@type': 'Question', name: q[i], acceptedAnswer: { '@type': 'Answer', text: a[i] } })),
    }],
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
    <Nav />
    <header className="page-header page-header-blue"><div className="page-header-inner">
      <h1>{titles[i]}</h1><p>{intros[i]}</p>
    </div></header>
    <main className="main-wrap arrival-wrap">
      <section className="arrival-card intent-summary">
        <p>{nomadIdentity[loc].description}</p>
        <p className="arrival-checked">{nomadIdentity[loc].team} · {labels[1]}: <time dateTime={editorialReviewed}>{new Intl.DateTimeFormat({ es: 'es-UY', en: 'en-GB', pt: 'pt-BR' }[loc], { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(editorialReviewed + 'T12:00:00Z'))}</time> · <a href={localizeHref('/sobre-nomad', locale)} target="_blank" rel="noopener noreferrer">{labels[4]}</a></p>
        <nav aria-label={labels[0]} className="intent-contents"><h2>{labels[0]}</h2><ol>{sections.map(([q], index) => <li key={q[i]}><a href={'#pregunta-' + (index + 1)}>{q[i]}</a></li>)}</ol></nav>
      </section>
      {sections.map(([question, answer, href], index) => <section className="arrival-card intent-question" id={'pregunta-' + (index + 1)} key={question[i]}>
        <h2>{question[i]}</h2><p>{answer[i]}</p>
        <a href={localizeHref(href, locale)} target="_blank" rel="noopener noreferrer">{more[i]} →</a>
      </section>)}
      <section className="arrival-card"><h2>{labels[2]}</h2><ul>{[
        ['https://uruguaynatural.com/es/datos/requisitos-de-ingreso-y-tramites/', ['Ministerio de Turismo: ingreso a Uruguay', 'Tourism Ministry: entry requirements', 'Ministério do Turismo: entrada no Uruguai']],
        ['https://www.gub.uy/tramites/hoja-identidad-provisoria', ['Migración: Hoja de Identidad Provisoria', 'Immigration: provisional identity document', 'Imigração: documento de identidade provisória']],
        ['https://www.gub.uy/tramites/residencia-legal-permanente', ['Migración: residencia legal permanente', 'Immigration: permanent residence', 'Imigração: residência permanente']],
      ].filter((_, index) => slug === 'viajar' ? index === 0 : slug === 'estadia-temporal' ? index === 1 : index === 2).map(([href, title]) => <li key={href as string}><a href={href as string} target="_blank" rel="noopener noreferrer">{title[i]}</a></li>)}</ul></section>
      <section className="arrival-card"><h2>{labels[3]}</h2><div className="services-shortcuts">{slugs.filter(item => item !== slug).map(item => <a key={item} href={localizeHref('/uruguay/' + item, locale)} target="_blank" rel="noopener noreferrer">{guides[item][0][i]} →</a>)}</div></section>
    </main>
    <Footer />
  </>
}
