'use client'

import { Lightbulb, LightbulbOff, Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react'

import { VolumeControl } from '@/components/ui/VideoPlayer/VolumeControl'
import { useVideoPlayer } from '@/components/ui/VideoPlayer/use-video-player/useVideoPlayer'
import { getTime } from '@/components/ui/VideoPlayer/video-player.util'

import { PlayerProgressBar } from './PlayerProgressBar'
import { SelectQuality } from './Quality'
import { EnumVideoPlayerQuality } from './video-player.types'

interface Props {
  fileName: string
  toggleTheaterMode: () => void
  maxResolution: EnumVideoPlayerQuality
}
export function VideoPlayer({ fileName, toggleTheaterMode, maxResolution }: Props) {
  const { fn, playerRef, bgRef, state } = useVideoPlayer({ fileName, toggleTheaterMode })

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
        src={`/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`}
        preload='metadata'
      />

      <div className='absolute right-5 bottom-5 left-5 z-[1] grid grid-cols-[7fr_1fr] gap-7'>
        <div className='flex items-center gap-6'>
          <button onClick={fn.togglePlayPause} className='hover:text-primary transition-colors'>
            {state.isPlaying ? <Pause /> : <Play />}
          </button>
          <PlayerProgressBar
            currentTime={state.currentTime}
            duration={state.videoTime}
            onSeek={fn.onSeek}
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
            className='hover:text-primary transition-colors'
            onClick={fn.toggleLightingMode}
            title={state.isLightingMode ? 'Off lightning' : 'On lightning'}
          >
            {state.isLightingMode ? <Lightbulb /> : <LightbulbOff />}
          </button>

          <button className='hover:text-primary transition-colors' onClick={toggleTheaterMode}>
            <RectangleHorizontal />
          </button>
          <button onClick={fn.toggleFullScreen} className='hover:text-primary transition-colors'>
            <Maximize />
          </button>
        </div>
      </div>
    </div>
  )
}
