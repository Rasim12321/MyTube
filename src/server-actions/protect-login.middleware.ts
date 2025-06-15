import { getTokensFromRequest } from '@/server-actions/middlewares/utils/get-tokens-from-request'
import { jwtVerifyServer } from '@/server-actions/middlewares/utils/jwt-verify'
import { nextRedirect } from '@/server-actions/middlewares/utils/next-redirect'
import { type NextRequest, NextResponse } from 'next/server'

import { STUDIO_PAGE } from '@/config/studio-page'

export async function protectLoginPages(request: NextRequest) {
  const tokens = await getTokensFromRequest(request)
  if (!tokens) return NextResponse.next()

  const verifiedData = await jwtVerifyServer(tokens.accessToken)
  if (!verifiedData) return NextResponse.next()

  return nextRedirect(STUDIO_PAGE.HOME, request.url)
}
