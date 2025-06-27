'use client'

import { Lightbulb, LightbulbOff, Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react'

import { PlayerProgressBar } from '@/components/sections/VideoPlayer/ProgressBar'
import { VolumeControl } from '@/components/sections/VideoPlayer/VolumeControl'
import { useVideoPlayer } from '@/components/sections/VideoPlayer/hooks/useVideoPlayer'
import { getTime } from '@/components/sections/VideoPlayer/utils'

import { EnumVideoPlayerQuality } from '../../../app/(public)/v/[publicId]/types'
import { SelectQuality } from './SelectQuality'

interface Props {
  fileName: string
  toggleTheaterMode: () => void
  maxResolution: EnumVideoPlayerQuality
}
export function VideoPlayer({ fileName, toggleTheaterMode, maxResolution }: Props) {
  const { fn, playerRef, bgRef, state } = useVideoPlayer({
    fileName,
    toggleTheaterMode,
    maxResolution,
  })

  return (
    <div className='relative mb-5 rounded-2xl'>
      {state.isLightingMode && (
        <video
          ref={bgRef}
          className='absolute top-0 left-0 h-full w-full scale-[1] object-cover mix-blend-lighten blur-3xl brightness-90 contrast-125 saturate-150 filter'
          src={`/uploads/videos/${EnumVideoPlayerQuality['720p']}/${fileName}`}
          muted
        />
      )}

      <video
        ref={playerRef}
        className='relative z-[1] aspect-video w-full rounded-xl'
        controls={false}
        src={`/uploads/videos/${EnumVideoPlayerQuality[maxResolution === '720p' ? '720p' : '1080p'] || EnumVideoPlayerQuality['720p']}/${fileName}`}
        preload='metadata'
      />

      <div className='absolute right-5 bottom-5 left-5 z-[1] grid grid-cols-[7fr_1fr] gap-7'>
        <div className='flex items-center gap-6'>
          <button
            aria-label={state.isPlaying ? 'Pause' : 'Play'}
            onClick={fn.togglePlayPause}
            className='hover:text-primary transition-colors'
          >
            {state.isPlaying ? <Pause /> : <Play />}
          </button>
          <PlayerProgressBar
            currentTime={state.currentTime}
            duration={state.videoTime}
            onSeek={fn.onSeek}
            progress={state.progress}
          />

          <div>
            <span>{getTime(state.videoTime)}</span>
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <VolumeControl
            changeVolume={fn.changeVolume}
            toggleMute={fn.toggleMute}
            value={state.volume}
            isMuted={state.isMuted}
          />
          <SelectQuality
            currentValue={state.quality}
            onChange={fn.changeQuality}
            maxResolution={maxResolution}
          />

          <button
            aria-label='Light bulb'
            className='hover:text-primary transition-colors'
            onClick={fn.toggleLightingMode}
            title={state.isLightingMode ? 'Off lightning' : 'On lightning'}
          >
            {state.isLightingMode ? <Lightbulb /> : <LightbulbOff />}
          </button>

          <button
            aria-label='Theater mode'
            className='hover:text-primary transition-colors'
            onClick={toggleTheaterMode}
          >
            <RectangleHorizontal />
          </button>
          <button
            aria-label='Full screen'
            onClick={fn.toggleFullScreen}
            className='hover:text-primary transition-colors'
          >
            <Maximize />
          </button>
        </div>
      </div>
    </div>
  )
}
