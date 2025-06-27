import type { Metadata } from 'next'

import { DynamicLikedVideosPage } from '@/app/my/liked-videos'

import { NO_INDEX_PAGE } from '@/constants/seo'

export const metadata: Metadata = {
  title: 'Liked videos',
  ...NO_INDEX_PAGE,
}

export default function Page() {
  return <DynamicLikedVideosPage />
}
