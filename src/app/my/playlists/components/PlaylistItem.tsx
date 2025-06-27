import * as m from 'motion/react-m'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page'

import type { IPlaylist } from '@/types/playlist'

interface Props {
  playlist: IPlaylist
}

export function PlaylistItem({ playlist }: Props) {
  console.log(playlist.videos[0]?.thumbnailUrl)
  return (
    <m.div
      whileHover={{
        scale: 1.01,
        y: -5,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      <div className='mb-6'>
        <Link href={PAGE.PLAYLISTS(playlist.id)} className='relative block max-w-[306px]'>
          <div className='absolute -top-3 left-[8.5%] h-full w-10/12 rounded-lg bg-[#666876] shadow-lg' />
          <div className='absolute -top-1.5 left-[4.1%] h-full w-11/12 rounded-lg bg-[#9294a1] shadow-lg' />
          <Image
            src={playlist.videos[0]?.thumbnailUrl || '/images/empty-bg.png'}
            width={306}
            height={172}
            alt={playlist.title}
            quality={100}
            priority
            className='relative rounded-lg shadow-lg'
          />
          <div className='absolute right-1.5 bottom-1.5 rounded bg-black/40 px-1.5 py-0.5 text-xs font-medium'>
            {playlist.videos.length} videos
          </div>
        </Link>

        <div className='mt-2 font-medium'>
          <Link href={PAGE.PLAYLISTS(playlist.id)} className='line-clamp-2 leading-[1.3]'>
            {playlist.title}
          </Link>
        </div>
      </div>
    </m.div>
  )
}
