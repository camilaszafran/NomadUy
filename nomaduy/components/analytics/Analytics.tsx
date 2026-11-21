'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const consentKey = 'nomaduy-analytics-consent-v1'
const copy = {
  es: ['Medición de visitas', '¿Nos permitís usar Google Analytics para conocer las visitas y mejorar Nomad? Es opcional.', 'Aceptar', 'Rechazar', 'Preferencias de medición'],
  en: ['Visitor analytics', 'May we use Google Analytics to understand visits and improve Nomad? This is optional.', 'Accept', 'Decline', 'Analytics preferences'],
  pt: ['Medição de visitas', 'Podemos usar o Google Analytics para entender as visitas e melhorar o Nomad? É opcional.', 'Aceitar', 'Recusar', 'Preferências de medição'],
}

// No requests are sent to Google until the visitor accepts analytics.
export default function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? 'G-2DYVK5HH2K'
  const enabled = /^G-[A-Z0-9]+$/.test(measurementId)
  const locale = useLocale()
  const pathname = usePathname()
  const t = copy[locale === 'en' || locale === 'pt' ? locale : 'es']
  const [consent, setConsent] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [ready, setReady] = useState(false)
  const lastPage = useRef('')
  const consentChoice = useRef<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    try {
      const saved = localStorage.getItem(consentKey)
      consentChoice.current = saved === 'granted' || saved === 'denied' ? saved : 'unknown'
      if (consentChoice.current === 'granted') initialize()
      setConsent(consentChoice.current)
    } catch { setConsent('unknown') }
  }, [enabled])

  useEffect(() => {
    if (!ready || consent !== 'granted' || lastPage.current === pathname) return
    lastPage.current = pathname
    const page = new URL(pathname, window.location.origin).href
    let referrer = ''
    try {
      const source = new URL(document.referrer)
      referrer = source.origin + source.pathname
    } catch { /* A direct visit has no referrer. */ }
    window.gtag?.('event', 'page_view', {
      send_to: measurementId,
      page_location: page,
      page_path: pathname,
      page_title: document.title,
      page_referrer: referrer,
      language: locale,
    })
  }, [ready, consent, pathname, locale, measurementId])

  function choose(value: 'granted' | 'denied') {
    try { localStorage.setItem(consentKey, value) } catch { /* Keep this choice for the current page. */ }
    consentChoice.current = value
    if (value === 'denied') {
      lastPage.current = ''
      // Stop collection immediately, including already-loaded automatic engagement events.
      ;(window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
    } else {
      ;(window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = false
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
      if (!window.gtag) initialize()
    }
    setConsent(value)
    setEditing(false)
  }

  function initialize() {
    if (consentChoice.current !== 'granted') return
    window.dataLayer = window.dataLayer ?? []
    window.gtag = window.gtag ?? function () { window.dataLayer!.push(arguments) }
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    window.gtag('js', new Date())
    window.gtag('config', measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: new URL(pathname, window.location.origin).href,
    })
  }

  if (!enabled) return null
  return <>
    {consent === 'granted' && <Script id="nomad-ga" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" onReady={() => setReady(true)} />}
    {(consent === 'unknown' || editing) ? <aside className="analytics-consent" aria-label={t[0]}>
      <p>{t[1]}</p>
      <div><button type="button" onClick={() => choose('granted')}>{t[2]}</button><button type="button" onClick={() => choose('denied')}>{t[3]}</button></div>
    </aside> : consent && <button type="button" className="analytics-preferences" onClick={() => setEditing(true)}>{t[4]}</button>}
  </>
}
