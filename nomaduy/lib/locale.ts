const DEFAULT_LOCALE = 'es'
const siteHosts = new Set(['nomad.com.uy', 'www.nomad.com.uy', 'nomad-uy.vercel.app'])

/** Localize internal pages without changing external links, downloads or page anchors. */
export function localizeHref(href: string, locale: string): string {
  let path = href
  if (/^https?:\/\//i.test(href)) {
    const url = new URL(href)
    if (!siteHosts.has(url.hostname)) return href
    path = url.pathname + url.search + url.hash
  }
  if (!path.startsWith('/') || path.startsWith('//')) return href
  if (/^\/(api|studio|_next)(\/|$)/.test(path) || /\.[a-z0-9]+(?:[?#]|$)/i.test(path)) return href
  const stripped = path.replace(/^\/(es|en|pt)(?=\/|[?#]|$)/, '') || '/'
  const page = stripped.startsWith('/') ? stripped : '/' + stripped
  return locale === DEFAULT_LOCALE ? page : `/${locale}${page === '/' ? '' : page}`
}
