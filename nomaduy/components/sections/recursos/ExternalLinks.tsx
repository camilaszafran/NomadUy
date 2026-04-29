'use client'

import { useTranslations } from 'next-intl'

const linkHrefs = [
  'https://www.instagram.com/turistaenuruguay/',
  'https://turismoruralynatural.uy',
  'https://www.guruguay.com/es/',
  'https://www.instagram.com/mateoexperience/',
  'https://www.instagram.com/paseos_en_familia/',
  'https://www.instagram.com/hoyquehagomontevideo/',
  'https://voy.com.uy',
  'https://sierraatlantica.com',
  'https://www.google.com/maps/search/mapa+cafes+montevideo/@-34.9213512,-56.1580083,14z/data=!4m2!2m1!6e5?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D',
]

const titleKeys = [
  'external_link_1', 'external_link_2', 'external_link_3', 'external_link_4',
  'external_link_5', 'external_link_6', 'external_link_7', 'external_link_8',
  'external_link_9',
] as const

export default function ExternalLinks() {
  const t = useTranslations('recursos')

  return (
    <section className="external-links-section">
      <h2>{t('external_heading')}</h2>
      <div className="external-links-grid">
        {titleKeys.map((key, i) => (
          <a
            key={linkHrefs[i]}
            href={linkHrefs[i]}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link-card"
          >
            <span>{t(key)}</span>
            <span className="external-link-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}
