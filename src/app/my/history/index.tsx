'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { History } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Button } from '@/components/ui/Button'
import { HorizontalVideoItem } from '@/components/ui/HorizontalVideoItem'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { historyService } from '@/services/history'

export const DynamicHistoryPage = dynamic(async () => HistoryPage, {
  ssr: false,
  loading: () => (
    <div className='mt-20 w-1/2'>
      <SkeletonLoader count={3} className='mb-6 h-28 rounded-md' />
    </div>
  ),
})

export function HistoryPage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['watchHistory'],
    queryFn: () => historyService.getUserHistory(),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['clear history'],
    mutationFn: () => historyService.clearHistory(),
    onSuccess() {
      refetch()
    },
  })

  return (
    <section className='w-3/5'>
      <div className='mb-10 flex items-center justify-between'>
        <Heading isPageHeading icon={History} className='mb-0' text='History' />

        <Button variant='simple' isLoading={isPending} onClick={() => mutate()}>
          Clear history
        </Button>
      </div>
      <div>
        {isLoading ? (
          <SkeletonLoader count={3} className='mb-6 h-28 rounded-md' />
        ) : data?.length ? (
          data?.map((history) => (
            <HorizontalVideoItem key={history.video.id} video={history.video} />
          ))
        ) : (
          <p>Watch history not found!</p>
        )}
      </div>
    </section>
  )
}
