'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLocale } from 'next-intl'
import SaveButton, { useFavorites } from './Favorites'
import { readItems, type SearchItem, type SavedItem } from '@/lib/planner'
import { localizeHref } from '@/lib/locale'
import { searchScore } from '@/lib/search-ranking'
import { linkTarget } from '@/lib/link-target'

const copy = {
 es: { search: '¿Qué necesitás resolver?', placeholder: 'Ej.: alquiler por tres meses, llegué con perro, pasear sin auto', all: 'Todo el sitio', saved: 'Mis favoritos', empty: 'Todavía no guardaste nada. Tocá Guardar en una guía, ruta, lugar o servicio.', none: 'No encontramos coincidencias. Probá con una ciudad o una palabra como alquiler, mascotas o senderos.', share: 'Compartir lista', download: 'Descargar lista', copied: 'Enlace copiado', failed: 'Copiá este enlace para compartir tu lista', shared: 'Lista compartida', local: 'Tus favoritos se guardan en este dispositivo. Podés compartirlos con un enlace o descargar una lista.', storage: 'El navegador bloqueó el guardado. Los cambios duran mientras esta página esté abierta. Descargá tu lista para conservarla.', results: 'resultados', open: 'Abrir', prompts: ['Alquiler por tres meses', 'Llegué con perro', 'Pasear sin auto', 'Quiero conocer gente'] },
 en: { search: 'What do you need help with?', placeholder: 'e.g. monthly rental, arriving with a pet, trips without a car', all: 'Search the site', saved: 'My saved places', empty: 'Nothing saved yet. Tap Save on a guide, route, place or service.', none: 'No matches found. Try a city or a word such as rental, pets or hiking.', share: 'Share list', download: 'Download list', copied: 'Link copied', failed: 'Copy this link to share your list', shared: 'Shared list', local: 'Saved items stay on this device. Share them with a link or download your list.', storage: 'Your browser blocked storage. Changes last while this page is open. Download your list to keep it.', results: 'results', open: 'Open', prompts: ['Monthly rental', 'Arriving with a pet', 'Trips without a car', 'Meet people'] },
 pt: { search: 'O que você precisa resolver?', placeholder: 'Ex.: aluguel por três meses, cheguei com cachorro, passeios sem carro', all: 'Buscar no site', saved: 'Meus favoritos', empty: 'Você ainda não salvou nada. Toque em Salvar em um guia, roteiro, lugar ou serviço.', none: 'Nenhum resultado. Tente uma cidade ou uma palavra como aluguel, animais ou trilhas.', share: 'Compartilhar lista', download: 'Baixar lista', copied: 'Link copiado', failed: 'Copie este link para compartilhar sua lista', shared: 'Lista compartilhada', local: 'Os favoritos ficam salvos neste dispositivo. Compartilhe por link ou baixe sua lista.', storage: 'O navegador bloqueou o armazenamento. As alterações duram enquanto a página estiver aberta. Baixe sua lista para guardar.', results: 'resultados', open: 'Abrir', prompts: ['Aluguel por três meses', 'Cheguei com cachorro', 'Passeios sem carro', 'Conhecer pessoas'] },
}

export default function Planner({ catalog }: { catalog: SearchItem[] }) {
  const locale = useLocale()
  const t = copy[locale === 'en' || locale === 'pt' ? locale : 'es']
  const { items, ready, error } = useFavorites()
  const [mode, setMode] = useState<'search' | 'saved'>('search')
  const [query, setQuery] = useState('')
  const [shared, setShared] = useState<SavedItem[]>([])
  const [message, setMessage] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setQuery(params.get('q')?.slice(0, 250) ?? '')
    if (params.get('favoritos') === '1') setMode('saved')
    function loadShared() {
      const list = new URLSearchParams(window.location.hash.slice(1)).get('lista') ?? params.get('lista')
      setShared(list && list.length <= 250000 ? readItems(list) : [])
    }
    loadShared()
    window.addEventListener('hashchange', loadShared)
    return () => window.removeEventListener('hashchange', loadShared)
  }, [])
  const results = useMemo(() => {
    if (mode === 'saved') return items.map(item => catalog.find(entry => entry.href === item.href) ?? { ...item, summary: '' })
    if (!query.trim()) return catalog.slice(0, 12)
    return catalog.map(item => ({ item, rank: searchScore(item, query) })).filter(item => item.rank > 0).sort((a, b) => b.rank - a.rank).slice(0, 30).map(({ item }) => item)
  }, [catalog, items, mode, query])
  function hrefFor(item: SavedItem) { return item.href.startsWith('/') ? localizeHref(item.href, locale) : item.href }
  async function share() {
    const url = new URL(localizeHref('/mi-uruguay', locale), window.location.origin)
    url.hash = new URLSearchParams({ lista: JSON.stringify(items.map(({ href, title, kind }) => ({ href, title, kind }))) }).toString()
    setShareUrl(url.href)
    try { await navigator.clipboard.writeText(url.href); setMessage(t.copied) } catch { setMessage(t.failed) }
  }
  function download() {
    const text = items.map(item => item.title + '\n' + new URL(hrefFor(item), window.location.origin).href).join('\n\n')
    const url = URL.createObjectURL(new Blob(['Mi Uruguay\n\n' + text], { type: 'text/plain;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url; a.download = 'mi-uruguay.txt'; a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  function cards(entries: SearchItem[]) {
    return <div className="planner-results">{entries.map(item => <article className="arrival-card" key={item.href}>
      <small>{item.kind}</small><h2><a href={hrefFor(item)} {...linkTarget(item.href)}>{item.title}</a></h2>
      {item.summary && <p>{item.summary}</p>}<SaveButton item={item} />
    </article>)}</div>
  }
  return <div className="planner">
    <div className="planner-tabs">
      <button type="button" aria-pressed={mode === 'search'} onClick={() => setMode('search')}>{t.all}</button>
      <button type="button" aria-pressed={mode === 'saved'} onClick={() => setMode('saved')}>{t.saved} {ready ? '(' + items.length + ')' : ''}</button>
    </div>
    {mode === 'search' ? <>
      <label htmlFor="nomad-query">{t.search}</label>
      <input id="nomad-query" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t.placeholder} maxLength={250} />
      <div className="planner-prompts">{t.prompts.map(prompt => <button type="button" key={prompt} onClick={() => setQuery(prompt)}>{prompt}</button>)}</div>
    </> : <>
      <p>{t.local}</p>
      {error && <p role="alert">{t.storage}</p>}
      {items.length > 0 && <div className="planner-actions">
        <button type="button" onClick={share}>{t.share}</button><button type="button" onClick={download}>{t.download}</button>
      </div>}
      {message && <p role="status">{message}</p>}
      {shareUrl && <input aria-label={t.share} value={shareUrl} readOnly onFocus={event => event.target.select()} />}
    </>}
    {shared.length > 0 && <section><h2>{t.shared}</h2>{cards(shared.map(item => ({ ...item, summary: '' })))}</section>}
    <p role="status">{results.length} {t.results}</p>
    {results.length ? cards(results) : <p>{mode === 'saved' ? t.empty : t.none}</p>}
  </div>
}
