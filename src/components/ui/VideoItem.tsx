import { type LucideIcon } from 'lucide-react'
import * as m from 'motion/react-m'
import Image from 'next/image'
import Link from 'next/link'

import { VerifiedBadge } from '@/components/ui/VerifiedBadge'

import { transformDate } from '@/utils/transform-date'
import { transformCount } from '@/utils/transform-views'

import { PAGE } from '@/config/public-page'

import type { IVideo } from '@/types/video'

interface Props {
  video: IVideo
  icon?: LucideIcon
  isImagePriority?: boolean
}

export function VideoItem({ video, icon: Icon, isImagePriority }: Props) {
  return (
    <m.div
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      className='max-w-[306px]'
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <div className='relative mb-1.5'>
        <Link aria-label='Video' href={PAGE.VIDEO(video.publicId)}>
          <Image
            src={video.thumbnailUrl}
            width={306}
            height={172}
            alt={video.title}
            className='rounded-md'
            priority={isImagePriority}
            style={{
              aspectRatio: '16/9',
            }}
          />
        </Link>
        <Link
          aria-label='Channel'
          href={PAGE.CHANNEL(video.channel.slug)}
          className='absolute bottom-2 left-1.5'
        >
          <Image
            alt={video.channel.name || ''}
            src={video.channel.avatarUrl}
            width={35}
            height={35}
            className='rounded-full shadow'
          />
        </Link>
      </div>
      <div className='mb-1.5 flex items-center justify-between'>
        <div className='flex items-center gap-0.5'>
          {Icon && <Icon className='text-red-600' size={20} />}
          <span className='text-sm text-gray-400'>{transformCount(video.viewsCount)}</span>
        </div>
        <div>
          <span className='text-xs text-gray-400'>{transformDate(video.createdAt)}</span>
        </div>
      </div>
      <div className='mb-1'>
        <Link href={PAGE.VIDEO(video.publicId)} className='line-clamp-2 leading-tight'>
          {video.title}
        </Link>
      </div>
      <div>
        <Link href={PAGE.CHANNEL(video.channel.slug)} className='flex items-center gap-1'>
          <span className='text-sm text-gray-400'>{video.channel.user.name}</span>
          {video.channel.isVerified && (
            <span>
              <VerifiedBadge />
            </span>
          )}
        </Link>
      </div>
    </m.div>
  )
}
