import { useMutation } from '@tanstack/react-query'
import { Check, ListVideo } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import Link from 'next/link'

import { useOutside } from '@/hooks/useOutside'
import { useUserPlaylists } from '@/hooks/useUserPlaylists'

import { playlistService } from '@/services/playlist'

import { PAGE } from '@/config/public-page'

import type { ISingleVideoResponse } from '@/types/video'

interface Props {
  video: ISingleVideoResponse
}

export function SaveToPlaylist({ video }: Props) {
  const { data, refetch: refetchPlaylists } = useUserPlaylists()

  const { isShow, ref, setIsShow } = useOutside(false)

  const { mutate: togglePlaylist, isPending } = useMutation({
    mutationKey: ['toggle video'],
    mutationFn: (playlistId: string) => playlistService.toggleVideoInPlaylist(playlistId, video.id),
    async onSuccess() {
      const { toast } = await import('react-hot-toast')
      toast.success('Successfully changed!', {
        id: 'playlist',
      })
      setIsShow(false)
      refetchPlaylists()
    },
  })

  return (
    <div className='relative z-10' ref={ref}>
      <button
        onClick={() => setIsShow(!isShow)}
        className='flex items-center gap-1 opacity-80 transition-opacity hover:opacity-100'
      >
        <ListVideo size={22} />
        Save
      </button>
      <AnimatePresence>
        {isShow && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <ul className='absolute right-0 bottom-8 w-max max-w-55 rounded bg-gray-800 px-3 py-2 shadow'>
              {!data?.length && (
                <Link href={PAGE.PLAYLISTS()} className='hover:text-primary text-sm'>
                  Create your first playlist
                </Link>
              )}
              {data?.map((playlist) => (
                <li key={playlist.id} className='mb-1 text-sm'>
                  <button
                    onClick={() => {
                      togglePlaylist(playlist.id)
                    }}
                    className={
                      'hover:text-primary flex items-center gap-1 border-b border-b-transparent transition-colors'
                    }
                    disabled={isPending}
                  >
                    {playlist.videos.some((v) => v.id === video.id) && <Check size={16} />}{' '}
                    {playlist.title}
                  </button>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
