import { type Dispatch, type RefObject, type SetStateAction, useState } from 'react'

import {
  EnumVideoPlayerQuality,
  type HTMLCustomVideoElement,
} from '../../../../app/(public)/v/[publicId]/types'

interface Props {
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  fileName: string
  currentTime: number
  maxResolution: EnumVideoPlayerQuality
}

export function useVideoQuality(
  playerRef: RefObject<HTMLCustomVideoElement | null>,
  { currentTime, maxResolution, fileName, setIsPlaying }: Props
) {
  const [quality, setQuality] = useState(
    maxResolution === '720p' ? EnumVideoPlayerQuality['720p'] : EnumVideoPlayerQuality['1080p']
  )

  const changeQuality = (quality: EnumVideoPlayerQuality) => {
    if (!playerRef.current) return
    setQuality(quality)

    playerRef.current.src = `/uploads/videos/${quality}/${fileName}`
    playerRef.current.currentTime = currentTime
    playerRef.current.play()
    setIsPlaying(true)
  }

  return {
    quality,
    changeQuality,
  }
}
