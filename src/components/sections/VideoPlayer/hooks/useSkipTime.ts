import { type RefObject } from 'react'

import type { TSkipTime } from '@/components/sections/VideoPlayer/hooks/useOnSeek'

import type { HTMLCustomVideoElement } from '../../../../app/(public)/v/[publicId]/types'

const SKIP_TIME_SECONDS = 10

export function useSkipTime(
  playerRef: RefObject<HTMLCustomVideoElement | null>,
  bgRef: RefObject<HTMLCustomVideoElement | null>
) {
  const skipTime = (type?: TSkipTime) => {
    if (!playerRef.current?.currentTime) return

    if (type === 'forward') {
      playerRef.current.currentTime += SKIP_TIME_SECONDS
      if (bgRef?.current) {
        bgRef.current.currentTime += SKIP_TIME_SECONDS
      }
    } else {
      playerRef.current.currentTime -= SKIP_TIME_SECONDS
      if (bgRef?.current) {
        bgRef.current.currentTime -= SKIP_TIME_SECONDS
      }
    }
  }

  return {
    skipTime,
  }
}
