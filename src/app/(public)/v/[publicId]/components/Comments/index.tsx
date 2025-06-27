'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import AddCommentsForm from '@/app/(public)/v/[publicId]/components/Comments/AddCommentsForm'

import { commentService } from '@/services/comment'

import type { ISingleVideoResponse } from '@/types/video'

import { CommentItem } from './Item'

const DynamicAddCommentsForm = dynamic(async () => AddCommentsForm, {
  ssr: false,
  loading: () => (
    <div className='grid grid-cols-[7fr_1fr] gap-14'>
      <SkeletonLoader className='mb-5.5 h-10.5 grow rounded-md' />
      <SkeletonLoader className='mb-5.5 h-10.5 grow rounded-md' />
    </div>
  ),
})

interface Props {
  video: ISingleVideoResponse
}

export function Comments({ video }: Props) {
  const { data, refetch } = useQuery({
    queryKey: ['comments', video.id],
    queryFn: () => commentService.byVideoPublicId(video.publicId),
    initialData: video.comments,
  })

  return (
    <>
      <DynamicAddCommentsForm videoId={video.id} refetch={refetch} />

      {!!data &&
        data.map((comment) => <CommentItem key={comment.id} comment={comment} refetch={refetch} />)}
    </>
  )
}
