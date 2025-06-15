'use client'

import { Heart } from 'lucide-react'

import { VideoItem } from '@/components/ui/VideoItem'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { useProfile } from '@/hooks/useProfile'

export default function SubscriptionsPage() {
  const { profile, isLoading } = useProfile()

  return (
    <section>
      <Heading isPageHeading icon={Heart} text='Subscriptions' />
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
