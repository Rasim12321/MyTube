'use client'

import { CirclePlay } from 'lucide-react'

import { Heading } from '@/components/ui/Heading'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { VideoItem } from '@/components/ui/VideoItem'

import { useProfile } from '@/hooks/useProfile'

export default function SubscriptionsPage() {
  const { profile, isLoading } = useProfile()

  return (
    <section>
      <Heading isPageHeading icon={CirclePlay} text='Subscriptions' />
      <div className='grid grid-cols-6 gap-6'>
        {isLoading ? (
          <SkeletonLoader count={6} className='h-36 rounded-md' />
        ) : profile?.subscribedVideos?.length ? (
          profile?.subscribedVideos?.map((video) => <VideoItem key={video.id} video={video} />)
        ) : (
          <p>Subscriptions not found!</p>
        )}
      </div>
    </section>
  )
}
