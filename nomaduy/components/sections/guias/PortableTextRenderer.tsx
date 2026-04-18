import { PortableText } from '@portabletext/react'
import type {
  PortableTextBlock,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity-url'

type CalloutBlock = {
  _type: 'callout'
  type: 'blue' | 'green' | 'gold'
  title?: string
  body?: string
}

type ImageBlock = {
  _type: 'image'
  asset: { _ref: string }
  alt?: string
  caption?: string
}

type LinkMark = {
  _type: 'link'
  href: string
  blank?: boolean
}

const components = {
  types: {
    image: ({ value }: { value: ImageBlock }) => (
      <figure className="guide-image">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt ?? ''}
          width={800}
          height={450}
          style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)' }}
        />
        {value.caption && <figcaption className="guide-image-caption">{value.caption}</figcaption>}
      </figure>
    ),
    callout: ({ value }: { value: CalloutBlock }) => (
      <div className={`info-box ${value.type}`}>
        {value.title && <strong>{value.title}</strong>}
        {value.body && <p>{value.body}</p>}
      </div>
    ),
  },
  marks: {
    link: ({ value, children }: PortableTextMarkComponentProps<LinkMark>) => (
      <a
        href={value?.href ?? '#'}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children }: PortableTextMarkComponentProps) => <code>{children}</code>,
  },
  block: {
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <h2 className="guide-h2">{children}</h2>,
    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <h3 className="guide-h3">{children}</h3>,
    h4: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <h4 className="guide-h4">{children}</h4>,
    blockquote: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <blockquote className="guide-blockquote">{children}</blockquote>
    ),
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="guide-list">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="guide-list guide-list-ordered">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <li>{children}</li>,
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <li>{children}</li>,
  },
}

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="portable-text">
      <PortableText value={value} components={components} />
    </div>
  )
}
