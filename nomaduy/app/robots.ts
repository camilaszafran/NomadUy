import type { MetadataRoute } from 'next'
import { siteOrigin } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ['*', 'OAI-SearchBot'].map(userAgent => ({
      userAgent, allow: '/', disallow: ['/api/', '/studio', '/studio/'],
    })),
    sitemap: siteOrigin + '/sitemap.xml',
  }
}
