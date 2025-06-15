import Auth from '@/app/auth'
import { NO_INDEX_PAGE } from 'constants/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth',
  ...NO_INDEX_PAGE,
}

export default function AuthPage() {
  return <Auth />
}
