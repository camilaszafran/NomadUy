import SaveButton from '@/components/planner/Favorites'
import { pageSeo } from '@/lib/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { localizeHref } from '@/lib/locale'
import Nav from '@/components/layout/Nav'
import PageSubtitle from '@/components/ui/PageSubtitle'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { allPlaces, featuredPlaceSlugs } from '@/lib/regional-places'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'

const searchCopy = {
  "es": [
    "Ciudades y barrios para vivir en Uruguay",
    "Compará lugares para vivir en Uruguay, desde Montevideo hasta las ciudades del interior."
  ],
  "en": [
    "Cities and neighbourhoods to live in Uruguay",
    "Compare places to live in Uruguay, from Montevideo to cities around the country."
  ],
  "pt": [
    "Cidades e bairros para morar no Uruguai",
    "Compare lugares para morar no Uruguai, de Montevidéu às cidades do interior."
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [title, description] = searchCopy[locale === 'en' || locale === 'pt' ? locale : 'es']
  return pageSeo('/vivir/lugares', locale, title, description)
}

export default async function LugaresPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [places, t] = await Promise.all([
    allPlaces(locale),
    getTranslations('vivir'),
  ])

  return (
    <>
      <Nav />
      <header className="page-header page-header-blue">
        <div className="page-header-inner">
          <Link href={localizeHref('/vivir', locale)} className="lugares-back">
            <ArrowLeft size={14} weight="bold" /> {t('lugares_back')}
          </Link>
          <div className="page-label">{t('lugares_label')}</div>
          <h1>{t('lugares_heading')}</h1>
          <PageSubtitle>{t('lugares_subtitle')}</PageSubtitle>
        </div>
      </header>

      <main className="main-wrap">
        <div className="lugares-grid">
          {places.map((place) => (
            <div className="saved-place-card" key={place._id}>
            <Link href={localizeHref(
              featuredPlaceSlugs.some(slug => slug === place.slug.current)
                ? '/vivir/lugares/' + place.slug.current
                : '/vivir?place=' + place.slug.current,
              locale,
            )} className="lugar-card">
              <div
                className="lugar-card-img"
                style={{
                  background: place.photos?.length
                    ? undefined
                    : place.placeholderGradient,
                }}
              >
                {place.photos?.[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={place.photos[0].url} alt={place.title} />
                )}
              </div>
              <div className="lugar-card-body">
                <span className="lugar-region">{place.region}</span>
                <h3 className="lugar-title">{place.title}</h3>
                <p className="lugar-tagline">{place.tagline}</p>
                <div className="lugar-scores">
                  <span className="lugar-score-item">
                    <span className="lugar-score-label">{t('score_costo')}</span>
                    <span className="lugar-score-dots" role="img" aria-label={`${place.costOfLiving}/5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`score-dot${i < place.costOfLiving ? ' on' : ''}`} />
                      ))}
                    </span>
                  </span>
                  <span className="lugar-score-item">
                    <span className="lugar-score-label">{t('score_urbano')}</span>
                    <span className="lugar-score-dots" role="img" aria-label={`${place.urbanRural}/5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`score-dot${i < place.urbanRural ? ' on' : ''}`} />
                      ))}
                    </span>
                  </span>
                  <span className="lugar-score-item">
                    <span className="lugar-score-label">{t('score_tamano')}</span>
                    <span className="lugar-score-dots" role="img" aria-label={`${place.population}/5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`score-dot${i < place.population ? ' on' : ''}`} />
                      ))}
                    </span>
                  </span>
                </div>
              </div>
            </Link>
            <SaveButton item={{ href: featuredPlaceSlugs.some(slug => slug === place.slug.current) ? '/vivir/lugares/' + place.slug.current : '/vivir?place=' + place.slug.current, title: place.title, kind: place.region }} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
