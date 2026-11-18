export type SavedItem = { href: string; title: string; kind: string }
export type SearchItem = SavedItem & { summary: string; keywords?: string }
export function safeItem(value: unknown): value is SavedItem {
  if (!value || typeof value !== 'object') return false
  const item = value as SavedItem
  if (typeof item.href !== 'string' || typeof item.title !== 'string' || typeof item.kind !== 'string') return false
  if (item.title.length > 250 || item.kind.length > 100 || item.href.length > 2000) return false
  if (/[\\\u0000-\u0020]/.test(item.href)) return false
  try {
    const url = new URL(item.href, 'https://www.nomad.com.uy')
    return (url.protocol === 'http:' || url.protocol === 'https:') &&
      (item.href.startsWith('/') ? url.origin === 'https://www.nomad.com.uy' : /^https?:\/\//i.test(item.href))
  } catch { return false }
}
export function readItems(raw: string | null): SavedItem[] {
  try {
    const data: unknown = JSON.parse(raw ?? '[]')
    if (!Array.isArray(data)) return []
    return [...new Map(data.filter(safeItem).slice(0, 100).map(item => [item.href, item])).values()]
  } catch { return [] }
}
export const normalizeSearch = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
