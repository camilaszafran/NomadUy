import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

const SECTIONS = ['nav', 'footer', 'home', 'guias', 'vivir', 'conocer', 'comunidad', 'recursos'] as const

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  const locales: readonly string[] = routing.locales
  if (!locale || !locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  const sectionModules = await Promise.all(
    SECTIONS.map(async (section) => {
      try {
        const mod = await import(`../messages/${locale}/${section}.json`)
        return [section, mod.default] as const
      } catch {
        // Fall back to Spanish source if locale file missing
        const mod = await import(`../messages/es/${section}.json`)
        return [section, mod.default] as const
      }
    })
  )

  const messages = Object.fromEntries(sectionModules)

  return { locale, messages }
})
