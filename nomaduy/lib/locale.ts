const DEFAULT_LOCALE = 'es'

export function localizeHref(href: string, locale: string): string {
  if (locale === DEFAULT_LOCALE) return href
  return `/${locale}${href}`
}
