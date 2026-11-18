const nomadHosts = new Set(['nomad.com.uy', 'www.nomad.com.uy', 'nomad-uy.vercel.app'])
const newTab = { target: '_blank', rel: 'noopener noreferrer' } as const

export function linkTarget(href: string | undefined) {
  if (!href) return {}
  try {
    const url = new URL(href, 'https://www.nomad.com.uy')
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      if (!nomadHosts.has(url.hostname) || url.pathname.toLowerCase().endsWith('.pdf')) return newTab
    }
  } catch {
    return {}
  }
  return {}
}
