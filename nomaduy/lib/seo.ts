import type { Metadata } from 'next'
import { localizeHref } from '@/lib/locale'

export const siteOrigin = 'https://www.nomad.com.uy'
export const publicPaths = ['/', '/sobre-nomad', '/explora', '/mi-uruguay', '/uruguay/viajar', '/uruguay/estadia-temporal', '/uruguay/mudarse', '/servicios', '/llegada', '/ayuda', '/guias', '/guias/primeras-48h', '/vivir', '/vivir/lugares', '/conocer-uruguay', '/recursos', '/comunidad']

export function siteUrl(path: string, locale: string) {
  return new URL(localizeHref(path, locale).replace(/\/$/, '') || '/', siteOrigin).href
}

export function languageUrls(path: string) {
  return { es: siteUrl(path, 'es'), en: siteUrl(path, 'en'), pt: siteUrl(path, 'pt'), 'x-default': siteUrl(path, 'es') }
}

export function pageSeo(path: string, locale: string, title: string, description: string): Metadata {
  const canonical = siteUrl(path, locale)
  const shareLocale = { es: 'es_UY', en: 'en_US', pt: 'pt_BR' }[locale] ?? 'es_UY'
  return {
    title: title + ' — NomadUY',
    description,
    alternates: { canonical, languages: languageUrls(path) },
    openGraph: { type: 'website', siteName: 'NomadUY', title, description, url: canonical, locale: shareLocale },
  }
}
