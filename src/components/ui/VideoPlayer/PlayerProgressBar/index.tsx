'use client'

import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import type { ReactElement } from 'react'

import { getTime } from '@/components/ui/VideoPlayer/video-player.util'

import 'rc-slider/assets/index.css'

interface IHandleProps {
  value: number
  dragging: boolean
  index: number
}

const handleRender = (node: ReactElement, props: IHandleProps) => {
  const { value, dragging, index } = props
  return (
    <Tooltip
      prefixCls='rc-slider-tooltip'
      overlay={getTime(value)}
      visible={dragging}
      placement='top'
      key={index}
      overlayClassName='tooltip-simple-text'
    >
      {node}
    </Tooltip>
  )
}

interface Props {
  currentTime: number
  duration: number
  onSeek: (time: number) => void
}

export function PlayerProgressBar({ currentTime, duration, onSeek }: Props) {
  return (
    <div className='w-full'>
      <Slider
        min={0}
        max={duration}
        value={currentTime}
        onChange={(value) => {
          if (typeof value === 'number') {
            onSeek(value)
          }
        }}
        handleRender={handleRender}
        styles={{
          track: {
            backgroundColor: 'var(--color-primary)',
            height: 5,
            transition: 'all .1s easy-in-out',
          },
          rail: { backgroundColor: 'rgb(196 196 196 / 60%)', height: 5 },
          handle: {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            // backgroundColor: 'var(--color-primary)',
            // borderColor: 'var(--color-primary)',
            marginTop: '-3px',
            height: 12,
            width: 12,
            outline: 'none',
            boxShadow: 'none',
            transition: 'all .1s easy-in-out',
          },
        }}
      />
    </div>
  )
}
