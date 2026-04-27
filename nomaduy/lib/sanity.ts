import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  options?: { revalidate?: number }
): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {}, {
    next: { revalidate: options?.revalidate ?? 3600 },
  })
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
    coverImage,
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

// GROQ: all places for the vivir page matcher
export const placesQuery = `
  *[_type == "place"] | order(title asc) {
    _id,
    title,
    slug,
    region,
    tagline,
    placeholderGradient,
    "photos": photos[] { "url": asset->url, alt },
    costOfLiving,
    urbanRural,
    population,
    facts,
    "links": links[] {
      label,
      category,
      url,
      "logo": logo { "url": asset->url }
    }
  }
`

// GROQ: all rutas for the conocer page
export const rutasQuery = `
  *[_type == "ruta"] | order(_createdAt asc) {
    _id,
    title,
    slug,
    duration,
    distance,
    vibe,
    interestLabel,
    teaser,
    stops,
    "coverImage": coverImage { "url": asset->url, "alt": alt },
    "photos": photos[] { "url": asset->url, "alt": alt },
    itinerary,
    stayLinks,
    doLinks,
    eatLinks,
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
