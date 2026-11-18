import SaveButton from '@/components/planner/Favorites'
import { setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { arrivalLocale } from '@/lib/arrival-links'
import { localizeHref } from '@/lib/locale'
import { linkTarget } from '@/lib/link-target'
import { pageSeo } from '@/lib/seo'

const groups = [
  [
    "dinero",
    [
      "Sacar efectivo o cambiar moneda",
      "Withdraw cash or exchange money",
      "Sacar dinheiro ou trocar moeda"
    ],
    [
      "La moneda local es el peso uruguayo (UYU). Antes de confirmar una compra o un retiro con tarjeta extranjera, verificá la moneda, la comisión del cajero y los cargos de tu banco. Si te ofrecen convertir a la moneda de tu tarjeta, compará el importe final. En una casa de cambio preguntá cuántos pesos recibirías en total.",
      "The local currency is the Uruguayan peso (UYU). Before confirming a purchase or cash withdrawal with a foreign card, check the currency, ATM fee and any charges from your bank. If offered conversion into your card’s currency, compare the final amount. At a currency exchange, ask how many pesos you will actually receive.",
      "A moeda local é o peso uruguaio (UYU). Antes de confirmar uma compra ou um saque com cartão estrangeiro, confira a moeda e as tarifas do caixa e do seu banco. Se oferecerem conversão para a moeda do cartão, compare o valor final. Na casa de câmbio, pergunte quantos pesos vai receber."
    ],
    [
      [
        "Banred",
        "https://www.banred.com.uy/institu/cajeros"
      ],
      [
        "RedBROU",
        "https://www.brou.com.uy/sucursales-y-servicios"
      ],
      [
        "BCU",
        "https://www.bcu.gub.uy/Servicios-Financieros-SSF/Paginas/Puntos-Atencion-Publico.aspx"
      ],
      [
        "Prex · Midinero",
        "/guias/primeras-48h#fase-2"
      ]
    ]
  ],
  [
    "lavanderias",
    [
      "Lavar ropa",
      "Find a laundry",
      "Encontrar uma lavanderia"
    ],
    [
      "Buscá autoservicio si querés usar las máquinas vos, lavado por encargo si preferís dejar la ropa o retiro y entrega si necesitás que vayan a tu alojamiento. Confirmá si el secado está incluido y el horario del día antes de ir.",
      "Look for self-service if you want to use the machines, drop-off if you want someone to do the washing, or pickup and delivery if you need service at your accommodation. Check whether drying is included and confirm opening hours before leaving.",
      "Procure autosserviço para usar as máquinas, lavagem por encomenda para deixar a roupa no local ou retirada e entrega para atendimento na hospedagem. Confira se a secagem está incluída e confirme o horário antes de sair."
    ],
    [
      [
        "Lavomat · Montevideo",
        "https://linktr.ee/lavomat"
      ],
      [
        "Oasis · Montevideo",
        "https://www.lavanderiaoasis.com.uy/"
      ],
      [
        "Splash · Montevideo / Ciudad de la Costa",
        "https://www.lavaderosplash.com/preguntas-frecuentes"
      ],
      [
        "Los Pinos · Colonia del Sacramento",
        "https://guiacomercial.uy/ficha/lavanderia-los-pinos-coffee-wash-colonia-del-sacramento/"
      ]
    ]
  ],
  [
    "vivienda",
    [
      "Buscar alquiler",
      "Find a rental home",
      "Buscar imóvel para alugar"
    ],
    [
      "Usá la guía de vivienda para distinguir un alojamiento amueblado por mes de un alquiler de largo plazo. Antes de señar, pedí por escrito la garantía aceptada, la comisión, los gastos comunes, el inventario y las condiciones para recuperar la seña. Confirmá quién recibe el pago y visitá el inmueble o pedí una visita por video.",
      "Use the housing guide to distinguish a furnished monthly rental from a long-term lease. Before paying a holding deposit, ask in writing about accepted guarantees, agency fees, building charges, inventory and refund terms. Confirm who receives the payment and visit the property or ask for a video viewing.",
      "Use o guia de moradia para distinguir o aluguel mobiliado mensal do contrato de longo prazo. Antes de pagar um sinal, peça por escrito a garantia aceita, a comissão, o condomínio, o inventário e as regras de devolução. Confirme quem receberá o pagamento e visite o imóvel ou peça uma visita por vídeo."
    ],
    [
      [
        [
          "Guía de alquiler",
          "Rental guide",
          "Guia de aluguel"
        ],
        "/guias/encontrar-apartamento"
      ],
      [
        "InfoCasas",
        "https://www.infocasas.com.uy/alquiler/inmuebles"
      ],
      [
        [
          "Cámaras inmobiliarias regionales",
          "Regional real estate associations",
          "Associações imobiliárias regionais"
        ],
        "https://ciu.org.uy/institucional/camaras-asociadas/"
      ]
    ]
  ],
  [
    "autos",
    [
      "Alquilar un auto",
      "Rent a car",
      "Alugar um carro"
    ],
    [
      "Compará el lugar de retiro y devolución, el precio total, la franquicia y el depósito. Antes de reservar, confirmá si aceptan tu libreta extranjera, qué tarjeta piden, cómo se cobran los peajes y si autorizan cruzar a Argentina o Brasil. Un retiro fuera de oficina o devolver el auto en otra ciudad puede tener condiciones distintas.",
      "Compare pickup and drop-off locations, the total price, insurance excess and deposit. Before booking, check whether your foreign licence is accepted, which card you need, how tolls are charged and whether driving into Argentina or Brazil is allowed. After-hours pickup and one-way rentals may have different terms.",
      "Compare os locais de retirada e devolução, o preço total, a franquia e o caução. Antes de reservar, confira se aceitam sua carteira estrangeira, qual cartão exigem, como cobram pedágios e se autorizam a entrada na Argentina ou no Brasil. Retirar fora do horário ou devolver em outra cidade pode ter condições diferentes."
    ],
    [
      [
        "TripWip",
        "https://tripwip.app/"
      ],
      [
        "Hertz · Montevideo / Colonia / Punta del Este",
        "https://hertz.com.uy/Locales"
      ],
      [
        "VIP · Montevideo / Carrasco / Maldonado",
        "https://vip.com.uy/sucursales"
      ],
      [
        "Montevideo Rent a Car",
        "https://montevideorentacar.com/condiciones"
      ]
    ]
  ],
  [
    "mandados",
    [
      "Farmacias, compras y mandados",
      "Pharmacies, groceries and errands",
      "Farmácias, compras e serviços"
    ],
    [
      "Buscá la farmacia de turno de tu localidad y llamá antes si necesitás atención fuera de horario. Para compras, probá buscar una feria vecinal además del supermercado. Abitab y Redpagos sirven para pagos y otros trámites según el local. Para envíos y retiros, revisá los servicios y horarios de cada sucursal del Correo.",
      "Look for the duty pharmacy in your town and call ahead for after-hours service. For groceries, check neighbourhood markets as well as supermarkets. Abitab and Redpagos handle bill payments and other transactions depending on the branch. Check each post office’s hours and parcel services.",
      "Busque a farmácia de plantão da sua cidade e ligue antes se precisar de atendimento fora de horário. Para compras, procure feiras de bairro além de supermercados. Abitab e Redpagos recebem pagamentos e oferecem outros serviços conforme a unidade. Confira os horários e serviços de encomendas da agência dos Correios."
    ],
    [
      [
        "Abitab",
        "https://www.abitab.com.uy/"
      ],
      [
        "Redpagos",
        "https://www.redpagos.com.uy/"
      ],
      [
        "Correo Uruguayo",
        "https://www.correo.com.uy/locales-de-correo"
      ],
      [
        [
          "Apps para pedir comida",
          "Food delivery apps",
          "Apps de entrega de comida"
        ],
        "/recursos#delivery"
      ]
    ]
  ],
  [
    "hogar",
    [
      "Luz, agua, internet y mudanza",
      "Utilities, internet and moving",
      "Luz, água, internet e mudança"
    ],
    [
      "Preguntá al propietario qué servicios están activos, a nombre de quién y qué tenés que contratar. Para fletes, guardamuebles, sanitaria, electricidad o cerrajería, pedí el presupuesto y qué incluye antes de confirmar. En una estadía corta también podés buscar consigna de equipaje, impresión o reparación de celulares.",
      "Ask the landlord which services are active, whose name they are in and what you need to set up. For movers, storage, plumbing, electrical or locksmith services, request a written quote and what it includes. For shorter stays, look for luggage storage, printing or phone repair.",
      "Pergunte ao proprietário quais serviços estão ativos, em nome de quem e o que você precisa contratar. Para frete, guarda-móveis, encanador, eletricista ou chaveiro, peça um orçamento com o que está incluído. Em estadias curtas, procure guarda-volumes, impressão ou conserto de celular."
    ],
    [
      [
        "UTE",
        "https://www.gub.uy/tramites/cambio-nombre-titular-servicio-ute"
      ],
      [
        "OSE",
        "https://www.ose.com.uy/tramite/solicitud-de-cambio-de-nombre-del-servicio"
      ],
      [
        "Antel",
        "https://antel.com.uy/web/portal/personas/preguntas-frecuentes/internet"
      ]
    ]
  ]
] as const
const copy = [
  [
    "Servicios del día a día en Uruguay",
    "Encontrá cajeros, casas de cambio, lavanderías, inmobiliarias, alquiler de autos y los servicios básicos para instalarte en Uruguay.",
    "Lavanderías cerca tuyo",
    "Buscar en el mapa por ciudad y tipo de servicio. Consultá el horario y el contacto en la ficha del comercio.",
    "Autoservicio",
    "Por encargo",
    "Retiro y entrega",
    "Recomendar un servicio o corregir un dato",
    "Accesos a servicios",
    "Proveedor",
    "Trámite o fuente oficial",
    "Directorio"
  ],
  [
    "Everyday services in Uruguay",
    "Find ATMs, currency exchange, laundries, real estate agents, car rental and the essentials for settling in Uruguay.",
    "Find a laundry near you",
    "Search the map by city and service type. Check opening hours and contact details in the business listing.",
    "Self-service",
    "Drop-off",
    "Pickup and delivery",
    "Recommend a service or suggest a correction",
    "Service shortcuts",
    "Provider",
    "Official service or source",
    "Directory"
  ],
  [
    "Serviços do dia a dia no Uruguai",
    "Encontre caixas eletrônicos, casas de câmbio, lavanderias, imobiliárias, aluguel de carros e serviços para se instalar no Uruguai.",
    "Lavanderias perto de você",
    "Busque no mapa por cidade e tipo de serviço. Confira os horários e o contato na ficha da empresa.",
    "Autosserviço",
    "Por encomenda",
    "Retirada e entrega",
    "Recomendar um serviço ou corrigir uma informação",
    "Atalhos de serviços",
    "Prestador",
    "Serviço ou fonte oficial",
    "Diretório"
  ]
] as const
const cities = ['Montevideo', 'Maldonado / Punta del Este', 'Colonia del Sacramento', 'Salto', 'Rivera']
const laundryQueries = ['lavandería autoservicio', 'lavandería por encargo', 'lavandería retiro y entrega']
const types = [
  ['provider', 'provider', 'official', 'internal'],
  ['provider', 'provider', 'provider', 'directory'],
  ['internal', 'directory', 'directory'],
  ['provider', 'provider', 'provider', 'provider'],
  ['provider', 'provider', 'official', 'internal'],
  ['official', 'official', 'provider'],
]

type Props = { params: Promise<{ locale: string }> }
const language = (locale: string) => ({ es: 0, en: 1, pt: 2 } as const)[arrivalLocale(locale)]

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const [title, intro] = copy[language(locale)]
  return pageSeo('/servicios', locale, title, intro)
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const index = language(locale)
  const [title, intro, laundry, mapNote, self, dropoff, delivery, recommend, shortcuts, provider, official, directory] = copy[index]
  const labels: Record<string, string> = { provider, official, directory }

  return <>
    <Nav />
    <header className="page-header page-header-blue">
      <div className="page-header-inner"><h1>{title}</h1><p>{intro}</p></div>
    </header>
    <main className="main-wrap arrival-wrap services-page">
      <nav className="services-shortcuts" aria-label={shortcuts}>
        {groups.map(([id, heading]) => <a key={id} href={'#' + id}>{heading[index]} <span aria-hidden="true">↓</span></a>)}
      </nav>
      {groups.map(([id, heading, description, links], groupIndex) => (
        <section className="arrival-card" id={id} key={id}>
          <h2>{heading[index]}</h2><p>{description[index]}</p>
          <ul>{links.map(([name, destination], linkIndex) => {
            const href = destination.startsWith('/') ? localizeHref(destination, locale) : destination
            const label = labels[types[groupIndex][linkIndex]]
            return <li key={href}>
              <a href={href} {...linkTarget(href)}>{typeof name === 'string' ? name : name[index]}</a>
              {label && <small className="services-source">{label}</small>}
              <SaveButton item={{ href: destination, title: typeof name === 'string' ? name : name[index], kind: heading[index] }} />
            </li>
          })}</ul>
          {id === 'lavanderias' && <>
            <h3>{laundry}</h3><p>{mapNote}</p>
            <div className="services-cities">
              {cities.map(city => <details key={city}>
                <summary>{city}</summary>
                <ul>{[self, dropoff, delivery].map((label, i) => {
                  const href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(laundryQueries[i] + ' ' + city + ' Uruguay')
                  return <li key={label}><a href={href} {...linkTarget(href)}>{label} ↗</a></li>
                })}</ul>
              </details>)}
            </div>
          </>}
        </section>
      ))}
      <p><a href={localizeHref('/comunidad#recomendar', locale)}>{recommend} →</a></p>
    </main>
    <Footer />
  </>
}
