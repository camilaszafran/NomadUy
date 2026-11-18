import { database, escapeHtml, recommendationFields, recommendationType, reviewUrl, validSignature } from '@/lib/recommendations'
import { categories, departments, type Recommendation } from '@/lib/recommendation-fields'

export const dynamic = 'force-dynamic'
type Draft = Recommendation & { _id: string; _rev: string; _type: string }
const h = escapeHtml

function page(title: string, content: string, status = 200) {
  return new Response('<!doctype html><html lang="es-UY"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' +
    h(title) + ' · NomadUY</title><style>body{font:16px/1.5 system-ui;background:#f0f5fb;color:#0d1f3c;margin:0}main{max-width:640px;margin:24px auto;padding:24px;background:white;border-radius:16px}label{display:grid;gap:4px;margin:12px 0}input,textarea,select,button{font:inherit;padding:8px;box-sizing:border-box}button{margin:6px 10px 0 0;cursor:pointer}</style><main><p>NomadUY · Recomendaciones</p><h1>' +
    h(title) + '</h1>' + content + '</main></html>', {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, private',
      'Referrer-Policy': 'no-referrer',
      'X-Robots-Tag': 'noindex, nofollow',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    },
  })
}

function select(name: string, values: readonly string[], current: string) {
  return '<select name="' + name + '">' + values.map(value =>
    '<option' + (value === current ? ' selected' : '') + '>' + h(value) + '</option>').join('') + '</select>'
}

async function getDraft(id: string) {
  const result = await database.fetch<Draft | null>('*[_id == $id][0]', { id: 'drafts.' + id }, { cache: 'no-store' })
  return result?._type === recommendationType ? result : null
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id') ?? ''
  const key = url.searchParams.get('key') ?? ''
  if (!validSignature(id, key)) return page('Enlace inválido', '<p>Usá el enlace que recibiste por correo.</p>', 403)
  try {
    const draft = await getDraft(id)
    if (!draft) return page('Sugerencia ya procesada', '<p>Esta sugerencia ya no está pendiente.</p>', 404)
    return page('Revisar sugerencia',
      '<p>Revisá el enlace y el texto antes de publicar.</p><form method="post" action="' + h(new URL(reviewUrl).pathname) + '">' +
      '<input type="hidden" name="id" value="' + h(id) + '"><input type="hidden" name="key" value="' + h(key) + '">' +
      '<label>Nombre<input name="title" maxlength="100" required value="' + h(draft.title) + '"></label>' +
      '<label>Localidad<input name="town" maxlength="80" required value="' + h(draft.town) + '"></label>' +
      '<label>Departamento' + select('region', departments, draft.region) + '</label>' +
      '<label>Categoría' + select('kind', categories, draft.kind) + '</label>' +
      '<label>Descripción<textarea name="description" rows="5" maxlength="650" required>' + h(draft.description) + '</textarea></label>' +
      '<label>Enlace<input type="url" name="href" maxlength="500" value="' + h(draft.href ?? '') + '"></label>' +
      '<button name="action" value="approve">Aprobar y publicar</button><button name="action" value="reject" formnovalidate>Descartar</button></form>')
  } catch {
    return page('No se pudo cargar', '<p>Probá abrir el enlace más tarde.</p>', 503)
  }
}

export async function POST(request: Request) {
  if (Number(request.headers.get('content-length')) > 12_000) return page('Envío inválido', '', 413)
  let form: FormData
  try { form = await request.formData() } catch { return page('Envío inválido', '', 400) }
  const id = String(form.get('id') ?? '')
  const key = String(form.get('key') ?? '')
  const action = form.get('action')
  if (!validSignature(id, key)) return page('Enlace inválido', '', 403)
  if (action !== 'approve' && action !== 'reject') return page('Acción inválida', '', 400)
  const suggestion = action === 'approve' ? recommendationFields(form) : null
  if (action === 'approve' && !suggestion) return page('Revisá los campos', '<p>Volvé a la página anterior para corregirlos.</p>', 400)

  try {
    const draft = await getDraft(id)
    if (!draft) return page('Sugerencia ya procesada', '<p>Esta sugerencia ya no está pendiente.</p>', 409)
    const transaction = database.transaction()
      .patch(draft._id, patch => patch.ifRevisionId(draft._rev).set({ moderated: true }))
    if (suggestion) transaction.create({
      _id: id, _type: recommendationType, ...suggestion, publishedAt: new Date().toISOString(),
    })
    await transaction.delete(draft._id).commit({ visibility: 'sync' })
    return suggestion
      ? page('Recomendación publicada', '<p><a href="https://www.nomad.com.uy/comunidad#recomendado">Ver Recomendado por la comunidad</a></p>')
      : page('Sugerencia descartada', '<p>La sugerencia no aparecerá en el sitio.</p>')
  } catch {
    return page('No se pudo completar', '<p>Volvé a abrir el enlace del correo para verificar el estado.</p>', 503)
  }
}
