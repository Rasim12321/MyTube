'use client'

import { Video } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicStudioVideoList = dynamic(() => import('@/app/studio/components/StudioVideoList'), {
  ssr: false,
  loading: () => (
    <div>
      <SkeletonLoader count={3} className='mb-8 h-32 rounded-md' />
    </div>
  ),
})

export function StudioPage() {
  return (
    <section className='pb-5'>
      <Heading icon={Video} isPageHeading className='mb-8' text='Content' />
      <DynamicStudioVideoList />
    </section>
  )
}
