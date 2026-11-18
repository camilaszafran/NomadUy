import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const prefixedLocales = ['en', 'pt']
const defaultLocale = 'es'
const preferenceCookie = 'NEXT_LOCALE'

function remember(response: NextResponse, locale: string, request: NextRequest) {
  if (request.cookies.get(preferenceCookie)?.value !== locale) {
    response.cookies.set(preferenceCookie, locale, {
      path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', httpOnly: true,
      secure: request.nextUrl.protocol === 'https:',
    })
  }
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // The explicit Spanish selector clears a previous English/Portuguese preference.
  if (pathname === '/es' || pathname.startsWith('/es/')) {
    const canonical = request.nextUrl.clone()
    canonical.pathname = pathname.slice(3) || '/'
    const response = remember(NextResponse.redirect(canonical, 307), defaultLocale, request)
    response.headers.set('Cache-Control', 'private, no-store')
    return response
  }

  const localeInPath = prefixedLocales.find(
    loc => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  )
  if (localeInPath) return remember(NextResponse.next(), localeInPath, request)

  // Legacy and content-managed links without a prefix retain the visitor’s choice.
  const preferred = request.cookies.get(preferenceCookie)?.value
  if (preferred && prefixedLocales.includes(preferred)) {
    const destination = request.nextUrl.clone()
    destination.pathname = `/${preferred}${pathname === '/' ? '' : pathname}`
    const response = NextResponse.redirect(destination, 307)
    response.headers.set('Cache-Control', 'private, no-store')
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
}
