import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {})
}

// Image URL builder
const builder = createImageUrlBuilder(sanityClient)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ: all guide cards for the grid, ordered
export const guidesQuery = `
  *[_type == "guide"] | order(order asc, _createdAt asc) {
    _id,
    title,
    slug,
    status,
    featured,
    order,
    icon,
    category,
    tags,
    summary,
    readTime,
    persona,
  }
`

// GROQ: single guide by slug (full content for the detail page)
export const guideBySlugQuery = `
  *[_type == "guide" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    status,
    featured,
    icon,
    category,
    tags,
    summary,
    readTime,
    persona,
    coverImage,
    body,
  }
`

// GROQ: all slugs (for generateStaticParams)
export const guideSlugQuery = `
  *[_type == "guide" && status == "ready"] {
    "slug": slug.current
  }
`

// GROQ: top 3 guides by order for homepage FeaturedGuides
export const featuredGuidesQuery = `
  *[_type == "guide" && status == "ready"] | order(order asc) [0..2] {
    _id,
    title,
    slug,
    summary,
    tags,
    category,
    icon,
    coverImage,
  }
`
