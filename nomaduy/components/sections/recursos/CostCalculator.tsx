'use client'

import { useState } from 'react'
import {
  ClipboardText,
  Bank,
  House,
  CurrencyDollar,
  Globe,
  MapTrifold,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

const UYU_TO_USD = 38.5

type Preset = { label: string; sub: string; values: Record<string, number> }
const presets: Preset[] = [
  { label: 'Mochilero', sub: 'Presupuesto mínimo', values: { alquiler: 350, comida: 200, transporte: 40, ocio: 60, salud: 50, varios: 100 } },
  { label: 'Cómodo', sub: 'Estilo de vida tranquilo', values: { alquiler: 700, comida: 400, transporte: 80, ocio: 150, salud: 100, varios: 200 } },
  { label: 'Premium', sub: 'Sin restricciones', values: { alquiler: 1400, comida: 700, transporte: 150, ocio: 300, salud: 150, varios: 400 } },
]

const sliders = [
  { key: 'alquiler', label: 'Alquiler', hint: '(1 dormitorio, amoblado)', min: 200, max: 2500, step: 50 },
  { key: 'comida', label: 'Comida', hint: '(super + restaurantes)', min: 100, max: 1200, step: 25 },
  { key: 'transporte', label: 'Transporte', hint: '(STM + Uber)', min: 20, max: 300, step: 10 },
  { key: 'ocio', label: 'Ocio & salidas', hint: '(bares, cultura, gym)', min: 0, max: 600, step: 25 },
  { key: 'salud', label: 'Salud', hint: '(mutualista o seguro)', min: 0, max: 300, step: 10 },
  { key: 'varios', label: 'Varios', hint: '(ropa, suscripciones, etc.)', min: 50, max: 800, step: 25 },
]

const colors: Record<string, string> = {
  alquiler: '#1A4B8C', comida: '#2E7D52', transporte: '#C8940F',
  ocio: '#7B3F8A', salud: '#C0392B', varios: '#5B5B7A',
}

const cities = [
  { name: 'Montevideo', avg: 1630, diff: 'similar' as const },
  { name: 'Buenos Aires', avg: 1100, diff: 'cheaper' as const },
  { name: 'Lisboa', avg: 2800, diff: 'pricier' as const },
  { name: 'Ciudad de México', avg: 1200, diff: 'cheaper' as const },
]

const diffLabels = { cheaper: '← Más barato', pricier: '→ Más caro', similar: '≈ Similar' }

const tools: { Icon: Icon; title: string; desc: string; badge: string; badgeClass: string }[] = [
  { Icon: ClipboardText, title: 'Checklist de llegada',      desc: 'Todo lo que hacer en el primer mes — en orden.',           badge: 'PDF',           badgeClass: 'badge-blue' },
  { Icon: Bank,          title: 'Trámites esenciales',       desc: 'Cédula, RUT, residencia — links oficiales.',               badge: 'Links',         badgeClass: 'badge-green' },
  { Icon: House,         title: 'Contrato de alquiler',      desc: 'Modelo de contrato en español. Revisado por abogado.',    badge: 'DOCX',          badgeClass: 'badge-blue' },
  { Icon: CurrencyDollar,title: 'Guía tributaria',           desc: 'Impuestos para extranjeros en lenguaje claro.',           badge: 'Próximamente',  badgeClass: 'badge-gold' },
  { Icon: Globe,         title: 'Comparativa de mutualistas',desc: 'Precios, cobertura y reseñas de la comunidad.',           badge: 'Próximamente',  badgeClass: 'badge-gold' },
  { Icon: MapTrifold,    title: 'Mapa de coworkings',        desc: 'Todos los espacios verificados en Montevideo.',           badge: 'Próximamente',  badgeClass: 'badge-gold' },
]

export default function CostCalculator() {
  const [currency, setCurrency] = useState<'USD' | 'UYU'>('USD')
  const [values, setValues] = useState(presets[1].values)
  const [activePreset, setActivePreset] = useState(1)

  const applyPreset = (i: number) => { setActivePreset(i); setValues(presets[i].values) }
  const update = (key: string, val: number) => { setValues((v) => ({ ...v, [key]: val })); setActivePreset(-1) }

  const total = Object.values(values).reduce((s, v) => s + v, 0)
  const display = (usd: number) => currency === 'USD' ? `$${Math.round(usd).toLocaleString()}` : `$${Math.round(usd * UYU_TO_USD).toLocaleString()} UYU`

  return (
    <main className="main-wrap">
      <div className="calc-grid">
        <div className="calc-controls">
          <h2>¿Cuánto cuesta vivir en Uruguay?</h2>
          <p>Ajustá los sliders según tu estilo de vida para ver tu presupuesto mensual estimado.</p>

          <div className="presets-label">Perfil de gasto</div>
          <div className="presets">
            {presets.map((p, i) => (
              <button key={p.label} className={`preset-btn${activePreset === i ? ' active' : ''}`} onClick={() => applyPreset(i)}>
                <span className="preset-name">{p.label}</span>
                <span className="preset-sub">{p.sub}</span>
              </button>
            ))}
          </div>

          <div className="currency-row">
            <span>Moneda</span>
            <div className="currency-toggle">
              <button className={`cur-btn${currency === 'USD' ? ' active' : ''}`} onClick={() => setCurrency('USD')}>USD</button>
              <button className={`cur-btn${currency === 'UYU' ? ' active' : ''}`} onClick={() => setCurrency('UYU')}>UYU</button>
            </div>
          </div>

          <div className="sliders-section">
            {sliders.map((s) => (
              <div key={s.key} className="slider-row">
                <div className="slider-header">
                  <span className="slider-label">{s.label} <span>{s.hint}</span></span>
                  <span className="slider-value">{display(values[s.key])}</span>
                </div>
                <input
                  type="range" min={s.min} max={s.max} step={s.step}
                  value={values[s.key]}
                  onChange={(e) => update(s.key, Number(e.target.value))}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="result-card">
          <div className="result-hero">
            <div className="result-label">Total mensual estimado</div>
            <div className="result-total">{display(total)}</div>
            <div className="result-sub">por persona / mes</div>
          </div>
          <div className="result-body">
            <div className="breakdown-title">Desglose</div>
            <div className="breakdown-list">
              {sliders.map((s) => {
                const pct = Math.round((values[s.key] / total) * 100)
                return (
                  <div key={s.key} className="breakdown-item">
                    <div className="breakdown-item-header">
                      <span className="breakdown-name">{s.label}</span>
                      <span className="breakdown-amt">{display(values[s.key])}</span>
                    </div>
                    <div className="breakdown-bar-bg">
                      <div className="breakdown-bar-fill" style={{ width: `${pct}%`, background: colors[s.key] }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="comparison">
              <div className="comparison-title">Comparativa de ciudades</div>
              {cities.map((c) => (
                <div key={c.name} className="city-row">
                  <span className="city-name">{c.name}</span>
                  <span className="city-avg">{display(c.avg)}/mes</span>
                  <span className={`city-diff ${c.diff}`}>{diffLabels[c.diff]}</span>
                </div>
              ))}
            </div>

            <button className="result-cta">Descargar estimación en PDF</button>
          </div>
        </div>
      </div>

      <div className="tools-section">
        <div className="section-heading">
          <h2>Más herramientas</h2>
          <p>Recursos para planear, llegar y asentarte en Uruguay.</p>
        </div>
        <div className="tools-grid">
          {tools.map((t) => (
            <a key={t.title} href="#" className="tool-card">
              <div className="tool-icon"><t.Icon size={24} weight="thin" /></div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <span className={`tool-badge ${t.badgeClass}`}>{t.badge}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
