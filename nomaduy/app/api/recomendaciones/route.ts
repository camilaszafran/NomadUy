import { randomUUID } from 'node:crypto'
import { resend } from '@/lib/resend'
import { database, fields, recommendationFields, recommendationType, reviewSignature, reviewUrl, stringField, escapeHtml } from '@/lib/recommendations'
import type { Recommendation } from '@/lib/recommendation-fields'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await database.fetch<Recommendation[]>(
      '*[_type == $type && _id match "nomad-recommendation-*" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...120]{' + fields + '}',
      { type: recommendationType },
      { cache: 'no-store' },
    )
    return Response.json({ items }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return Response.json({ error: 'No pudimos cargar las recomendaciones.' }, { status: 503 })
  }
}

export async function POST(request: Request) {
  const error = (message: string, status: number) => Response.json({ error: message }, { status })
  if (!process.env.SANITY_API_TOKEN || !process.env.RESEND_API_KEY) {
    return error('El formulario no está disponible por el momento.', 503)
  }
  if (Number(request.headers.get('content-length')) > 12_000) return error('El envío es demasiado largo.', 413)
  let data: FormData
  try { data = await request.formData() } catch { return error('Formulario inválido.', 400) }
  if (data.get('website')) return Response.json({ success: true })

  const suggestion = recommendationFields(data)
  const contact = stringField(data, 'contact', 254)
  if (!suggestion || contact === null || (contact && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact))) {
    return error('Revisá los campos, el correo y el enlace.', 400)
  }

  const id = 'nomad-recommendation-' + randomUUID()
  const signature = reviewSignature(id)
  if (!signature) return error('El formulario no está disponible por el momento.', 503)

  try {
    const recent = await database.fetch<number>(
      'count(*[_type == $type && _id in path("drafts.**") && _createdAt > $since])',
      { type: recommendationType, since: new Date(Date.now() - 3600_000).toISOString() },
      { cache: 'no-store' },
    )
    if (recent >= 25) return error('Hay muchas sugerencias en revisión. Probá en un rato.', 429)

    await database.create({ _id: 'drafts.' + id, _type: recommendationType, ...suggestion })
    const link = new URL(reviewUrl)
    link.searchParams.set('id', id)
    link.searchParams.set('key', signature)
    const text = [
      suggestion.title + ' · ' + suggestion.town + ', ' + suggestion.region,
      suggestion.kind, suggestion.description, suggestion.href,
      contact ? 'Correo de contacto (privado): ' + contact : '',
    ].filter(Boolean).join('\n')
    const { error: sendError } = await resend.emails.send({
      from: 'NomadUY <bienvenida@nomad.com.uy>',
      to: 'info@nomad.com.uy',
      subject: 'NomadUY · Nueva recomendación para revisar',
      text: text + '\n\nRevisar sugerencia: ' + link,
      html: '<h1>Nueva recomendación</h1><p>' + escapeHtml(text).replaceAll('\n', '<br>') +
        '</p><p><a href="' + escapeHtml(link.toString()) + '">Revisar sugerencia</a></p>',
    })
    if (sendError) throw new Error('Notification rejected')
    return Response.json({ success: true }, { status: 201 })
  } catch {
    console.error('NomadUY recommendation submission failed')
    return error('No pudimos confirmar el envío. Probá de nuevo más tarde.', 503)
  }
}
