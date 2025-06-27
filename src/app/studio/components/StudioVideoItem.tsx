import dayjs from 'dayjs'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'

import { processHtmlContent } from '@/utils/process-html-content'

import { PAGE } from '@/config/public-page'
import { STUDIO_PAGE } from '@/config/studio-page'

import type { IFullVideo } from '@/types/video'

import { StudioActions } from './StudioActions'

interface Props {
  video: IFullVideo
}

export function StudioVideoItem({ video }: Props) {
  const { initialContent } = processHtmlContent(video.description, 1)

  return (
    <div className='border-b-border mb-6 grid grid-cols-[.49fr_1.1fr_0.3fr_0.3fr_0.3fr_0.2fr_0.5fr] gap-6 border-b pb-6 last:border-none'>
      <Link href={PAGE.VIDEO(video.publicId)} target='_blank' className='flex-shrink-0'>
        <Image
          src={video.thumbnailUrl}
          width={206}
          height={116}
          alt={video.title}
          className='rounded-md'
        />
      </Link>

      <div>
        <Link href={STUDIO_PAGE.EDIT_VIDEO(video.id)} className='mb-1 line-clamp-1 text-lg'>
          {video.title}
        </Link>

        <div className='opacity-50'>{parse(initialContent)}</div>
      </div>

      <div>
        <div className='text-gray-400'>{dayjs(video.createdAt).format('DD MMM YYYY')}</div>
        <div className='text-gray-600'>Published</div>
      </div>

      <div>
        <div className='text-gray-400'>{video.viewsCount.toLocaleString('ru-RU')} views</div>
      </div>

      <div>
        <div className='text-gray-400'>
          {video.comments.length.toLocaleString('ru-RU')} comments
        </div>
      </div>

      <div>
        <div className='text-gray-400'>{video.likes.length.toLocaleString('ru-RU')} likes</div>
      </div>

      <StudioActions video={video} />
    </div>
  )
}
