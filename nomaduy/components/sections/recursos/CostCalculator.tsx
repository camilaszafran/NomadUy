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
import { useTranslations } from 'next-intl'

const UYU_TO_USD = 38.5

const presetValues = [
  { values: { alquiler: 350, comida: 200, transporte: 40, ocio: 60, salud: 50, varios: 100 } },
  { values: { alquiler: 700, comida: 400, transporte: 80, ocio: 150, salud: 100, varios: 200 } },
  { values: { alquiler: 1400, comida: 700, transporte: 150, ocio: 300, salud: 150, varios: 400 } },
]

const sliderConfig = [
  { key: 'alquiler', labelKey: 'slider_alquiler', hintKey: 'slider_alquiler_hint', min: 200, max: 2500, step: 50 },
  { key: 'comida',   labelKey: 'slider_comida',   hintKey: 'slider_comida_hint',   min: 100, max: 1200, step: 25 },
  { key: 'transporte', labelKey: 'slider_transporte', hintKey: 'slider_transporte_hint', min: 20, max: 300, step: 10 },
  { key: 'ocio',     labelKey: 'slider_ocio',     hintKey: 'slider_ocio_hint',     min: 0, max: 600, step: 25 },
  { key: 'salud',    labelKey: 'slider_salud',    hintKey: 'slider_salud_hint',    min: 0, max: 300, step: 10 },
  { key: 'varios',   labelKey: 'slider_varios',   hintKey: 'slider_varios_hint',   min: 50, max: 800, step: 25 },
] as const

const colors: Record<string, string> = {
  alquiler: '#1A4B8C', comida: '#2E7D52', transporte: '#C8940F',
  ocio: '#7B3F8A', salud: '#C0392B', varios: '#5B5B7A',
}

const cities = [
  { name: 'Montevideo',       avg: 1630, diff: 'similar'  as const },
  { name: 'Buenos Aires',     avg: 1100, diff: 'cheaper'  as const },
  { name: 'Lisboa',           avg: 2800, diff: 'pricier'  as const },
  { name: 'Ciudad de México', avg: 1200, diff: 'cheaper'  as const },
]

const toolIcons: Icon[] = [ClipboardText, Bank, House, CurrencyDollar, Globe, MapTrifold]
const toolKeys = [
  { title: 'tool_checklist_title', desc: 'tool_checklist_desc', badge: 'tool_checklist_badge', badgeClass: 'badge-blue' },
  { title: 'tool_tramites_title',  desc: 'tool_tramites_desc',  badge: 'tool_tramites_badge',  badgeClass: 'badge-green' },
  { title: 'tool_contrato_title',  desc: 'tool_contrato_desc',  badge: 'tool_contrato_badge',  badgeClass: 'badge-blue' },
  { title: 'tool_tributaria_title',desc: 'tool_tributaria_desc',badge: 'tool_tributaria_badge',badgeClass: 'badge-gold' },
  { title: 'tool_mutualistas_title',desc:'tool_mutualistas_desc',badge:'tool_mutualistas_badge',badgeClass:'badge-gold' },
  { title: 'tool_coworkings_title',desc: 'tool_coworkings_desc',badge: 'tool_coworkings_badge',badgeClass: 'badge-gold' },
] as const

export default function CostCalculator() {
  const t = useTranslations('recursos')
  const [currency, setCurrency] = useState<'USD' | 'UYU'>('USD')
  const [values, setValues] = useState(presetValues[1].values)
  const [activePreset, setActivePreset] = useState(1)

  const presets = [
    { label: t('preset_mochilero'), sub: t('preset_mochilero_sub') },
    { label: t('preset_comodo'),    sub: t('preset_comodo_sub')    },
    { label: t('preset_premium'),   sub: t('preset_premium_sub')   },
  ]

  const diffLabels = {
    cheaper: t('comparison_cheaper'),
    pricier: t('comparison_pricier'),
    similar: t('comparison_similar'),
  }

  const applyPreset = (i: number) => { setActivePreset(i); setValues(presetValues[i].values) }
  const update = (key: string, val: number) => { setValues((v) => ({ ...v, [key]: val })); setActivePreset(-1) }

  const total = Object.values(values).reduce((s, v) => s + v, 0)
  const display = (usd: number) => currency === 'USD'
    ? `$${Math.round(usd).toLocaleString()}`
    : `$${Math.round(usd * UYU_TO_USD).toLocaleString()} UYU`

  return (
    <main className="main-wrap">
      <div className="calc-grid">
        <div className="calc-controls">
          <h2>{t('calc_heading')}</h2>
          <p>{t('calc_desc')}</p>

          <div className="presets-label">{t('preset_label')}</div>
          <div className="presets">
            {presets.map((p, i) => (
              <button key={p.label} className={`preset-btn${activePreset === i ? ' active' : ''}`} onClick={() => applyPreset(i)}>
                <span className="preset-name">{p.label}</span>
                <span className="preset-sub">{p.sub}</span>
              </button>
            ))}
          </div>

          <div className="currency-row">
            <span>{t('currency_label')}</span>
            <div className="currency-toggle">
              <button className={`cur-btn${currency === 'USD' ? ' active' : ''}`} onClick={() => setCurrency('USD')}>{t('currency_usd')}</button>
              <button className={`cur-btn${currency === 'UYU' ? ' active' : ''}`} onClick={() => setCurrency('UYU')}>{t('currency_uyu')}</button>
            </div>
          </div>

          <div className="sliders-section">
            {sliderConfig.map((s) => (
              <div key={s.key} className="slider-row">
                <div className="slider-header">
                  <span className="slider-label">{t(s.labelKey)} <span>{t(s.hintKey)}</span></span>
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
            <div className="result-label">{t('result_label')}</div>
            <div className="result-total">{display(total)}</div>
            <div className="result-sub">{t('result_sub')}</div>
          </div>
          <div className="result-body">
            <div className="breakdown-title">{t('breakdown_title')}</div>
            <div className="breakdown-list">
              {sliderConfig.map((s) => {
                const pct = Math.round((values[s.key] / total) * 100)
                return (
                  <div key={s.key} className="breakdown-item">
                    <div className="breakdown-item-header">
                      <span className="breakdown-name">{t(s.labelKey)}</span>
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
              <div className="comparison-title">{t('comparison_title')}</div>
              {cities.map((c) => (
                <div key={c.name} className="city-row">
                  <span className="city-name">{c.name}</span>
                  <span className="city-avg">{display(c.avg)}{t('per_month')}</span>
                  <span className={`city-diff ${c.diff}`}>{diffLabels[c.diff]}</span>
                </div>
              ))}
            </div>

            <button className="result-cta">{t('export_btn')}</button>
          </div>
        </div>
      </div>

      <div className="tools-grid">
        {toolKeys.map((keys, i) => {
          const TIcon = toolIcons[i]
          return (
            <div key={keys.title} className="tool-card">
              <div className="tool-icon"><TIcon size={22} weight="regular" /></div>
              <div className="tool-body">
                <div className="tool-title-row">
                  <h4>{t(keys.title)}</h4>
                  <span className={`tool-badge ${keys.badgeClass}`}>{t(keys.badge)}</span>
                </div>
                <p>{t(keys.desc)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
