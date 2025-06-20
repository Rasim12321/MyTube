'use client'

import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Heading } from '@/components/ui/Heading'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { VideoItem } from '@/components/ui/VideoItem'

import { videoService } from '@/services/video'

export default function SearchData() {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('term')

  const { data, isLoading } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: () => videoService.getAll(searchTerm),
  })

  return (
    <section>
      <Heading isH1 icon={Search} text={<>Search &quot;{searchTerm}&quot;</>}></Heading>
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
