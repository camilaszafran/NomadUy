import Link from 'next/link'
import {
  AirplaneTakeoff, Scales, MapPin, Bus, FirstAid,
  Bank, Laptop, UsersThree, ChatTeardropText,
  House, Heart, MapTrifold,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'
import { sanityFetch, guidesQuery } from '@/lib/sanity'
import type { GuideCard, GuideIcon } from '@/types'

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

const statusConfig = {
  ready:    { label: 'Disponible',    className: 'ready' },
  progress: { label: 'En proceso',   className: 'progress' },
  soon:     { label: 'Próximamente', className: 'soon' },
}

export default async function GuiasGrid() {
  const guides = await sanityFetch<GuideCard[]>(guidesQuery)

  const featured = guides.find((g) => g.featured)
  const rest = guides.filter((g) => !g.featured)

  return (
    <main className="main-wrap">
      {featured && (() => {
        const href = featured.status === 'ready' ? `/guias/${featured.slug.current}` : null
        const FeaturedIcon = iconMap[featured.icon] ?? AirplaneTakeoff
        const inner = (
          <div className="featured-guide-inner">
            <div className="featured-body">
              <div className="featured-eyebrow">Guía destacada</div>
              <h2>{featured.title}</h2>
              <p>{featured.summary}</p>
              {href && <span className="featured-cta">Leer guía completa →</span>}
            </div>
            <div className="featured-visual">
              <FeaturedIcon size={64} weight="thin" color="var(--blue)" />
            </div>
          </div>
        )
        return href
          ? <Link href={href} className="featured-guide">{inner}</Link>
          : <div className="featured-guide">{inner}</div>
      })()}

      <div className="section-intro">
        <h2>Todas las guías</h2>
        <p>Hacemos las guías para que evacues tus dudas y sepas todo lo que necesitas para vivir en el paisito. </p>
      </div>

      <div className="guide-grid">
        {rest.map((guide) => {
          const s = statusConfig[guide.status] ?? statusConfig.soon
          const GIcon = iconMap[guide.icon] ?? Laptop
          const href = guide.status === 'ready' ? `/guias/${guide.slug.current}` : null
          const inner = (
            <>
              <div className="guide-icon">
                <GIcon size={28} weight="light" color="var(--blue)" />
              </div>
              <h3>{guide.title}</h3>
              <div className="guide-meta">
                {guide.tags?.map((t) => <span key={t} className="meta-tag">{t}</span>)}
              </div>
              <p>{guide.summary}</p>
              <div className="guide-card-footer">
                <span className={`guide-status ${s.className}`}>{s.label}</span>
                {href && <span className="guide-arrow">→</span>}
              </div>
            </>
          )
          return href
            ? <Link key={guide._id} href={href} className="guide-card">{inner}</Link>
            : <div key={guide._id} className="guide-card coming-soon">{inner}</div>
        })}
      </div>

      <div className="help-strip">
        <p><strong>¿Buscás algo que no está acá?</strong> La comunidad tiene respuestas para casi cualquier pregunta sobre vivir en Uruguay.</p>
        <Link href="/comunidad" className="help-link">Preguntar en la comunidad →</Link>
      </div>
    </main>
  )
}
