import type { NextRequest } from 'next/server'

import { PAGE } from '@/config/public-page'

import { nextRedirect } from './next-redirect'

export const redirectToLogin = (request: NextRequest) => {
  return nextRedirect(PAGE.AUTH, request.url)
}
