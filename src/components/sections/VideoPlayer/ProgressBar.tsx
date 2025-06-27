'use client'

import cn from 'clsx'
import { type ChangeEvent, useState } from 'react'

import { getTime } from '@/components/sections/VideoPlayer/utils'

import { COLORS } from '@/constants/colors'

import 'rc-slider/assets/index.css'

interface Props {
  currentTime: number
  duration: number
  progress: number
  onSeek: (time: number) => void
}

export function PlayerProgressBar({ currentTime, progress, duration, onSeek }: Props) {
  const [isDragging, setIsDragging] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    onSeek(value)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div
      className='relative flex w-full items-center rounded-lg'
      style={{
        backgroundColor: 'rgb(196 196 196 / 60%)',
      }}
    >
      <div
        className='absolute top-0 left-0 h-1.5 rounded-lg'
        style={{
          width: `${progress}%`,
          backgroundColor: COLORS.primary,
        }}
      />

      <div
        className={cn(
          'absolute -top-7 left-0 text-base text-white transition-opacity duration-700',
          isDragging ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          left: `calc(${progress}% - 20px)`,
        }}
      >
        {getTime(currentTime)}
      </div>

      <input
        type='range'
        min={0}
        max={duration || 1}
        value={currentTime}
        onChange={handleChange}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        className='pointer-events-auto h-1.5 w-full cursor-pointer appearance-none opacity-0'
      />
    </div>
  )
}
