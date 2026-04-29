import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// Static import map — Turbopack requires statically analyzable paths
const loaders = {
  es: {
    nav:       () => import('../messages/es/nav.json'),
    footer:    () => import('../messages/es/footer.json'),
    home:      () => import('../messages/es/home.json'),
    guias:     () => import('../messages/es/guias.json'),
    vivir:     () => import('../messages/es/vivir.json'),
    conocer:   () => import('../messages/es/conocer.json'),
    comunidad: () => import('../messages/es/comunidad.json'),
    recursos:  () => import('../messages/es/recursos.json'),
  },
  en: {
    nav:       () => import('../messages/en/nav.json'),
    footer:    () => import('../messages/en/footer.json'),
    home:      () => import('../messages/en/home.json'),
    guias:     () => import('../messages/en/guias.json'),
    vivir:     () => import('../messages/en/vivir.json'),
    conocer:   () => import('../messages/en/conocer.json'),
    comunidad: () => import('../messages/en/comunidad.json'),
    recursos:  () => import('../messages/en/recursos.json'),
  },
  pt: {
    nav:       () => import('../messages/pt/nav.json'),
    footer:    () => import('../messages/pt/footer.json'),
    home:      () => import('../messages/pt/home.json'),
    guias:     () => import('../messages/pt/guias.json'),
    vivir:     () => import('../messages/pt/vivir.json'),
    conocer:   () => import('../messages/pt/conocer.json'),
    comunidad: () => import('../messages/pt/comunidad.json'),
    recursos:  () => import('../messages/pt/recursos.json'),
  },
} as const

type SupportedLocale = keyof typeof loaders

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  const locales: readonly string[] = routing.locales
  if (!locale || !locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  const loc = (locale in loaders ? locale : 'es') as SupportedLocale
  const sections = loaders[loc]

  const entries = await Promise.all(
    (Object.entries(sections) as [string, () => Promise<{ default: Record<string, unknown> }>][]).map(
      async ([section, load]) => {
        const mod = await load()
        return [section, mod.default] as const
      }
    )
  )

  const messages = Object.fromEntries(entries)

  return { locale, messages }
})
