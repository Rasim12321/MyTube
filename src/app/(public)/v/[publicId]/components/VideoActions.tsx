'use client'

import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { Heart } from 'lucide-react'
import { startTransition, useEffect, useState } from 'react'

import { SaveToPlaylist } from '@/app/(public)/v/[publicId]/components/SaveToPlaylist'

import { useProfile } from '@/hooks/useProfile'

import { transformCount } from '@/utils/transform-views'

import { userService } from '@/services/user'

import type { ISingleVideoResponse } from '@/types/video'

export function VideoActions({ video }: { video: ISingleVideoResponse }) {
  const { profile, refetch } = useProfile()

  const isLiked = profile?.likes.some((like) => like.videoId === video.id) || false

  const [isLikedLocal, setIsLikedLocal] = useState(isLiked)

  const [optimisticLike, setOptimisticLike] = useState<number>(video.likes.length)

  useEffect(() => {
    setIsLikedLocal(isLiked)
  }, [isLiked])

  const { mutate } = useMutation({
    mutationKey: ['like', video.id],
    mutationFn: () => userService.toggleLike(video.id),
    onMutate() {
      startTransition(() => {
        const newIsLiked = !isLikedLocal
        setIsLikedLocal(newIsLiked)
        setOptimisticLike((prevLikeCount) => {
          if (newIsLiked) return prevLikeCount + 1
          return prevLikeCount - 1
        })
      })
    },
    onError() {
      startTransition(() => {
        const revertedIsLiked = !isLikedLocal
        setIsLikedLocal(revertedIsLiked)
        setOptimisticLike((prevLikeCount) => {
          if (revertedIsLiked) return prevLikeCount + 1
          return prevLikeCount - 1
        })
      })
    },
    onSuccess() {
      refetch()
    },
  })

  return (
    <div className='flex items-center gap-7'>
      <SaveToPlaylist video={video} />

      <button
        className='text-primary flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100'
        onClick={() => mutate()}
      >
        <Heart
          size={22}
          className={clsx('transition', {
            'fill-[var(--color-primary)]': isLikedLocal || isLiked,
            'fill-transparent': !isLikedLocal || !isLiked,
          })}
        />{' '}
        {transformCount(optimisticLike)}
      </button>
    </div>
  )
}
