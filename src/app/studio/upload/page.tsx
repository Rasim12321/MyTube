import type { Metadata } from 'next'

import { UploadVideoPage } from '@/app/studio/upload'

import { NO_INDEX_PAGE } from '@/constants/seo'

export const metadata: Metadata = {
  title: 'UploadVideo',
  ...NO_INDEX_PAGE,
}

export default function Page() {
  return <UploadVideoPage />
}
