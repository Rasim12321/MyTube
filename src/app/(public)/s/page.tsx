import { NO_INDEX_PAGE } from 'constants/seo'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import SearchData from '@/app/(public)/s'

export const metadata: Metadata = {
  title: '',
  ...NO_INDEX_PAGE,
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchData />
    </Suspense>
  )
}
