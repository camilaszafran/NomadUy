'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  AirplaneTakeoff, Scales, MapPin, Bus, FirstAid,
  Bank, Laptop, UsersThree, ChatTeardropText,
  House, Heart, MapTrifold,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { GuideCard, GuideIcon } from '@/types'

const _client = createClient({ projectId: 'ohjste83', dataset: 'production', apiVersion: '2024-01-01', useCdn: true })
const _builder = createImageUrlBuilder(_client)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const urlFor = (source: any) => _builder.image(source)

const iconMap: Record<GuideIcon, Icon> = {
  airplane:     AirplaneTakeoff,
  scales:       Scales,
  mapPin:       MapPin,
  bus:          Bus,
  firstAid:     FirstAid,
  bank:         Bank,
  laptop:       Laptop,
  usersThree:   UsersThree,
  chatTeardrop: ChatTeardropText,
  house:        House,
  heart:        Heart,
  map:          MapTrifold,
}

const categoryGradients: Record<string, string> = {
  llegada:  '#1B4F8A',
  legal:    '#2E7D52',
  vivienda: '#D4922A',
  trabajo:  '#1B4F8A',
  moverse:  '#2E7D52',
  salud:    '#c0392b',
  familia:  '#8e44ad',
  finanzas: '#16a085',
  idioma:   '#D4922A',
}

const categoryLabels: Record<string, string> = {
  llegada:  'Llegada',
  legal:    'Legal & Trámites',
  vivienda: 'Vivienda',
  trabajo:  'Trabajo',
  moverse:  'Moverse',
  salud:    'Salud',
  familia:  'Familia',
  finanzas: 'Finanzas',
  idioma:   'Idioma',
}

const statusConfig = {
  ready:    { label: 'Disponible',    className: 'ready' },
  progress: { label: 'En proceso',   className: 'progress' },
  soon:     { label: 'Próximamente', className: 'soon' },
}

export default function GuiasGridClient({ guides }: { guides: GuideCard[] }) {
  const categories = Array.from(new Set(guides.map((g) => g.category).filter(Boolean))) as string[]
  const [active, setActive] = useState<string | null>(null)

  const filtered = active ? guides.filter((g) => g.category === active) : guides

  return (
    <main className="main-wrap">

      {/* Cat strip */}
      <div className="cat-strip-inline">
        <button className={`cat-pill${active === null ? ' active' : ''}`} onClick={() => setActive(null)}>
          Todas
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-pill${active === cat ? ' active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {categoryLabels[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* Masonry 3-col grid — split into 3 columns with deliberate offsets */}
      <div className="gcard-masonry">
        {[0, 1, 2].map((col) => (
          <div key={col} className="gcard-col" style={{ marginTop: col === 1 ? 48 : col === 2 ? 24 : 0 }}>
            {filtered.filter((_, i) => i % 3 === col).map((guide) => {
          const s = statusConfig[guide.status] ?? statusConfig.soon
          const GIcon = iconMap[guide.icon] ?? Laptop
          const bg = categoryGradients[guide.category ?? ''] ?? '#1B4F8A'
          const href = guide.status === 'ready' ? `/guias/${guide.slug.current}` : null
          const imgUrl = guide.coverImage
            ? urlFor(guide.coverImage).width(600).height(400).url()
            : null

          const inner = (
            <>
              {/* Blurred photo + icon */}
              <div className="gcard-thumb">
                {imgUrl ? (
                  <>
                    <Image
                      src={imgUrl}
                      alt={guide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="gcard-thumb-overlay" />
                  </>
                ) : (
                  <div className="gcard-thumb-color" style={{ background: bg }} />
                )}
                <div className="gcard-thumb-icon">
                  <GIcon size={32} weight="light" color="#fff" />
                </div>
              </div>

              {/* Text content */}
              <div className="gcard-body">
                <div className="gcard-top">
                  {guide.category && (
                    <span className="gcard-category">{categoryLabels[guide.category] ?? guide.category}</span>
                  )}
                  <span className={`guide-status ${s.className}`}>{s.label}</span>
                </div>
                <h3>{guide.title}</h3>
                {guide.tags && guide.tags.length > 0 && (
                  <div className="gcard-tags">
                    {guide.tags.map((t) => <span key={t} className="gcard-tag">{t}</span>)}
                  </div>
                )}
                <p>{guide.summary}</p>
                {href && <span className="gcard-arrow">Leer →</span>}
              </div>
            </>
          )

          return href
              ? <Link key={guide._id} href={href} className="gcard">{inner}</Link>
              : <div key={guide._id} className="gcard gcard-soon">{inner}</div>
          })}
          </div>
        ))}
      </div>

      <div className="help-strip">
        <p><strong>¿Buscás algo que no está acá?</strong> La comunidad tiene respuestas para casi cualquier pregunta sobre vivir en Uruguay.</p>
        <Link href="/comunidad" className="help-link">Preguntar en la comunidad →</Link>
      </div>
    </main>
  )
}
