'use client'

import { useState } from 'react'

const interests = [
  { id: 'all',        label: 'Todo Uruguay' },
  { id: 'playa',      label: 'Playa' },
  { id: 'historia',   label: 'Historia & Cultura' },
  { id: 'naturaleza', label: 'Naturaleza' },
  { id: 'gastronomia',label: 'Gastronomía' },
  { id: 'relax',      label: 'Relax & Termas' },
]

const durations = ['Todos', '1 día', 'Fin de semana', '4–7 días']

const routes = [
  {
    interest: 'historia', interestLabel: 'Historia', interestBg: 'var(--blue-pale)', interestColor: 'var(--blue)',
    title: 'Colonia del Sacramento', meta: ['2h 45min en auto', '1 día o fin de semana', 'Imperdible'],
    teaser: 'Ciudad Patrimonio UNESCO a orillas del Río de la Plata. Calles de piedra, faro y el café más instagrameable del país.',
    stops: ['Barrio Histórico', 'Faro', 'Calle de los Suspiros', 'Puerto'],
    duration: '1 día',
  },
  {
    interest: 'playa', interestLabel: 'Playa', interestBg: 'var(--blue-pale)', interestColor: 'var(--blue)',
    title: 'Punta del Este & José Ignacio', meta: ['1h 20min en auto', 'Fin de semana', 'Verano'],
    teaser: 'La costa más famosa de Sudamérica. Playas anchas, lobos marinos y la movida nocturna más elegante del Cono Sur.',
    stops: ['La Brava', 'La Mansa', 'José Ignacio', 'Lobos marinos'],
    duration: 'Fin de semana',
  },
  {
    interest: 'naturaleza', interestLabel: 'Naturaleza', interestBg: 'var(--blue-pale)', interestColor: 'var(--blue)',
    title: 'Cabo Polonio', meta: ['4h + jeep', 'Fin de semana', 'Impresionante'],
    teaser: 'Sin luz eléctrica de red, sin wifi. Lobos marinos, dunas y atardeceres que no olvidás. El lado salvaje de Uruguay.',
    stops: ['Dunas', 'Colonia de lobos', 'Faro', 'Playas vírgenes'],
    duration: 'Fin de semana',
  },
  {
    interest: 'relax', interestLabel: 'Relax & Termas', interestBg: 'var(--surface)', interestColor: 'var(--ink-60)',
    title: 'Termas de Salto', meta: ['5h o bus nocturno', 'Fin de semana largo', 'Relax'],
    teaser: 'Las termas más grandes de América del Sur. Aguas termales naturales, complejos familiares y la ciudad más cálida de Uruguay.',
    stops: ['Termas del Daymán', 'Termas de Arapey', 'Ciudad de Salto', 'Río Uruguay'],
    duration: 'Fin de semana',
  },
  {
    interest: 'historia', interestLabel: 'Historia', interestBg: 'var(--blue-pale)', interestColor: 'var(--blue)',
    title: 'Ciudad Vieja & Puerto', meta: ['A pie', '1 día', 'Montevideo'],
    teaser: 'El corazón histórico de Montevideo. Mercado del Puerto, murales, arquitectura art-déco y el mejor chivito de la ciudad.',
    stops: ['Mercado del Puerto', 'Plaza Independencia', 'Teatro Solís', 'Rambla Sur'],
    duration: '1 día',
  },
  {
    interest: 'playa', interestLabel: 'Playa', interestBg: 'var(--blue-pale)', interestColor: 'var(--blue)',
    title: 'Punta del Diablo', meta: ['4h 30min en auto', 'Fin de semana', 'Verano'],
    teaser: 'El pueblo de pescadores que se convirtió en el favorito de los viajeros. Casas de madera, olas bravas y muy buen ambiente.',
    stops: ['Playa de los Pescadores', 'Playa Grande', 'Parque Santa Teresa', 'Laguna Negra'],
    duration: 'Fin de semana',
  },
  {
    interest: 'gastronomia', interestLabel: 'Gastronomía', interestBg: 'rgba(200,148,15,0.10)', interestColor: 'var(--gold)',
    title: 'Carmelo & bodegas', meta: ['3h en auto', 'Fin de semana', 'Enoturismo'],
    teaser: 'La región vitivinícola más cercana a Montevideo. Bodegas boutique, olivares y el mejor asado con maridaje que vas a tener.',
    stops: ['Bodega Narbona', 'Bodega Irurtia', 'Colonia Estrella', 'Río de la Plata'],
    duration: 'Fin de semana',
  },
  {
    interest: 'naturaleza', interestLabel: 'Naturaleza', interestBg: 'var(--blue-pale)', interestColor: 'var(--blue)',
    title: 'Valle del Lunarejo', meta: ['4h en auto', 'Fin de semana', 'Biodiversidad'],
    teaser: 'El secreto mejor guardado de Uruguay. Cañones, cascadas, aves únicas y cero turistas. El Uruguay que no aparece en Instagram.',
    stops: ['Cañón del Lunarejo', 'Pueblo de Rivera', 'Posadas rurales', 'Quebradas'],
    duration: 'Fin de semana',
  },
]

export default function RoutesSection() {
  const [activeInterest, setActiveInterest] = useState('all')
  const [activeDuration, setActiveDuration] = useState('Todos')

  const filtered = routes.filter((r) => {
    const matchInterest = activeInterest === 'all' || r.interest === activeInterest
    const matchDuration = activeDuration === 'Todos' || r.duration === activeDuration
    return matchInterest && matchDuration
  })

  return (
    <>
      <div className="interests-strip">
        <div className="interests-inner">
          {interests.map((i) => (
            <button
              key={i.id}
              className={`int-btn${activeInterest === i.id ? ' active' : ''}`}
              onClick={() => setActiveInterest(i.id)}
            >
              {i.label}
            </button>
          ))}
        </div>
      </div>

      <main className="main-wrap">
        <section className="routes-section">
          <h2>Rutas desde Montevideo</h2>
          <p>Organizadas por tiempo de viaje y tipo de experiencia.</p>

          <div className="duration-tabs">
            {durations.map((d) => (
              <button
                key={d}
                className={`dur-btn${activeDuration === d ? ' active' : ''}`}
                onClick={() => setActiveDuration(d)}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="routes-grid">
            {filtered.map((r) => (
              <div key={r.title} className="route-card">
                <div className="route-card-header">
                  <div className="route-interest" style={{ background: r.interestBg, color: r.interestColor }}>
                    {r.interestLabel}
                  </div>
                  <h3>{r.title}</h3>
                  <div className="route-meta">
                    {r.meta.map((m) => <span key={m}>{m}</span>)}
                  </div>
                </div>
                <div className="route-teaser">{r.teaser}</div>
                <div className="route-stops">
                  {r.stops.map((s) => <span key={s} className="stop-chip">{s}</span>)}
                </div>
                <a href="#" className="route-cta-link">Ver ruta completa →</a>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--ink-60)' }}>
              No hay rutas para esa combinación. Probá otro filtro.
            </div>
          )}
        </section>
      </main>
    </>
  )
}
