import { getTokensFromRequest } from '@/server-actions/middlewares/utils/get-tokens-from-request'
import { jwtVerifyServer } from '@/server-actions/middlewares/utils/jwt-verify'
import { redirectToLogin } from '@/server-actions/middlewares/utils/redirect-to-login'
import { type NextRequest, NextResponse } from 'next/server'

export async function protectStudio(request: NextRequest) {
  const tokens = await getTokensFromRequest(request)
  if (!tokens) return redirectToLogin(request)

  const verifiedData = await jwtVerifyServer(tokens.accessToken)
  if (!verifiedData) return redirectToLogin(request)

  return NextResponse.next()
}
