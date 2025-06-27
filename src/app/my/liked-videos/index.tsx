'use client'

import { Heart } from 'lucide-react'
import dynamic from 'next/dynamic'

import { HorizontalVideoItem } from '@/components/ui/HorizontalVideoItem'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { useProfile } from '@/hooks/useProfile'

export const DynamicLikedVideosPage = dynamic(async () => LikedVideosPage, {
  ssr: false,
  loading: () => (
    <div className='mt-20 w-1/2'>
      <SkeletonLoader count={3} className='mb-6 h-28 rounded-md' />
    </div>
  ),
})

function LikedVideosPage() {
  const { profile, isLoading } = useProfile()

  return (
    <section className='w-3/5'>
      <div className='mb-10 flex items-center gap-10'>
        <Heading isPageHeading icon={Heart} className='mb-0' text='Liked videos' />
        {!!profile?.likes.length && <span>{profile.likes.length} videos</span>}
      </div>
      <div>
        {isLoading ? (
          <SkeletonLoader count={3} className='mb-6 h-28 rounded-md' />
        ) : profile?.likes?.length ? (
          profile?.likes?.map((like) => (
            <HorizontalVideoItem key={like.video.id} video={like.video} />
          ))
        ) : (
          <p>Liked videos not found!</p>
        )}
      </div>
    </section>
  )
}
