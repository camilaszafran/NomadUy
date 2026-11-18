import SaveButton from '@/components/planner/Favorites'
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { regionalPlaces, featuredPlaceSlugs } from '@/lib/regional-places'
import { pageSeo } from '@/lib/seo'
import { localizeHref } from '@/lib/locale'
import { linkTarget } from '@/lib/link-target'
import { arrivalLocale } from '@/lib/arrival-links'

const copy = {
  es: ['Vivir y visitar', 'Volver a todos los lugares', 'Ver en el buscador de lugares', 'Las puntuaciones de costo, perfil urbano y tamaño son orientativas, en una escala de 1 a 5.', 'Alojamiento y alquiler', 'Transporte y servicios'],
  en: ['Living in and visiting', 'Back to all places', 'Open in the place finder', 'Cost, urban character and size are editorial ratings on a scale from 1 to 5.', 'Accommodation and rentals', 'Transport and local services'],
  pt: ['Morar e visitar', 'Voltar a todos os lugares', 'Ver no buscador de lugares', 'Custo, perfil urbano e tamanho são avaliações indicativas em uma escala de 1 a 5.', 'Hospedagem e aluguel', 'Transporte e serviços'],
}
type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return featuredPlaceSlugs.map(slug => ({ slug }))
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const place = regionalPlaces(locale).find(item => item.slug.current === slug)
  if (!place) return {}
  return pageSeo('/vivir/lugares/' + slug, locale, place.title + ', Uruguay: ' + copy[arrivalLocale(locale)][0].toLocaleLowerCase(locale), place.tagline + '. ' + place.description)
}
export default async function PlaceDetails({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const place = regionalPlaces(locale).find(item => item.slug.current === slug)
  if (!place) notFound()
  const [topic, back, matcher, scale, rentals, transport] = copy[arrivalLocale(locale)]
  const t = await getTranslations('vivir')
  return <>
    <Nav />
    <header className="page-header page-header-blue"><div className="page-header-inner">
      <div className="page-label">{place.region} · Uruguay</div>
      <h1>{place.title}</h1><p>{place.tagline}</p>
    </div></header>
    <main className="main-wrap arrival-wrap">
      <a href={localizeHref('/vivir/lugares', locale)}>← {back}</a>
      <article className="arrival-card">
        <SaveButton item={{ href: '/vivir/lugares/' + slug, title: place.title, kind: place.region }} />
        <h2>{topic}</h2>
        <p>{place.description}</p>
        <ul>
          <li>{t('score_costo')} <strong>{place.costOfLiving}/5</strong></li>
          <li>{t('score_urbano')} <strong>{place.urbanRural}/5</strong></li>
          <li>{t('score_tamano')} <strong>{place.population}/5</strong></li>
        </ul>
        <p className="arrival-checked">{scale}</p>
        <ul>
          <li><a href={localizeHref('/vivir?place=' + slug, locale)}>{matcher}</a></li>
          <li><a href={localizeHref('/servicios#vivienda', locale)}>{rentals}</a></li>
          <li><a href={localizeHref('/explora#apps-transporte', locale)}>{transport}</a></li>
          {place.links?.map(({ label, url }) => <li key={url}><a href={url} {...linkTarget(url)}>{label} ↗</a></li>)}
        </ul>
      </article>
    </main>
    <Footer />
  </>
}
