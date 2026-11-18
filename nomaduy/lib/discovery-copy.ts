import copy from './discovery-copy.json'

/** Translate editorial copy while preserving proper names and user submissions. */
export function discoveryCopy(text: string, locale: string): string {
  const entry = Object.hasOwn(copy, text) ? (copy as Record<string, { en: string; pt: string }>)[text] : undefined
  return locale === 'en' || locale === 'pt' ? entry?.[locale] ?? text : text
}
