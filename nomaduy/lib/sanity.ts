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

// Locale-aware field projection helper (inline in GROQ via select + coalesce)
// Usage: localeField('title', '$locale') → select($locale == "en" => coalesce(title_en, title), ...)

// GROQ: all guide cards for the grid, ordered
export const guidesQuery = `
  *[_type == "guide"] | order(order asc, _createdAt asc) {
    _id,
    "title": select(
      $locale == "en" => coalesce(title_en, title),
      $locale == "pt" => coalesce(title_pt, title),
      title
    ),
    slug,
    status,
    featured,
    order,
    icon,
    category,
    tags,
    "summary": select(
      $locale == "en" => coalesce(summary_en, summary),
      $locale == "pt" => coalesce(summary_pt, summary),
      summary
    ),
    readTime,
    persona,
    coverImage,
  }
`

// GROQ: single guide by slug (full content for the detail page)
export const guideBySlugQuery = `
  *[_type == "guide" && slug.current == $slug][0] {
    _id,
    "title": select(
      $locale == "en" => coalesce(title_en, title),
      $locale == "pt" => coalesce(title_pt, title),
      title
    ),
    slug,
    status,
    featured,
    icon,
    category,
    tags,
    "summary": select(
      $locale == "en" => coalesce(summary_en, summary),
      $locale == "pt" => coalesce(summary_pt, summary),
      summary
    ),
    readTime,
    persona,
    coverImage,
    "body": select(
      $locale == "en" => coalesce(body_en, body),
      $locale == "pt" => coalesce(body_pt, body),
      body
    ),
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
    "title": select(
      $locale == "en" => coalesce(title_en, title),
      $locale == "pt" => coalesce(title_pt, title),
      title
    ),
    slug,
    region,
    "tagline": select(
      $locale == "en" => coalesce(tagline_en, tagline),
      $locale == "pt" => coalesce(tagline_pt, tagline),
      tagline
    ),
    placeholderGradient,
    "photos": photos[] { "url": asset->url, alt },
    costOfLiving,
    urbanRural,
    population,
    "facts": select(
      $locale == "en" => coalesce(facts_en, facts),
      $locale == "pt" => coalesce(facts_pt, facts),
      facts
    ),
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
    "title": select(
      $locale == "en" => coalesce(title_en, title),
      $locale == "pt" => coalesce(title_pt, title),
      title
    ),
    slug,
    "duration": select(
      $locale == "en" => coalesce(duration_en, duration),
      $locale == "pt" => coalesce(duration_pt, duration),
      duration
    ),
    distance,
    "vibe": select(
      $locale == "en" => coalesce(vibe_en, vibe),
      $locale == "pt" => coalesce(vibe_pt, vibe),
      vibe
    ),
    "interestLabel": select(
      $locale == "en" => coalesce(interestLabel_en, interestLabel),
      $locale == "pt" => coalesce(interestLabel_pt, interestLabel),
      interestLabel
    ),
    "teaser": select(
      $locale == "en" => coalesce(teaser_en, teaser),
      $locale == "pt" => coalesce(teaser_pt, teaser),
      teaser
    ),
    "stops": select(
      $locale == "en" => coalesce(stops_en, stops),
      $locale == "pt" => coalesce(stops_pt, stops),
      stops
    ),
    "coverImage": coverImage { "url": asset->url, "alt": alt },
    "photos": photos[] { "url": asset->url, "alt": alt },
    "itinerary": select(
      $locale == "en" => coalesce(itinerary_en, itinerary),
      $locale == "pt" => coalesce(itinerary_pt, itinerary),
      itinerary
    ),
    "stayLinks": select(
      $locale == "en" => coalesce(stayLinks_en, stayLinks),
      $locale == "pt" => coalesce(stayLinks_pt, stayLinks),
      stayLinks
    ),
    "doLinks": select(
      $locale == "en" => coalesce(doLinks_en, doLinks),
      $locale == "pt" => coalesce(doLinks_pt, doLinks),
      doLinks
    ),
    "eatLinks": select(
      $locale == "en" => coalesce(eatLinks_en, eatLinks),
      $locale == "pt" => coalesce(eatLinks_pt, eatLinks),
      eatLinks
    ),
  }
`

// GROQ: top 3 guides by order for homepage FeaturedGuides
export const featuredGuidesQuery = `
  *[_type == "guide" && status == "ready"] | order(order asc) [0..2] {
    _id,
    "title": select(
      $locale == "en" => coalesce(title_en, title),
      $locale == "pt" => coalesce(title_pt, title),
      title
    ),
    slug,
    "summary": select(
      $locale == "en" => coalesce(summary_en, summary),
      $locale == "pt" => coalesce(summary_pt, summary),
      summary
    ),
    tags,
    category,
    icon,
    coverImage,
  }
`
