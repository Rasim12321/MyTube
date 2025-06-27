import { type HTMLCustomVideoElement } from '../../../app/(public)/v/[publicId]/types'

export const getVideoInfo = (video: HTMLCustomVideoElement) => {
  const currentTime = video?.currentTime || 0
  const originalTime = video?.duration || 1
  const duration = video?.duration

  const isValidDuration = Number.isFinite(duration) && duration > 0

  const progress = isValidDuration ? (currentTime / duration) * 100 : 0

  return {
    currentTime,
    originalTime,
    progress,
  }
}

export const getTime = (time: number) => {
  return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
}
