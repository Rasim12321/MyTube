import { VideoItem } from '@/components/ui/VideoItem'

import type { ISingleVideoResponse } from '@/types/video'

export default function SimilarVideos({
  videos,
}: {
  videos: ISingleVideoResponse['similarVideos']
}) {
  return (
    <div className='grid-cols-1'>
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  )
}
