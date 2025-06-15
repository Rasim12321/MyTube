import { Video } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { VideoItem } from '@/ui/VideoItem'

import type { IChannel } from '@/types/channel'

export default async function ChanelVideos({ videos }: { videos: IChannel['videos'] }) {
  return (
    <section>
      <Heading icon={Video} text='Videos' />
      <div className='grid-6-cols'>
        {videos.map((video) => (
          <VideoItem key={video.id} video={video} />
        ))}
      </div>
    </section>
  )
}
