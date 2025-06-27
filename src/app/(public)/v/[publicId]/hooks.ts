import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { historyService } from '@/services/history'
import { videoService } from '@/services/video'

import type { ISingleVideoResponse } from '@/types/video'

export function useUpdateViews({ video }: { video: ISingleVideoResponse }) {
  const { mutate: updateViews } = useMutation({
    mutationKey: ['update-video-views'],
    mutationFn: () => videoService.updateViews(video.publicId),
  })

  const { mutate: updateWatchHistory } = useMutation({
    mutationKey: ['update-watch-history'],
    mutationFn: () => historyService.addToHistory(video.id),
  })

  useEffect(() => {
    updateViews()
    updateWatchHistory()
  }, [updateViews, updateWatchHistory])
}
