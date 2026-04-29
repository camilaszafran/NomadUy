import { getTranslations, getLocale } from 'next-intl/server'
import { localizeHref } from '@/lib/locale'
import Nav from '@/components/layout/Nav'
import PageSubtitle from '@/components/ui/PageSubtitle'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { sanityFetch, placesQuery } from '@/lib/sanity'
import type { Place } from '@/types/place'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'Todos los lugares — Vivir en Uruguay | NomadUY',
  description: 'Explorá todos los lugares donde podés vivir en Uruguay.',
}

export default async function LugaresPage() {
  const [places, t, locale] = await Promise.all([
    sanityFetch<Place[]>(placesQuery),
    getTranslations('vivir'),
    getLocale(),
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
            <Link key={place._id} href={`/vivir?place=${place.slug.current}`} className="lugar-card">
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
                    <span className="lugar-score-dots">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`score-dot${i < place.costOfLiving ? ' on' : ''}`} />
                      ))}
                    </span>
                  </span>
                  <span className="lugar-score-item">
                    <span className="lugar-score-label">{t('score_urbano')}</span>
                    <span className="lugar-score-dots">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`score-dot${i < place.urbanRural ? ' on' : ''}`} />
                      ))}
                    </span>
                  </span>
                  <span className="lugar-score-item">
                    <span className="lugar-score-label">{t('score_tamano')}</span>
                    <span className="lugar-score-dots">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`score-dot${i < place.population ? ' on' : ''}`} />
                      ))}
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
