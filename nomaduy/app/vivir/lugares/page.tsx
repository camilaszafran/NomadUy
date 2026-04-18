import Nav from '@/components/layout/Nav'
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
  const places = await sanityFetch<Place[]>(placesQuery)

  return (
    <>
      <Nav />
      <header className="page-header page-header-blue">
        <div className="page-header-inner">
          <Link href="/vivir" className="lugares-back">
            <ArrowLeft size={14} weight="bold" /> Volver al buscador
          </Link>
          <div className="page-label">Todos los lugares</div>
          <h1>Uruguay, región por región</h1>
          <p>Cada rincón del país tiene su carácter. Explorá todos los lugares para encontrar el tuyo.</p>
        </div>
      </header>

      <main className="main-wrap">
        <div className="lugares-grid">
          {places.map((place) => (
            <div key={place._id} className="lugar-card">
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
                    <span className="lugar-score-label">Costo</span>
                    <span className="lugar-score-dots">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`score-dot${i < place.costOfLiving ? ' on' : ''}`} />
                      ))}
                    </span>
                  </span>
                  <span className="lugar-score-item">
                    <span className="lugar-score-label">Urbano</span>
                    <span className="lugar-score-dots">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`score-dot${i < place.urbanRural ? ' on' : ''}`} />
                      ))}
                    </span>
                  </span>
                  <span className="lugar-score-item">
                    <span className="lugar-score-label">Tamaño</span>
                    <span className="lugar-score-dots">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`score-dot${i < place.population ? ' on' : ''}`} />
                      ))}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
