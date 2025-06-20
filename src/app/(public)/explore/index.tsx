'use client'

import { useQuery } from '@tanstack/react-query'
import { Compass } from 'lucide-react'

import { Heading } from '@/components/ui/Heading'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { VideoItem } from '@/components/ui/VideoItem'

import { videoService } from '@/services/video'

export default function Explore() {
  const { data, isLoading } = useQuery({
    queryKey: ['explore'],
    queryFn: () => videoService.getExploreVideos(),
  })

  return (
    <section className='mt-8'>
      <Heading icon={Compass} text='Explore' />
      <div className='grid-6-cols'>
        {isLoading ? (
          <SkeletonLoader count={6} className='h-24 rounded-md' />
        ) : data?.videos.length ? (
          data.videos.map((video) => <VideoItem key={video.id} video={video} />)
        ) : (
          <div className='text-nowrap'>Explore are temporary unavailable</div>
        )}
      </div>
    </section>
  )
}
