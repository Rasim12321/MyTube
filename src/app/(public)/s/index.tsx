'use client'

import { videoService } from '@/services/video'
import { Heading } from '@components/ui/Heading'
import { SkeletonLoader } from '@components/ui/SkeletonLoader'
import { VideoItem } from '@components/ui/VideoItem'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function SearchData() {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('term')

  const { data, isLoading } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: () => videoService.getAllVideos(searchTerm),
  })

  return (
    <section>
      <Heading isH1 icon={Search}>
        Search &quot;{searchTerm}&quot;
      </Heading>
      <div className='grid-6-cols'>
        {isLoading ? (
          <SkeletonLoader count={6} className='h-24 rounded-md' />
        ) : data?.videos.length ? (
          data.videos.map((video) => <VideoItem key={video.id} video={video} />)
        ) : (
          'Videos not find'
        )}
      </div>
    </section>
  )
}
