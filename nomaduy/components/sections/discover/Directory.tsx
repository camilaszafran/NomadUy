'use client'

import { useLocale } from 'next-intl'
import { discoveryCopy } from '@/lib/discovery-copy'
import SaveButton from '@/components/planner/Favorites'
import { linkTarget } from '@/lib/link-target'
import { useId, useState } from 'react'
import type { Listing } from '@/lib/discover'

const mapUrl = (query: string) =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query)

export default function Directory({ items, filter = false, map = false }: {
  items: Listing[]
  filter?: boolean
  map?: boolean
}) {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  const id = useId()
  const [region, setRegion] = useState('')
  const [kind, setKind] = useState('')
  const [selected, setSelected] = useState('')
  const regions = [...new Set(items.map(item => item.region))].sort()
  const kinds = [...new Set(items.map(item => item.kind))].sort()
  const visible = items.filter(item => (!region || item.region === region) && (!kind || item.kind === kind))
  const point = visible.find(item => item.map === selected)

  return (
    <>
      {filter && (
        <div className="discovery-filters">
          <label htmlFor={id + '-region'}>{t("Dónde")} <select id={id + '-region'} value={region} onChange={event => setRegion(event.target.value)}>
              <option value="">{t("Todas las localidades")}</option>
              {regions.map(value => <option key={value} value={value}>{t(value)}</option>)}
            </select>
          </label>
          <label htmlFor={id + '-kind'}>{t("Qué te interesa")} <select id={id + '-kind'} value={kind} onChange={event => setKind(event.target.value)}>
              <option value="">{t("Todas las categorías")}</option>
              {kinds.map(value => <option key={value} value={value}>{t(value)}</option>)}
            </select>
          </label>
        </div>
      )}
      {point?.map && (
        <iframe className="discovery-map" title={t('Mapa de ') + point.title}
          src={'https://maps.google.com/maps?q=' + encodeURIComponent(point.map) + '&output=embed'}
          loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
      )}
      {visible.length === 0 && items.length > 0 && <p role="status">{t("No hay fichas con estos filtros.")}</p>}
      <div className="discovery-grid">
        {visible.map(item => (
          <article key={item.title + item.region} className="discovery-card">
            <p className="discovery-meta">{t(item.region)} · {t(item.kind)}</p>
            <h3>{t(item.title)}</h3>
            <p>{t(item.description)}</p>
            {item.href && <SaveButton item={{ href: item.href, title: t(item.title), kind: t(item.kind) }} />}
            <div className="discovery-actions">
              {item.href && <a href={item.href} {...linkTarget(item.href)}>{t(item.label ?? 'Conocer el lugar')} <span aria-hidden="true">↗</span></a>}
              {item.map && (map ? <>
                <button type="button" onClick={() => setSelected(item.map!)} aria-pressed={point?.map === item.map}>{t("Ver en el mapa")}</button>
                <a href={mapUrl(item.map)} {...linkTarget(mapUrl(item.map))}>{t("Cómo llegar")} <span aria-hidden="true">↗</span></a>
              </> : <a href={mapUrl(item.map)} {...linkTarget(mapUrl(item.map))}>{t("Ver ubicación")} <span aria-hidden="true">↗</span></a>)}
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
