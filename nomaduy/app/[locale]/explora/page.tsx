import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Suitcase, Compass, UsersThree, Palette, Briefcase, MusicNotes, CaretDown, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import OpenLinkedSection from '@/components/sections/arrival/OpenLinkedSection'
import { localizeHref } from '@/lib/locale'
import { linkTarget } from '@/lib/link-target'
import { tourism, transport } from '@/lib/discover'

const categories = [
  { id: 'llegada', icon: Suitcase, links: ['/guias/primeras-48h#fase-1', '/guias/primeras-48h#fase-2', '/vivir#alojamiento', '/recursos#delivery', '/recursos#costo-de-vida', '/recursos#tramites-y-guias', '/recursos#live-in-uruguay'] },
  { id: 'paseos', icon: Compass, links: ['/conocer-uruguay#cafes', '/conocer-uruguay#sin-auto', '/conocer-uruguay', '/conocer-uruguay#un-sabado'] },
  { id: 'gente', icon: UsersThree, links: ['/comunidad#conocer-gente', '/comunidad#cursos-y-talleres', '/comunidad#recomendado'] },
  { id: 'cursos', icon: Palette, links: ['/comunidad#cursos-y-talleres', '/comunidad#recomendar'] },
  { id: 'trabajo', icon: Briefcase, links: ['/recursos#coworks', '/recursos#emprender'] },
  { id: 'cultura', icon: MusicNotes, links: ['/comunidad#espectaculos', '/conocer-uruguay#agenda-interior', '/guias/cultura-uruguay', '/recursos#creadores'] },
]

const messages = {
  es: {
    title: 'Explorá Uruguay',
    arrival: 'Guía de llegada por etapas',
    transport: 'Transporte y alquiler de autos',
    tourism: 'Turismo y guías oficiales',
    intro: 'Encontrá lo que necesitás para instalarte, hacer planes y conocer gente.',
    categories: [
      ['Recién llegué', 'Chip, tarjetas, alojamiento y transporte.', ['Chip y eSIM', 'Prex y Midinero', 'Buscar alojamiento', 'Pedir comida', 'Calculadora de costo de vida', 'Trámites y guías', 'Live in Uruguay']],
      ['Paseos y escapadas', 'Cafés, rutas y formas de llegar sin auto.', ['Cafés de Uruguay', 'Escapadas sin auto', 'Rutas para recorrer Uruguay', 'Un sábado en Montevideo']],
      ['Conocer gente', 'Cenas, asados, deporte y actividades en grupo.', ['Encuentros y actividades', 'Idiomas y talleres', 'Recomendado por la comunidad']],
      ['Cursos y talleres', 'Idiomas, cerámica, música, pintura y cocina.', ['Buscar clases y talleres por departamento', 'Recomendar un taller']],
      ['Trabajar y emprender', 'Coworks, incubadoras y apoyo para empezar.', ['Buscar un cowork', 'Apoyo para emprender']],
      ['Cultura y agenda', 'Espectáculos, costumbres y creadores locales.', ['Entradas y espectáculos', 'Agenda del interior', 'Mate, fútbol e historia', 'Uruguay en Instagram y TikTok']],
    ],
  },
  en: {
    title: 'Explore Uruguay',
    arrival: 'Step-by-step arrival guide',
    transport: 'Transport and car rentals',
    tourism: 'Tourism and official guides',
    intro: 'Find what you need to settle in, make plans and meet people.',
    categories: [
      ['Just arrived', 'SIM cards, prepaid cards, accommodation and transport.', ['SIM cards and eSIM', 'Prex and Midinero', 'Find accommodation', 'Order food', 'Cost of living calculator', 'Paperwork and guides', 'Live in Uruguay']],
      ['Trips and getaways', 'Cafés, itineraries and ways to travel without a car.', ['Cafés in Uruguay', 'Getaways without a car', 'Itineraries around Uruguay', 'A Saturday in Montevideo']],
      ['Meet people', 'Dinners, asados, sports and group activities.', ['Meetups and activities', 'Languages and workshops', 'Community recommendations']],
      ['Classes and workshops', 'Languages, ceramics, music, painting and cooking.', ['Find classes and workshops by department', 'Recommend a workshop']],
      ['Work and start a business', 'Coworking spaces, incubators and startup support.', ['Find a coworking space', 'Support for entrepreneurs']],
      ['Culture and events', 'Shows, traditions and local creators.', ['Tickets and shows', 'Events outside Montevideo', 'Mate, football and history', 'Uruguay on Instagram and TikTok']],
    ],
  },
  pt: {
    title: 'Explore o Uruguai',
    arrival: 'Guia de chegada por etapas',
    transport: 'Transporte e aluguel de carros',
    tourism: 'Turismo e guias oficiais',
    intro: 'Encontre o que precisa para se instalar, fazer planos e conhecer pessoas.',
    categories: [
      ['Acabei de chegar', 'Chip, cartões, hospedagem e transporte.', ['Chip e eSIM', 'Prex e Midinero', 'Buscar hospedagem', 'Pedir comida', 'Calculadora do custo de vida', 'Documentos e guias', 'Live in Uruguay']],
      ['Passeios e viagens', 'Cafés, roteiros e formas de viajar sem carro.', ['Cafés no Uruguai', 'Passeios sem carro', 'Roteiros pelo Uruguai', 'Um sábado em Montevidéu']],
      ['Conhecer pessoas', 'Jantares, churrascos, esportes e atividades em grupo.', ['Encontros e atividades', 'Idiomas e oficinas', 'Recomendações da comunidade']],
      ['Cursos e oficinas', 'Idiomas, cerâmica, música, pintura e culinária.', ['Buscar aulas e oficinas por departamento', 'Recomendar uma oficina']],
      ['Trabalhar e empreender', 'Coworkings, incubadoras e apoio para começar.', ['Buscar um coworking', 'Apoio para empreender']],
      ['Cultura e agenda', 'Espetáculos, costumes e criadores locais.', ['Ingressos e espetáculos', 'Agenda do interior', 'Mate, futebol e história', 'Uruguai no Instagram e TikTok']],
    ],
  },
} as const

type Props = { params: Promise<{ locale: string }> }

function getCopy(locale: string) {
  return messages[locale === 'en' || locale === 'pt' ? locale : 'es']
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const copy = getCopy((await params).locale)
  return { title: copy.title + ' — NomadUY', description: copy.intro }
}

export default async function ExplorePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const copy = getCopy(locale)
  return (
    <>
      <Nav />
      <header className="page-header page-header-blue">
        <div className="page-header-inner">
          <h1>{copy.title}</h1>
          <p className="explore-intro">{copy.intro}</p>
        </div>
      </header>
      <main className="main-wrap explore-index">
        <OpenLinkedSection />
        {categories.map(({ id, icon: Icon, links }, index) => {
          const [title, description, labels] = copy.categories[index]
          return (
            <details className="explore-entry" key={id} id={id}>
              <summary>
                <span className="explore-icon"><Icon size={23} aria-hidden="true" /></span>
                <span><strong>{title}</strong><span className="explore-description">{description}</span></span>
                <CaretDown size={18} className="explore-caret" aria-hidden="true" />
              </summary>
              <ul>
                {id === 'llegada' && <li><a href={localizeHref('/llegada', locale)}>{copy.arrival} <ArrowRight size={16} aria-hidden="true" /></a></li>}
                {links.map((href, i) => (
                  <li key={href}><a href={localizeHref(href, locale)}>{labels[i]} <ArrowRight size={16} aria-hidden="true" /></a></li>
                ))}
              </ul>
              {id === 'llegada' && (
                <section className="explore-extra" id="apps-transporte">
                  <h2>{copy.transport}</h2>
                  <ul lang="es-UY">
                    {transport.map(item => (
                      <li key={item.title}>
                        <a href={item.href} {...linkTarget(item.href)}>{item.title} <span aria-hidden="true">↗</span></a>
                        <p>{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {id === 'paseos' && (
                <section className="explore-extra">
                  <h2>{copy.tourism}</h2>
                  <ul>
                    {[
                      ['Turismo Rural y Natural', 'https://turismoruralynatural.uy/'],
                      ...tourism,
                      ['Descubrí Montevideo', 'https://www.descubrimontevideo.uy/'],
                    ].map(([title, href]) => (
                      <li key={href}><a href={href} {...linkTarget(href)}>{title} <span aria-hidden="true">↗</span></a></li>
                    ))}
                  </ul>
                </section>
              )}
            </details>
          )
        })}
      </main>
      <Footer />
    </>
  )
}
