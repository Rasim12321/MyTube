'use client'

import clsx from 'clsx'
import { useState } from 'react'

import { Comments } from '@/components/sections/video/Comments'
import SimilarVideos from '@/components/sections/video/SimilarVideos'
import { VideoActions } from '@/components/sections/video/VideoActions'
import { VideoChannel } from '@/components/sections/video/VideoChannel'
import { VideoDescription } from '@/components/sections/video/VideoDescription'
import { Heading } from '@/components/ui/Heading'
import { VideoPlayer } from '@/components/ui/VideoPlayer'

import type { ISingleVideoResponse } from '@/types/video'

interface Props {
  video: ISingleVideoResponse
}

export default function SingleVideo({ video }: Props) {
  const [isTheaterMode, setIsTheaterMode] = useState(false)

  const SimilarVideosSection = video.similarVideos.length > 0 && (
    <div>
      <SimilarVideos videos={video.similarVideos} />
    </div>
  )

  return (
    <section
      className={clsx(
        'relative grid gap-20',
        isTheaterMode ? 'grid-cols-1' : 'grid-cols-[3fr_.8fr]'
      )}
    >
      <div>
        <VideoPlayer
          fileName={video.videoFileName}
          toggleTheaterMode={() => {
            setIsTheaterMode(!isTheaterMode)
          }}
          maxResolution={video.maxResolution}
        />

        <div className='flex gap-20'>
          <div>
            <div className='border-border mb-6 flex items-start justify-between border-b pb-6'>
              <div>
                <Heading className='mb-1' isH1 classNameHeading='text-xl' text={video.title} />
                <div className='text-gray-400'>
                  {video.viewsCount.toLocaleString('ru-RU')} views
                </div>
              </div>
              <VideoActions video={video} />
            </div>
            <VideoChannel video={video} />

            <VideoDescription description={video.description} />
            <Comments video={video} />
          </div>
          {isTheaterMode && SimilarVideosSection}
        </div>
      </div>

      {!isTheaterMode && SimilarVideosSection}
    </section>
  )
}
