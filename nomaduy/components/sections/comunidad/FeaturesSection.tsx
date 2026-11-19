import { getLocale } from 'next-intl/server'

const copy = {
  es: ['Encontrá tu próximo plan', 'Elegí qué te interesa y andá directo a esa sección.', 'Encuentros y actividades', 'Cursos e idiomas', 'Espectáculos y entradas', 'Recomendaciones de la comunidad'],
  en: ['Find your next activity', 'Choose an interest and go straight to that section.', 'Meetups and activities', 'Classes and languages', 'Shows and tickets', 'Community recommendations'],
  pt: ['Encontre seu próximo programa', 'Escolha o que interessa e vá direto à seção.', 'Encontros e atividades', 'Cursos e idiomas', 'Espetáculos e ingressos', 'Recomendações da comunidade'],
}
const sections = ['conocer-gente', 'cursos-y-talleres', 'espectaculos', 'recomendado']

export default async function FeaturesSection() {
  const locale = await getLocale()
  const t = copy[locale === 'en' || locale === 'pt' ? locale : 'es']
  return <section className="main-wrap community-overview" aria-labelledby="community-overview-title">
    <h2 id="community-overview-title">{t[0]}</h2>
    <p>{t[1]}</p>
    <div className="services-shortcuts">
      {sections.map((id, i) => <a key={id} href={'#' + id}>{t[i + 2]} ↓</a>)}
    </div>
  </section>
}
