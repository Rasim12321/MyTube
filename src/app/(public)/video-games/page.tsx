import { Gamepad2 } from 'lucide-react'
import type { Metadata } from 'next'

import { Heading } from '@/ui/Heading'
import { VideoItem } from '@/ui/VideoItem'

import { videoService } from '@/services/video'

import { PAGE } from '@/config/public-page'

export const revalidate = 100
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Video games',
  description: 'Best video games videos',
  alternates: {
    canonical: PAGE.VIDEO_GAMES,
  },
  openGraph: {
    type: 'website',
    url: PAGE.VIDEO_GAMES,
    title: 'Video games',
  },
}

export default async function VideoGamesPage() {
  const videos = (await videoService.getVideoGames()).videos

  return (
    <section>
      <Heading icon={Gamepad2} text='Video games' />
      <div className='grid-6-cols'>
        {videos?.length ? (
          videos.map((video) => <VideoItem key={video.id} video={video} />)
        ) : (
          <div className='text-nowrap'>Video games are temporary unavailable</div>
        )}
      </div>
    </section>
  )
}
