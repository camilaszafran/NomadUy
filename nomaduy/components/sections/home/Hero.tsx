'use client'

import { motion } from 'framer-motion'
import { Calendar, ChatsCircle, Globe } from '@phosphor-icons/react'
import { useTranslations, useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import type { CalendarEvent } from '@/lib/calendar'

function formatEventDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString(locale === 'es' ? 'es-UY' : locale, { weekday: 'short', day: 'numeric', month: 'short' })
}

function localizeHref(href: string, locale: string): string {
  if (locale === routing.defaultLocale) return href
  return `/${locale}${href}`
}

const ease = [0.23, 1, 0.32, 1] as [number, number, number, number]

const textItem = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease },
})

interface HeroProps {
  events: CalendarEvent[]
}

export default function Hero({ events }: HeroProps) {
  const t = useTranslations('home.hero')
  const locale = useLocale()

  return (
    <section className="hero hero-video-mode">
      <div className="hero-media">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-compressed.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <motion.div className="hero-text" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div className="hero-eyebrow hero-eyebrow-light" {...textItem(0.1)}>
          {t('eyebrow')}
        </motion.div>

        <motion.h1 className="hero-h1-light" {...textItem(0.22)}>
          {t('h1_line1')}<br />
          <em>{t('h1_em')}</em>
        </motion.h1>

        <motion.p className="hero-sub hero-sub-light" {...textItem(0.34)}>
          {t('subtitle')}
        </motion.p>

        <motion.div className="hero-actions" {...textItem(0.46)}>
          <a href={localizeHref('/comunidad', locale)} className="btn-hero-primary">
            {t('cta_primary')}
          </a>
          <a href={localizeHref('/guias', locale)} className="btn-hero-secondary">
            {t('cta_secondary')}
          </a>
          <a href="#pdf" className="btn-hero-text">
            {t('cta_pdf')}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        style={{ position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, x: 40, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
      >
        <div className="hero-card">
          <div className="hero-card-label">{t('card_now')}</div>
          <div className="community-pulse">
            {events.length > 0 ? (
              events.slice(0, 1).map((e, i) => (
                <div key={e.id}>
                  <a href={localizeHref('/comunidad#eventos', locale)} className="pulse-stat pulse-stat-link">
                    <div className="pulse-icon blue">
                      <Calendar size={20} weight="duotone" />
                    </div>
                    <div>
                      <div className="pulse-label">{formatEventDate(e.start, locale)}</div>
                      <div className="pulse-value">{e.title}{e.location ? ` · ${e.location}` : ''}</div>
                    </div>
                  </a>
                  {i < events.slice(0, 1).length - 1 && <div className="pulse-divider" />}
                </div>
              ))
            ) : (
              <div className="pulse-stat">
                <div className="pulse-icon blue">
                  <Calendar size={20} weight="duotone" />
                </div>
                <div>
                  <div className="pulse-label">{t('event_next')}</div>
                  <div className="pulse-value">{t('event_fallback')}</div>
                </div>
              </div>
            )}
            <div className="pulse-divider" />
            <div className="pulse-stat">
              <div className="pulse-icon gold">
                <ChatsCircle size={20} weight="duotone" />
              </div>
              <div>
                <div className="pulse-label">{t('whatsapp_label')}</div>
                <div className="pulse-value">{t('whatsapp_desc')}</div>
              </div>
            </div>
            <div className="pulse-divider" />
            <div className="pulse-stat">
              <div className="pulse-icon green">
                <Globe size={20} weight="duotone" />
              </div>
              <div>
                <div className="pulse-label">{t('members_label')}</div>
                <div className="pulse-value">{t('members_desc')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="join-mini">
          <h3>{t('join_mini_title')}</h3>
          <p>{t('join_mini_desc')}</p>
          <div className="join-mini-fields">
            <input type="email" placeholder={t('join_mini_email')} />
            <a href={localizeHref('/comunidad', locale)} className="join-mini-btn">{t('join_mini_btn')}</a>
          </div>
          <div className="join-mini-note">{t('join_mini_note')}</div>
        </div>
      </motion.div>
    </section>
  )
}
