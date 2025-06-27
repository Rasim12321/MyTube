'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import type { Toast } from 'react-hot-toast'

import { studioVideoService } from '@/services/studio-video'

import { PAGE } from '@/config/public-page'
import { STUDIO_PAGE } from '@/config/studio-page'

import type { IVideo } from '@/types/video'

interface Props {
  video: IVideo
}

export function StudioActions({ video }: Props) {
  const queryClient = useQueryClient()

  const { mutate: deleteVideo, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete a video'],
    mutationFn: () => studioVideoService.delete(video.id),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['studioVideoList'],
      })
      const { toast } = await import('react-hot-toast')
      toast.success('Successfully deleted!')
    },
  })

  const handleDelete = async () => {
    const { toast } = await import('react-hot-toast')

    toast((t: Toast) => (
      <div>
        <p>Are you sure you want to delete this video?</p>
        <div className='mt-2 flex justify-end gap-4'>
          <button
            onClick={() => {
              deleteVideo()
              toast.dismiss(t.id)
            }}
            className='text-red-600'
          >
            Delete
          </button>
          <button onClick={() => toast.dismiss(t.id)} className='text-gray-400'>
            Cancel
          </button>
        </div>
      </div>
    ))
  }

  return (
    <div className='flex items-start justify-center gap-5'>
      <Link
        href={PAGE.VIDEO(video.publicId)}
        className='text-blue-600 opacity-70 transition-opacity hover:opacity-100'
        target='_blank'
        title='Open in a new tab'
      >
        <ExternalLink size={24} />
      </Link>
      <Link
        href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
        className='text-orange-500 opacity-70 transition-opacity hover:opacity-100'
        title='Edit a video'
      >
        <Edit size={24} />
      </Link>
      <button
        onClick={handleDelete}
        className='text-red-600 opacity-70 transition-opacity hover:opacity-100'
        title='Delete a video'
        disabled={isDeletePending}
      >
        <Trash2 size={24} />
      </button>
    </div>
  )
}
