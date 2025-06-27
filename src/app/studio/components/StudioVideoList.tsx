'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { StudioVideoItem } from '@/app/studio/components/StudioVideoItem'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { useEffectScroll } from '@/hooks/useEffectScroll'

import { studioVideoService } from '@/services/studio-video'

export default function StudioVideoList() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['studioVideoList'],
    queryFn: ({ pageParam }) =>
      studioVideoService.getAll({
        page: pageParam.page,
        limit: 6,
      }),
    initialPageParam: { page: 1 },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage

      return page < totalPages ? { page: page + 1 } : undefined
    },
  })

  useEffectScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  })

  const allVideos = data?.pages.flatMap((page) => page.videos) || []

  return (
    <section className='pb-5'>
      {isLoading && !allVideos.length ? (
        <SkeletonLoader count={3} className='mb-8 h-32 rounded-md' />
      ) : (
        allVideos.map((video) => <StudioVideoItem key={video.id} video={video} />)
      )}

      {isFetchingNextPage && <SkeletonLoader count={3} className='mb-8 h-32 rounded-md' />}
    </section>
  )
}
