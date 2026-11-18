import { serviceGroups as groups } from '@/lib/services'
import SaveButton from '@/components/planner/Favorites'
import { setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { arrivalLocale } from '@/lib/arrival-links'
import { localizeHref } from '@/lib/locale'
import { linkTarget } from '@/lib/link-target'
import { pageSeo } from '@/lib/seo'


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
