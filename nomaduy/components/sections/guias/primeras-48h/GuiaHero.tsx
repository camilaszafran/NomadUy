import Link from 'next/link'

export default function GuiaHero() {
  return (
    <div className="guia-page-hero">
      <div className="guia-hero-inner">
        <div>
          <div className="guia-breadcrumb">
            <Link href="/guias" style={{ color: 'inherit', textDecoration: 'none' }}>Guías</Link>
            <span>›</span> Primeras 48 horas
          </div>
          <h1>Tus primeras 48 horas<br />en Uruguay.</h1>
          <p>Llegaste. Respirá. Este checklist cubre todo lo que necesitás hacer — en orden de prioridad, con los links y números útiles.</p>
          <div className="hero-tags">
            <span className="hero-tag">Aeropuerto Carrasco</span>
            <span className="hero-tag">18 pasos</span>
            <span className="hero-tag">~2 horas para lo esencial</span>
          </div>
        </div>
        <div className="hero-checklist-card">
          <div className="checklist-stat">
            <strong>18</strong>
            <span>cosas que hacer al llegar</span>
          </div>
          <div className="mini-checklist">
            {[
              { done: true,  label: 'SIM card en el aeropuerto' },
              { done: true,  label: 'Cambio de moneda' },
              { done: false, label: 'Llegar al alojamiento',          num: '3' },
              { done: false, label: 'Abrir billetera digital (Prex)', num: '4' },
              { done: false, label: 'Unirte a la comunidad NomadUY', num: '5' },
            ].map((item) => (
              <div key={item.label} className="mini-check-item">
                <div className={`mini-check-dot${item.done ? ' done' : ''}`}>
                  {item.done ? '✓' : item.num}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
