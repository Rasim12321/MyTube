'use client'

import cn from 'clsx'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'

import { useOutside } from '@/hooks/useOutside'

import { EnumVideoPlayerQuality } from '../../../app/(public)/v/[publicId]/types'
import { VIDEO_QUALITIES } from './data'

interface Props {
  currentValue: EnumVideoPlayerQuality
  onChange: (quality: EnumVideoPlayerQuality) => void
  maxResolution: EnumVideoPlayerQuality
}

export function SelectQuality({ currentValue, onChange, maxResolution }: Props) {
  const { isShow, ref, setIsShow } = useOutside(false)

  const availableQualities = VIDEO_QUALITIES.slice(VIDEO_QUALITIES.indexOf(maxResolution))

  return (
    <div className='relative' ref={ref}>
      <button
        aria-label='Quality'
        onClick={() => setIsShow(!isShow)}
        className='hover:text-primary transition-colors'
      >
        {currentValue}
      </button>

      <AnimatePresence>
        {isShow && (
          <m.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className='absolute -right-4 bottom-[125%] z-10 rounded bg-gray-800/80 px-4 py-2 shadow'
          >
            {availableQualities.map((quality) => (
              <li key={quality} className='mb-1'>
                <button
                  onClick={() => {
                    onChange(quality)
                    setIsShow(false)
                  }}
                  className={cn('border-b border-b-transparent transition-colors', {
                    'hover:text-primary': quality !== currentValue,
                    'border-b-white': quality === currentValue,
                  })}
                  disabled={quality === currentValue}
                >
                  {quality}
                </button>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
