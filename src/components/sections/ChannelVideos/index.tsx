import { Video } from 'lucide-react'

import { Heading } from '@/components/ui/Heading'
import { VideoItem } from '@/components/ui/VideoItem'

import type { IChannel } from '@/types/channel'

export default async function ChannelVideos({ videos }: { videos: IChannel['videos'] }) {
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
