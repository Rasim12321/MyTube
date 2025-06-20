import Image from 'next/image'
import Link from 'next/link'

import { Heading } from '@/components/ui/Heading'
import DynamicSubscribeButton from '@/components/ui/SubscribeButton'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'

import { transformCount } from '@/utils/transform-views'

import { PAGE } from '@/config/public-page'

import type { ISingleVideoResponse } from '@/types/video'

export function VideoChannel({ video }: { video: ISingleVideoResponse }) {
  return (
    <div className='mb-6 flex items-center justify-between'>
      <div className='flex items-center gap-2.5'>
        <Link href={PAGE.CHANNEL(video.channel.slug)}>
          <Image
            alt={video.channel.user.name || ''}
            src={video.channel.avatarUrl}
            width={55}
            height={55}
            className='flex-shrink-0 rounded shadow'
            priority
          />
        </Link>
        <div>
          <Link href={PAGE.CHANNEL(video.channel.slug)}>
            <Heading
              className='mb-0'
              classNameHeading='text-lg'
              text={
                <span className='flex items-center gap-2'>
                  {video.channel.user.name}
                  {video.channel.isVerified && <VerifiedBadge size={14} />}
                </span>
              }
            />
          </Link>

          <div className='flex items-center gap-1 text-sm text-gray-400'>
            {transformCount(video.channel.subscribers.length)} subscribers
          </div>
        </div>
      </div>
      <DynamicSubscribeButton slug={video.channel.slug} />
    </div>
  )
}
