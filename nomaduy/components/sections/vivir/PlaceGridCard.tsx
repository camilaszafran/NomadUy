'use client'

import type { Place } from '@/types/place'

type Props = {
  place: Place
  matchScore: number
  onClick: () => void
}

export default function PlaceGridCard({ place, matchScore, onClick }: Props) {
  const matchPct = Math.round((1 - matchScore / 12) * 100)

  return (
    <button className="place-grid-card" onClick={onClick}>
      <div
        className="place-grid-card-img"
        style={{ background: place.photos?.length
          ? undefined
          : place.placeholderGradient
        }}
      >
        {place.photos?.[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={place.photos[0].url} alt={place.title} />
        )}
        <div className="place-grid-card-overlay" />
        <span className="place-grid-match">{matchPct}% match</span>
      </div>
      <div className="place-grid-card-body">
        <span className="place-grid-region">{place.region}</span>
        <strong className="place-grid-title">{place.title}</strong>
        <p className="place-grid-tagline">{place.tagline}</p>
      </div>
    </button>
  )
}
