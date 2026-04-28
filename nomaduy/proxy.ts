import { type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const handle = createMiddleware(routing)

export function proxy(request: NextRequest) {
  return handle(request)
}

export const config = {
  matcher: [
    // Match all paths except API, studio, static files, and Next.js internals
    '/((?!api|studio|_next|_vercel|.*\\..*).*)',
  ],
}
