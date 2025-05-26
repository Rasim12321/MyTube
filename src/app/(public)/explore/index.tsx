'use client'

import { videoService } from '@/services/video'
import { Heading } from '@components/ui/Heading'
import { SkeletonLoader } from '@components/ui/SkeletonLoader'
import { VideoItem } from '@components/ui/VideoItem'
import { useQuery } from '@tanstack/react-query'
import { Compass } from 'lucide-react'

export default function Explore() {
  const { data, isLoading } = useQuery({
    queryKey: ['explore'],
    queryFn: () => videoService.getExploreVideos(),
  })

  return (
    <section className='mt-8'>
      <Heading icon={Compass}>Explore</Heading>
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
