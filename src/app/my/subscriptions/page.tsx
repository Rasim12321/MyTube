import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import { NO_INDEX_PAGE } from '@/constants/seo'

const DynamicSubscriptionsPage = dynamic(() => import('.'), {
  // ssr: false,
  loading: () => (
    <div className='grid grid-cols-6 gap-6'>
      <SkeletonLoader count={3} className='h-36 rounded-md' />
    </div>
  ),
})

export const metadata: Metadata = {
  title: 'Subscriptions',
  ...NO_INDEX_PAGE,
}

export default function Page() {
  return <DynamicSubscriptionsPage />
}
