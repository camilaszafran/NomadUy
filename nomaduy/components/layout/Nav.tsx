'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { routing } from '@/i18n/routing'

const linkHrefs = [
  { href: '/guias',          key: 'guias' },
  { href: '/vivir',          key: 'vivir' },
  { href: '/conocer-uruguay', key: 'conocer' },
  { href: '/recursos',       key: 'recursos' },
] as const

function buildLocalePath(fullPath: string, targetLocale: string): string {
  const stripped = fullPath.replace(/^\/(es|en|pt)(\/|$)/, '/') || '/'
  if (targetLocale === routing.defaultLocale) return stripped
  return `/${targetLocale}${stripped === '/' ? '' : stripped}`
}

function localizeHref(href: string, locale: string): string {
  if (locale === routing.defaultLocale) return href
  return `/${locale}${href}`
}

function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="locale-switcher" aria-label="Idioma">
      {routing.locales.map((l) => (
        <a
          key={l}
          href={buildLocalePath(pathname, l)}
          className={`locale-btn${l === locale ? ' active' : ''}`}
          aria-label={l.toUpperCase()}
        >
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('nav')

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav>
        <a href="/" className="nav-logo">
          Nomad<span>UY</span>
        </a>

        <ul className="nav-links">
          {linkHrefs.map(l => (
            <li key={l.href}><a href={localizeHref(l.href, locale)}>{t(l.key)}</a></li>
          ))}
          <li><a href={localizeHref('/comunidad', locale)} className="nav-cta">{t('unirme')}</a></li>
        </ul>

        <div className="nav-right">
          <LocaleSwitcher />
          <button
            className="nav-hamburger"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? t('close_menu') : t('open_menu')}
            aria-expanded={open}
          >
            <span className={`hbar${open ? ' open' : ''}`} />
            <span className={`hbar${open ? ' open' : ''}`} />
            <span className={`hbar${open ? ' open' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              <div className="nav-drawer-links">
                {linkHrefs.map(l => (
                  <a key={l.href} href={localizeHref(l.href, locale)} className="nav-drawer-link">
                    {t(l.key)}
                  </a>
                ))}
              </div>
              <a href={localizeHref('/comunidad', locale)} className="nav-drawer-cta">
                {t('join_community')}
              </a>
              <div className="nav-drawer-locale">
                <LocaleSwitcher />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
