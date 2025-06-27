import { protectLoginPages } from '@/server-actions/protect-login.middleware'
import { protectStudio } from '@/server-actions/protect-studio.middleware'
import type { NextRequest } from 'next/server'

import { PAGE } from '@/config/public-page'

import { STUDIO_PAGE } from './config/studio-page'

export async function middleware(request: NextRequest) {
  const url = new URL(request.url)
  const pathname = url.pathname
  if (pathname.includes(STUDIO_PAGE.HOME) || pathname.includes('/my')) {
    return protectStudio(request)
  }

  if (pathname.includes(PAGE.AUTH)) {
    return protectLoginPages(request)
  }
}

export const config = {
  matcher: ['/studio/:path*', '/auth/:path*', '/my/:path*'],
}
