'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocale } from 'next-intl'
import { readItems, type SavedItem } from '@/lib/planner'

const storageKey = 'nomaduy-favorites-v1'
const Context = createContext<{ items: SavedItem[]; ready: boolean; error: boolean; toggle: (item: SavedItem) => void }>({
  items: [], ready: false, error: false, toggle: () => {},
})

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SavedItem[]>([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const current = useRef<SavedItem[]>([])
  useEffect(() => {
    try { current.current = readItems(localStorage.getItem(storageKey)); setItems(current.current) }
    catch { setError(true) }
    setReady(true)
    function sync(event: StorageEvent) {
      if (event.key === storageKey || event.key === null) {
        current.current = readItems(event.newValue)
        setItems(current.current)
      }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  function toggle(item: SavedItem) {
    let latest = current.current
    if (!error) {
      try { latest = readItems(localStorage.getItem(storageKey)) } catch { setError(true) }
    }
    const next = latest.some(saved => saved.href === item.href)
      ? latest.filter(saved => saved.href !== item.href)
      : [...latest, item].slice(-100)
    current.current = next
    setItems(next)
    try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch { setError(true) }
  }
  return <Context.Provider value={{ items, ready, error, toggle }}>{children}</Context.Provider>
}
export const useFavorites = () => useContext(Context)

export default function SaveButton({ item }: { item: SavedItem }) {
  const { items, ready, toggle } = useFavorites()
  const locale = useLocale()
  const saved = items.some(value => value.href === item.href)
  const labels = locale === 'en' ? ['Save', 'Saved'] : locale === 'pt' ? ['Salvar', 'Salvo'] : ['Guardar', 'Guardado']
  return <button type="button" className="save-place" disabled={!ready} aria-pressed={saved}
    aria-label={labels[saved ? 1 : 0] + ' ' + item.title}
    onClick={event => { event.stopPropagation(); toggle(item) }}>
    <span aria-hidden="true">{saved ? '♥' : '♡'}</span> {labels[saved ? 1 : 0]}
  </button>
}
