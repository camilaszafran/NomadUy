'use client'

import {
  WhatsappLogo,
  EnvelopeSimple,
  InstagramLogo,
  TelegramLogo,
  Monitor,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

const platforms: { Icon: Icon; iconClass: string; name: string; desc: string; launch: string }[] = [
  { Icon: WhatsappLogo,   iconClass: 'icon-wa',    name: 'WhatsApp',   desc: 'Grupos temáticos activos',     launch: 'Disponible' },
  { Icon: EnvelopeSimple, iconClass: 'icon-nl',    name: 'Newsletter', desc: 'Una vez por mes',              launch: 'Disponible' },
  { Icon: InstagramLogo,  iconClass: 'icon-ig',    name: 'Instagram',  desc: '@nomaduy — vida en Uruguay',   launch: 'Disponible' },
  { Icon: TelegramLogo,   iconClass: 'icon-tg',    name: 'Telegram',   desc: 'Canal de novedades',           launch: 'Próximamente' },
  { Icon: Monitor,        iconClass: 'icon-forum', name: 'Foro',       desc: 'Preguntas & respuestas',       launch: 'Próximamente' },
]

export default function PlatformsSection() {
  return (
    <section className="platforms-section">
      <div className="platforms-header">
        <div className="section-eyebrow">Dónde estamos</div>
        <h2>Elegí cómo conectarte</h2>
        <p>Estamos donde estás vos — sin forzarte a usar una plataforma que no usás.</p>
      </div>
      <div className="platforms-grid">
        {platforms.map((p) => (
          <a key={p.name} href="#" className="platform-card">
            <div className={`platform-icon ${p.iconClass}`}>
              <p.Icon size={24} weight="regular" />
            </div>
            <div className="platform-info">
              <h4>{p.name}</h4>
              <p>{p.desc}</p>
            </div>
            <span className="platform-launch">{p.launch}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
