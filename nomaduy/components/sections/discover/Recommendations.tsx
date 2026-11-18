'use client'

import { useLocale } from 'next-intl'
import { discoveryCopy } from '@/lib/discovery-copy'
import { useEffect, useState, type FormEvent } from 'react'
import { categories, departments, type Recommendation } from '@/lib/recommendation-fields'
import Directory from './Directory'

export default function Recommendations() {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  const [items, setItems] = useState<Recommendation[] | null>(null)
  const [unavailable, setUnavailable] = useState(false)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/recomendaciones', { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Recommendations unavailable')
        return response.json()
      })
      .then(({ items }) => setItems(items))
      .catch(() => { if (!controller.signal.aborted) setUnavailable(true) })
    return () => controller.abort()
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setSending(true)
    setMessage('')
    try {
      const response = await fetch('/api/recomendaciones', { method: 'POST', body: new FormData(form) })
      const result = await response.json()
      if (!response.ok) {
        setMessage(language === 'es' ? result.error ?? t("No pudimos enviar tu sugerencia.") : t("No pudimos enviar tu sugerencia."))
        return
      }
      form.reset()
      setMessage(t("¡Gracias! Recibimos tu sugerencia para revisarla antes de publicarla."))
    } catch {
      setMessage(t("No pudimos enviar tu sugerencia. Probá de nuevo en un rato."))
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="recomendado" className="discovery-section" lang={language} aria-labelledby="recomendado-title">
      <header className="discovery-heading">
        <h2 id="recomendado-title">{t("Recomendado por la comunidad")}</h2>
        <p>{t("Los lugares y actividades compartidos por quienes están recorriendo Uruguay.")}</p>
      </header>
      {unavailable && <p role="status">{t("No pudimos cargar las recomendaciones. Volvé a intentar en un rato.")}</p>}
      {items && (items.length > 0
        ? <Directory items={items.map(item => ({ ...item, description: item.town + ' · ' + item.description }))} filter />
        : <p>{t("Todavía no hay recomendaciones publicadas. ¿Cuál sumarías primero?")}</p>)}
      <form id="recomendar" className="discovery-form" onSubmit={submit}>
        <h3>{t("Recomendá un lugar o actividad")}</h3>
        <label>{t("Nombre")}<input name="title" required maxLength={100} /></label>
        <label>{t("Localidad")}<input name="town" required maxLength={80} /></label>
        <label>{t("Departamento")}<select name="region" defaultValue="" required>
          <option value="" disabled>{t("Elegí un departamento")}</option>
          {departments.map(value => <option key={value} value={value}>{t(value)}</option>)}
        </select></label>
        <label>{t("Categoría")}<select name="kind" defaultValue="" required>
          <option value="" disabled>{t("Elegí una categoría")}</option>
          {categories.map(value => <option key={value} value={value}>{t(value)}</option>)}
        </select></label>
        <label>{t("¿Por qué lo recomendás?")}<textarea name="description" required rows={4} maxLength={650} /></label>
        <label>{t("Enlace (opcional)")}<input name="href" type="url" maxLength={500} placeholder="https://" /></label>
        <label>{t("Tu correo (opcional, no se publica)")}<input name="contact" type="email" maxLength={254} autoComplete="email" /></label>
        <label className="discovery-trap" aria-hidden="true">{t("Sitio web")}<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <button type="submit" disabled={sending}>{sending ? t("Enviando…") : t("Enviar recomendación")}</button>
        <p role="status">{message}</p>
      </form>
    </section>
  )
}
