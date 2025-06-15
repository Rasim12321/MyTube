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
}

export function VideoItem({ video, icon: Icon }: Props) {
  return (
    <m.div
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      className='max-w-[250px]'
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <div className='relative mb-1.5'>
        <Link href={PAGE.VIDEO(video.slug)}>
          <Image
            alt={video.title}
            src={video.thumbnailUrl}
            width={250}
            height={140}
            className='rounded-md'
            priority
          />
        </Link>
        <Link href={PAGE.CHANNEL(video.channel.slug)} className='absolute left-1.5 bottom-2'>
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
          <span className='text-gray-400 text-sm'>{transformCount(video.viewsCount)}</span>
        </div>
        <div>
          <span className='text-gray-400 text-xs'>{transformDate(video.createdAt)}</span>
        </div>
      </div>
      <div className='mb-1'>
        <Link href={PAGE.VIDEO(video.slug)} className='line-clamp-2 leading-tight'>
          {video.title}
        </Link>
      </div>
      <div>
        <Link href={PAGE.CHANNEL(video.channel.slug)} className='flex items-center gap-1'>
          <span className='text-gray-400 text-sm'>{video.channel.user.name}</span>
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
