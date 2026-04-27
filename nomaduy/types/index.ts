import type { PortableTextBlock } from '@portabletext/react'

// Shared TypeScript types for NomadUY

export type Persona = 'nomad' | 'expat' | 'immigrant'

export type MembershipTier = 'free' | 'premium'

export type GuideStatus = 'ready' | 'progress' | 'soon'

export type GuideIcon =
  | 'airplane' | 'scales' | 'mapPin' | 'bus' | 'firstAid'
  | 'bank' | 'laptop' | 'usersThree' | 'chatTeardrop'
  | 'house' | 'heart' | 'map'

// Shape returned for guide cards (grid)
export type GuideCard = {
  _id: string
  title: string
  slug: { current: string }
  status: GuideStatus
  featured: boolean
  order: number
  icon: GuideIcon
  category: string
  tags: string[]
  summary: string
  readTime: number
  persona: Persona[]
  coverImage?: {
    asset: { _ref: string }
    alt?: string
  }
}

export type ItineraryDay = {
  _key: string
  day: string
  content: string
}

export type RouteLink = {
  _key: string
  label: string
  url: string
}

export type RutaPhoto = {
  url: string
  alt?: string
}

export type Ruta = {
  _id: string
  title: string
  slug: { current: string }
  duration: '1 día' | 'Fin de semana' | '4–7 días'
  distance?: string
  vibe?: string
  interestLabel?: string
  teaser?: string
  stops?: string[]
  coverImage?: RutaPhoto
  photos?: RutaPhoto[]
  itinerary?: ItineraryDay[]
  stayLinks?: RouteLink[]
  doLinks?: RouteLink[]
  eatLinks?: RouteLink[]
}

// Shape returned for full guide page
export type GuideDetail = GuideCard & {
  body: PortableTextBlock[]
  coverImage?: {
    asset: { _ref: string }
    alt?: string
  }
}
