import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo'

import { EditVideoPage } from '.'

export const metadata: Metadata = {
  title: 'Edit video',
  ...NO_INDEX_PAGE,
}

export default function Page() {
  return <EditVideoPage />
}
