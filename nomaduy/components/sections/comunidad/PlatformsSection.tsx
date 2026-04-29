'use client'

import {
  WhatsappLogo,
  EnvelopeSimple,
  InstagramLogo,
  TelegramLogo,
  Monitor,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

const platformMeta: { Icon: Icon; iconClass: string; name: string; descKey: string; available: boolean }[] = [
  { Icon: WhatsappLogo,   iconClass: 'icon-wa',    name: 'WhatsApp',   descKey: 'platform_whatsapp_desc',   available: true },
  { Icon: EnvelopeSimple, iconClass: 'icon-nl',    name: 'Newsletter', descKey: 'platform_newsletter_desc', available: true },
  { Icon: InstagramLogo,  iconClass: 'icon-ig',    name: 'Instagram',  descKey: 'platform_instagram_desc',  available: true },
  { Icon: TelegramLogo,   iconClass: 'icon-tg',    name: 'Telegram',   descKey: 'platform_telegram_desc',   available: false },
  { Icon: Monitor,        iconClass: 'icon-forum', name: 'Foro',       descKey: 'platform_forum_desc',      available: false },
]

export default function PlatformsSection() {
  const t = useTranslations('comunidad')

  return (
    <section className="platforms-section">
      <div className="platforms-header">
        <div className="section-eyebrow">{t('platforms_eyebrow')}</div>
        <h2>{t('platforms_heading')}</h2>
        <p>{t('platforms_desc')}</p>
      </div>
      <div className="platforms-grid">
        {platformMeta.map((p) => (
          <a key={p.name} href="#" className="platform-card">
            <div className={`platform-icon ${p.iconClass}`}>
              <p.Icon size={24} weight="regular" />
            </div>
            <div className="platform-info">
              <h4>{p.name}</h4>
              <p>{t(p.descKey as Parameters<typeof t>[0])}</p>
            </div>
            <span className="platform-launch">
              {p.available ? t('platform_available') : t('platform_coming_soon')}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
