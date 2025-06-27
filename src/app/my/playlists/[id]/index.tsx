'use client'

import { useQuery } from '@tanstack/react-query'
import { ListVideo } from 'lucide-react'
import dynamic from 'next/dynamic'

import { VideoItem } from '@/components/ui/VideoItem'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { playlistService } from '@/services/playlist'

export const DynamicPlaylist = dynamic(async () => Playlist, {
  ssr: false,
  loading: () => (
    <div>
      <SkeletonLoader count={1} className='mb-6 h-10.5 w-100 rounded-md' />
      <div className='grid grid-cols-6 gap-6'>
        <SkeletonLoader count={3} className='h-28 rounded-md' />
      </div>
    </div>
  ),
})

export function Playlist({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['playlist', id],
    queryFn: () => playlistService.getPlaylistById(id as string),
    enabled: !!id,
  })

  return (
    <section>
      <Heading isPageHeading icon={ListVideo} text={data?.title} />

      <div className='grid grid-cols-6 gap-6'>
        {isLoading ? (
          <SkeletonLoader count={6} className='h-36 rounded-md' />
        ) : data?.videos?.length ? (
          data?.videos?.map((video) => <VideoItem key={video.id} video={video} />)
        ) : (
          <p>Videos in playlist not found!</p>
        )}
      </div>
    </section>
  )
}
