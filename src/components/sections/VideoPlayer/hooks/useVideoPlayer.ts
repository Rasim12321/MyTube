import { useEffect, useRef, useState } from 'react'

import { useOnSeek } from '@/components/sections/VideoPlayer/hooks/useOnSeek'
import { useVideoHotkeys } from '@/components/sections/VideoPlayer/hooks/useVideoHotkeys'

import {
  EnumVideoPlayerQuality,
  type HTMLCustomVideoElement,
} from '../../../../app/(public)/v/[publicId]/types'
import { useFullScreen } from './useFullScreen'
import { usePlayPause } from './usePlayPause'
import { useSkipTime } from './useSkipTime'
import { useVideoProgress } from './useVideoProgress'
import { useVideoQuality } from './useVideoQuality'
import { useVideoVolume } from './useVideoVolume'

interface Props {
  fileName: string
  toggleTheaterMode: () => void
  maxResolution: EnumVideoPlayerQuality
}

export function useVideoPlayer({ fileName, toggleTheaterMode, maxResolution }: Props) {
  const playerRef = useRef<HTMLCustomVideoElement>(null)
  const bgRef = useRef<HTMLCustomVideoElement>(null)

  const [isLightingMode, setIsLightingMode] = useState(true)

  const { isPlaying, togglePlayPause, setIsPlaying } = usePlayPause(playerRef, bgRef)
  const { currentTime, progress, videoTime, setCurrentTime } = useVideoProgress(playerRef)
  const { quality, changeQuality } = useVideoQuality(playerRef, {
    fileName,
    currentTime,
    maxResolution,
    setIsPlaying,
  })
  const { toggleFullScreen } = useFullScreen(playerRef)
  const { skipTime } = useSkipTime(bgRef, playerRef)

  const { changeVolume, isMuted, toggleMute, volume } = useVideoVolume(playerRef)
  const { onSeek } = useOnSeek(playerRef, bgRef, setCurrentTime)

  useEffect(() => {
    if (isLightingMode && playerRef.current && bgRef.current) {
      bgRef.current.currentTime = playerRef.current.currentTime
    }
  }, [isLightingMode])

  const fn = {
    togglePlayPause,
    changeQuality,
    toggleFullScreen,
    skipTime,
    changeVolume,
    toggleMute,
    onSeek,
    toggleLightingMode: () => setIsLightingMode(!isLightingMode),
  }

  useVideoHotkeys({ volume, toggleTheaterMode, ...fn })

  return {
    state: {
      isPlaying,
      progress,
      currentTime,
      videoTime,
      quality,
      isMuted,
      volume,
      isLightingMode,
    },
    fn,
    playerRef,
    bgRef,
  }
}
