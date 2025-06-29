'use client'

import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import * as m from 'motion/react-m'
import type { RefObject } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useHotkeys } from 'react-hotkeys-hook'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { InputField } from '@/components/ui/InputField'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import { playlistService } from '@/services/playlist'

import type { IPlaylistData } from '@/types/playlist'

interface Props {
  refetch: () => void
  onClose: () => void
  ref: RefObject<HTMLDivElement | null>
}

export function CreatePlaylist({ refetch, onClose, ref }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPlaylistData>({
    mode: 'onChange',
  })

  useHotkeys('esc', (e) => {
    e.preventDefault()
    onClose()
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['create a playlist'],
    mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
    async onSuccess() {
      refetch()
      reset()
      onClose()
      const { toast } = await import('react-hot-toast')
      toast.success('Playlist successfully created!')
    },
    async onError() {
      const { toast } = await import('react-hot-toast')
      toast.error('Playlist has error!')
    },
  })

  const onSubmit: SubmitHandler<IPlaylistData> = (data) => {
    mutate(data)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 50,
      }}
    >
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative',
          width: '26rem',
        }}
      >
        <div className='rounded-lg bg-gray-800 p-6' ref={ref}>
          <button
            onClick={onClose}
            className='absolute top-2 right-2 text-white'
            title='Close a modal'
          >
            <X />
          </button>
          <Heading classNameHeading='text-xl' text='Create a playlist' />
          <form onSubmit={handleSubmit(onSubmit)}>
            {isPending ? (
              <SkeletonLoader count={2} />
            ) : (
              <>
                <InputField
                  label='Title'
                  type='text'
                  registration={register('title', { required: 'Title is required!' })}
                  error={errors.title?.message}
                  placeholder='Enter title:'
                />
                <InputField
                  label='Video public id (from url)'
                  type='text'
                  registration={register('videoPublicId', {
                    // required: 'Video public id is required!',
                    minLength: {
                      value: 10,
                      message: 'Video public id must be exactly 10 characters!',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Video public id must be exactly 10 characters!',
                    },
                  })}
                  error={errors.videoPublicId?.message}
                  placeholder='Enter video public id:'
                />
              </>
            )}
            <div className='mt-4 text-center'>
              <Button type='submit' isLoading={isPending}>
                Create
              </Button>
            </div>
          </form>
        </div>
      </m.div>
    </div>
  )
}
