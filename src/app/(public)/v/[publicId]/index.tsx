'use client'

import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { VideoPlayer } from '@/components/sections/VideoPlayer'
import { Heading } from '@/components/ui/Heading'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import { Comments } from '@/app/(public)/v/[publicId]/components/Comments'
import SimilarVideos from '@/app/(public)/v/[publicId]/components/SimilarVideos'
import { VideoActions } from '@/app/(public)/v/[publicId]/components/VideoActions'
import { VideoChannel } from '@/app/(public)/v/[publicId]/components/VideoChannel'
import { VideoDescription } from '@/app/(public)/v/[publicId]/components/VideoDescription'
import { useUpdateViews } from '@/app/(public)/v/[publicId]/hooks'

import type { ISingleVideoResponse } from '@/types/video'

interface Props {
  video: ISingleVideoResponse
}

export const DynamicComments = dynamic(async () => Comments, {
  // ssr: false,
  loading: () => <SkeletonLoader count={3} className='mb-8 h-14 rounded-md' />,
})

export default function SingleVideo({ video }: Props) {
  const [isTheaterMode, setIsTheaterMode] = useState(false)

  useUpdateViews({ video })

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
          <div className='w-full'>
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

            <DynamicComments video={video} />
          </div>
          {isTheaterMode && SimilarVideosSection}
        </div>
      </div>

      {!isTheaterMode && SimilarVideosSection}
    </section>
  )
}
