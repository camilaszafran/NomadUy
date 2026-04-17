'use client'

import { useState } from 'react'
import {
  Laptop,
  House,
  FirstAid,
  Wrench,
  ForkKnife,
  Coffee,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

const coworkings = [
  { name: 'Sinergia District', barrio: 'pocitos', price: '$18/día', mbps: 300, rating: 4.7, bars: 5, badge: 'Verificado', tags: ['24/7', 'Salas de reunión', 'Terraza', '20% desc. miembros'] },
  { name: 'Crea Cowork', barrio: 'centro', price: '$12/día', mbps: 200, rating: 4.4, bars: 4, badge: 'Verificado', tags: ['Lun–Vie', 'Café incluido', 'Impresora'] },
  { name: 'Hub Montevideo', barrio: 'ciudad-vieja', price: '$15/día', mbps: 500, rating: 4.8, bars: 5, badge: 'Verificado', tags: ['Startup-friendly', 'Eventos', 'Locker'] },
  { name: 'Espacio Abierto', barrio: 'palermo', price: '$16/día', mbps: 250, rating: 4.5, bars: 4, badge: 'Verificado', tags: ['Artsy', 'Patio', 'Bicicletas'] },
  { name: 'WorkInn', barrio: 'punta-carretas', price: '$20/día', mbps: 400, rating: 4.6, bars: 5, badge: 'Premium', badgePremium: true, tags: ['Salas privadas', 'Recepción', 'AC'] },
  { name: 'La Maquinista', barrio: 'ciudad-vieja', price: '$14/día', mbps: 150, rating: 4.3, bars: 3, badge: 'Verificado', tags: ['Histórico', 'Cafetería', 'Comunidad'] },
]

type Section = {
  id: string
  Icon: Icon
  title: string
  subtitle: string
  countLabel: string
  countClass: string
  comingSoon?: string
  notifyLabel?: string
}

const sections: Section[] = [
  { id: 'coworkings',  Icon: Laptop,    title: 'Coworkings',             subtitle: 'Espacios verificados con WiFi testeado y precios reales',          countLabel: '6 espacios',     countClass: 'green' },
  { id: 'coliving',   Icon: House,     title: 'Coliving & Alojamiento', subtitle: 'Cuartos amoblados, departamentos para nómadas y coliving',          countLabel: 'Próximamente',   countClass: 'soon', comingSoon: 'Estamos verificando y listando los mejores espacios de coliving y alquiler para nómadas en Montevideo y más.' },
  { id: 'medicos',    Icon: FirstAid,  title: 'Médicos recomendados',   subtitle: 'Profesionales que hablan inglés y atienden a extranjeros',           countLabel: 'Próximamente',   countClass: 'soon', comingSoon: 'Médicos generalistas, dentistas y especialistas recomendados por la comunidad NomadUY.' },
  { id: 'servicios',  Icon: Wrench,    title: 'Servicios de confianza', subtitle: 'Contadores, escribanos, traductores y más',                         countLabel: 'Próximamente',   countClass: 'soon', comingSoon: 'Profesionales de confianza para trámites, impuestos y servicios cotidianos.' },
  { id: 'restaurantes',Icon: ForkKnife,title: 'Restaurantes',           subtitle: 'Los favoritos de la comunidad — no los del turista',                countLabel: 'Comunidad',      countClass: 'gold', comingSoon: 'Las recomendaciones vienen de miembros reales de NomadUY — no de guías de viaje.', notifyLabel: 'Sugerir un restaurante' },
  { id: 'cafes',      Icon: Coffee,    title: 'Cafés para trabajar',    subtitle: 'Buen WiFi, enchufes y café decente',                                countLabel: 'Comunidad',      countClass: 'gold', comingSoon: 'Los mejores cafés para trabajar en Montevideo — testeados por nómadas reales.', notifyLabel: 'Sugerir un café' },
]

const barrios = ['all', 'pocitos', 'centro', 'palermo', 'ciudad-vieja', 'punta-carretas']
const barrioLabels: Record<string, string> = { all: 'Todos', pocitos: 'Pocitos', centro: 'Centro', palermo: 'Palermo', 'ciudad-vieja': 'Ciudad Vieja', 'punta-carretas': 'Punta Carretas' }

function WifiBar({ bars }: { bars: number }) {
  return (
    <div className="wifi-bar">
      {[1,2,3,4,5].map((i) => <span key={i} className={i <= bars ? 'on' : ''} />)}
    </div>
  )
}

export default function DirectoryAccordion() {
  const [open, setOpen] = useState<string | null>('coworkings')
  const [activeBarrio, setActiveBarrio] = useState('all')

  const toggle = (id: string) => setOpen(open === id ? null : id)

  return (
    <main className="main-wrap">
      <div className="accordion-list">
        {sections.map((s) => (
          <div key={s.id} className={`accordion-item${open === s.id ? ' open' : ''}`}>
            <button className="accordion-trigger" onClick={() => toggle(s.id)}>
              <div className="acc-icon"><s.Icon size={20} weight="thin" /></div>
              <div className="acc-text">
                <div className="acc-title">{s.title}</div>
                <div className="acc-subtitle">{s.subtitle}</div>
              </div>
              <div className="acc-meta">
                <span className={`acc-count ${s.countClass}`}>{s.countLabel}</span>
              </div>
              <span className="acc-chevron">▾</span>
            </button>
            <div className="accordion-body">
              <div className="accordion-body-inner">
                {s.id === 'coworkings' ? (
                  <>
                    <div className="filter-row">
                      {barrios.map((b) => (
                        <button
                          key={b}
                          className={`filter-pill${activeBarrio === b ? ' active' : ''}`}
                          onClick={() => setActiveBarrio(b)}
                        >
                          {barrioLabels[b]}
                        </button>
                      ))}
                    </div>
                    <div className="cowork-grid">
                      {coworkings
                        .filter((c) => activeBarrio === 'all' || c.barrio === activeBarrio)
                        .map((c) => (
                          <div key={c.name} className="cowork-card">
                            <div className="cowork-header">
                              <div className="cowork-name">{c.name}</div>
                              <span
                                className="cowork-badge"
                                style={c.badgePremium ? { background: 'rgba(200,148,15,0.12)', color: 'var(--gold)' } : undefined}
                              >
                                {c.badge}
                              </span>
                            </div>
                            <div className="cowork-barrio">{barrioLabels[c.barrio]}</div>
                            <div className="cowork-stats">
                              <span className="cowork-stat">{c.price}</span>
                              <span className="cowork-stat"><WifiBar bars={c.bars} /> {c.mbps} Mbps</span>
                              <span className="cowork-stat">{c.rating} / 5</span>
                            </div>
                            <div className="cowork-tags">
                              {c.tags.map((t) => <span key={t} className="cowork-tag">{t}</span>)}
                            </div>
                            <div className="cowork-actions">
                              <button className="cowork-btn primary">Ver ubicación</button>
                              <button className="cowork-btn ghost">Más info</button>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="map-notice">
                      <span>Mapa interactivo — <a href="#">Ver coworkings en mapa →</a></span>
                    </div>
                  </>
                ) : (
                  <div className="coming-placeholder">
                    <p><strong>En proceso.</strong> {s.comingSoon}</p>
                    <button className="notify-btn">{s.notifyLabel || 'Avisarme cuando esté listo'}</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
