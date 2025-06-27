import type { Metadata } from 'next'

import { DynamicHistoryPage } from '@/app/my/history'

import { NO_INDEX_PAGE } from '@/constants/seo'

export const metadata: Metadata = {
  title: 'History',
  ...NO_INDEX_PAGE,
}

export default function Page() {
  return <DynamicHistoryPage />
}
