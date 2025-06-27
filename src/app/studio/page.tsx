import type { Metadata } from 'next'

import { StudioPage } from '@/app/studio'

import { NO_INDEX_PAGE } from '@/constants/seo'

export const metadata: Metadata = {
  title: 'Studio',
  ...NO_INDEX_PAGE,
}

export default function Page() {
  return <StudioPage />
}
