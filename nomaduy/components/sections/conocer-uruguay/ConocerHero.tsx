import PageSubtitle from '@/components/ui/PageSubtitle'

export default function ConocerHero() {
  return (
    <div className="conocer-hero">
      <div className="conocer-hero-inner">
        <div>
          <div className="page-label" style={{ color: 'var(--gold-light)', background: 'rgba(245,200,66,0.15)', display: 'inline-block', padding: '4px 14px', borderRadius: '4px', marginBottom: '20px' }}>
            Conocer Uruguay
          </div>
          <h1>Uruguay en rutas.<br />No en itinerarios de turista.</h1>
          <PageSubtitle>Rutas diseñadas por gente que vive acá — para fines de semana, vacaciones cortas y salidas desde Montevideo.</PageSubtitle>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">8</div>
            <div className="hero-stat-label">rutas disponibles</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">14</div>
            <div className="hero-stat-label">destinos cubiertos</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">3h</div>
            <div className="hero-stat-label">máx. desde Montevideo</div>
          </div>
        </div>
      </div>
    </div>
  )
}
