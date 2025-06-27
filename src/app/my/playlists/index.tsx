'use client'

import { ListVideo } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Button } from '@/components/ui/Button'

import { CreatePlaylist } from '@/app/my/playlists/components/CreatePlaylist'
import { PlaylistItem } from '@/app/my/playlists/components/PlaylistItem'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { useOutside } from '@/hooks/useOutside'
import { useUserPlaylists } from '@/hooks/useUserPlaylists'

export const DynamicPlaylists = dynamic(async () => Playlists, {
  ssr: false,
  loading: () => (
    <div className='mt-20 grid grid-cols-5 gap-6'>
      <SkeletonLoader count={3} className='mb-6 h-42 rounded-md' />
    </div>
  ),
})

export function Playlists() {
  const { isShow, ref, setIsShow } = useOutside(false)

  const { data, isLoading, refetch } = useUserPlaylists()

  return (
    <section>
      <div className='mb-10 flex items-center justify-between'>
        <Heading isPageHeading icon={ListVideo} className='mb-0' text='Playlists' />

        <Button variant='secondary' onClick={() => setIsShow(true)}>
          Create a playlist
        </Button>
      </div>
      <div className='grid grid-cols-5 gap-6'>
        {isLoading ? (
          <SkeletonLoader count={3} className='mb-6 h-42 rounded-md' />
        ) : data?.length ? (
          data?.map((playlist) => <PlaylistItem key={playlist.id} playlist={playlist} />)
        ) : (
          <p>Playlists not found!</p>
        )}
      </div>

      {isShow && <CreatePlaylist refetch={refetch} onClose={() => setIsShow(false)} ref={ref} />}
    </section>
  )
}
