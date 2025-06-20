import { Flame } from 'lucide-react'
import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { VideoItem } from '@/components/ui/VideoItem'

import { videoService } from '@/services/video'

import { PAGE } from '@/config/public-page'

export const revalidate = 100
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Trending',
  description: 'Best trending videos',
  alternates: {
    canonical: PAGE.TRENDING,
  },
  openGraph: {
    type: 'website',
    url: PAGE.TRENDING,
    title: 'Trending',
  },
}

export default async function TrendingPage() {
  const videos = await videoService.getTrendingVideos()

  return (
    <section>
      <Heading icon={Flame} text='Trending' />
      <div className='grid-6-cols'>
        {videos?.length ? (
          videos.map((video) => <VideoItem key={video.id} video={video} icon={Flame} />)
        ) : (
          <div className='text-nowrap'>Trends are temporary unavailable</div>
        )}
      </div>
    </section>
  )
}
