import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Non-default locales that use a URL prefix (/en/..., /pt/...)
const prefixedLocales = ['en', 'pt']
const defaultLocale = 'es'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if URL already has a non-default locale prefix
  const localeInPath = prefixedLocales.find(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  )

  if (localeInPath) {
    // Pass through — App Router [locale] segment handles it
    return NextResponse.next()
  }

  // No locale prefix → default locale (es). Rewrite internally to /es{pathname}
  // so App Router matches [locale]=es. The user-visible URL stays unchanged.
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)',],
}
