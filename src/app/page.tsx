import { videoService } from '@/services/video'
import { Heading } from '@components/ui/Heading'
import { VideoItem } from '@components/ui/VideoItem'
import { Flame } from 'lucide-react'
import type { Metadata } from 'next'

import Explore from './(public)/explore'

export const revalidate = 100
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'MY TUBE',
  description: 'Best video platform',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'My Tube',
  },
}

export default async function Home() {
  const trendingVideos = await videoService.getTrendingVideos()

  return (
    <section>
      {trendingVideos?.length && (
        <section>
          <Heading icon={Flame}>Trending</Heading>
          <div className='grid-6-cols'>
            {trendingVideos.map((video) => (
              <VideoItem key={video.id} video={video} icon={Flame} />
            ))}
          </div>
          <Explore />
        </section>
      )}
    </section>
  )
}
