import { type RefObject } from 'react'

import type { TSkipTime } from '@/components/ui/VideoPlayer/use-video-player/useOnSeek'

import type { HTMLCustomVideoElement } from '../video-player.types'

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
