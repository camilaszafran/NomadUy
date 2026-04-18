export type PlaceLink = {
  label: string
  category: 'cafe' | 'coworking' | 'other'
  url: string
  logo?: { url: string } | null
}

export type Place = {
  _id: string
  title: string
  slug: { current: string }
  region: string
  tagline: string
  placeholderGradient: string
  photos?: Array<{ url: string; alt?: string }> | null
  costOfLiving: number
  urbanRural: number
  population: number
  facts?: unknown[] | null
  links?: PlaceLink[] | null
}
