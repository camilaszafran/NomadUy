import { createHmac, timingSafeEqual } from 'node:crypto'
import { sanityClient } from '@/lib/sanity'
import { categories, departments, type Recommendation } from './recommendation-fields'

export const recommendationType = 'communityRecommendation'
export const reviewUrl = 'https://www.nomad.com.uy/api/recomendaciones/revisar'
export const database = sanityClient.withConfig({ perspective: 'raw', useCdn: false })
export const fields = 'title, region, kind, town, description, href'
const idPattern = /^nomad-recommendation-[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/

export function recommendationFields(data: FormData): Recommendation | null {
  const title = stringField(data, 'title', 100)
  const town = stringField(data, 'town', 80)
  const description = stringField(data, 'description', 650)
  const region = stringField(data, 'region', 30)
  const kind = stringField(data, 'kind', 30)
  const address = stringField(data, 'href', 500)
  if (!title || !town || !description || !departments.some(value => value === region)
    || !categories.some(value => value === kind) || address === null || !region || !kind) return null

  let href: string | undefined
  if (address) {
    try {
      const url = new URL(address)
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null
      href = url.toString()
    } catch { return null }
  }

  return { title, town, description, region, kind, ...(href ? { href } : {}) }
}

export function stringField(data: FormData, key: string, max: number) {
  const value = data.get(key) ?? ''
  return typeof value === 'string' && value.length <= max ? value.trim() : null
}

export function reviewSignature(id: string): string | null {
  const secret = process.env.NOMAD_REVIEW_SECRET || process.env.SANITY_API_TOKEN
  if (!secret || !idPattern.test(id)) return null
  return createHmac('sha256', secret).update('NomadUY:recommendation:' + id).digest('hex')
}

export function validSignature(id: string, signature: string) {
  const expected = reviewSignature(id)
  return expected && /^[\da-f]{64}$/.test(signature)
    && timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'))
}

export const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;')
