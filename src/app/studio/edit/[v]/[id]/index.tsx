'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Edit } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import VideoForm from '@/components/sections/VideoForm'
import { Button } from '@/components/ui/Button'

import { Heading } from '@/ui/Heading'

import { studioVideoService } from '@/services/studio-video'

import { STUDIO_PAGE } from '@/config/studio-page'

import type { IVideoFormData } from '@/types/studio-video'

export function EditVideoPage() {
  const { id } = useParams()
  const router = useRouter()

  const form = useForm<IVideoFormData>({
    mode: 'onChange',
  })

  const {
    data: initialVideo,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['get studio video', id],
    queryFn: () => studioVideoService.byId(id as string),
  })

  useEffect(() => {
    if (!isSuccess) return

    form.reset({
      title: initialVideo.title,
      description: initialVideo.description,
      maxResolution: initialVideo.maxResolution,
      thumbnailUrl: initialVideo.thumbnailUrl,
      tags: initialVideo.tags.map((tag) => tag.name),
      videoFileName: initialVideo.videoFileName,
    })
  }, [form, isSuccess, initialVideo])

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['edit a video'],
    mutationFn: (data: IVideoFormData) => studioVideoService.update(id as string, data),
    async onSuccess() {
      const { toast } = await import('react-hot-toast')
      queryClient.invalidateQueries({
        queryKey: ['studioVideoList'],
      })
      toast.success('Video successfully updated!')
      router.push(STUDIO_PAGE.HOME)
    },
    async onError() {
      const { toast } = await import('react-hot-toast')
      toast.error('Video updating has error!')
    },
  })

  const onSubmit: SubmitHandler<IVideoFormData> = (data) => {
    mutate(data)
  }

  return (
    <div className='mx-auto max-w-6xl'>
      <Heading icon={Edit} isPageHeading text='Edit video' />

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <VideoForm form={form} isPending={isLoading || isPending} />
        <div className='mt-4 text-right'>
          <Button type='submit' isLoading={isPending}>
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}
