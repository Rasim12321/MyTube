import type { CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  count?: number
  style?: CSSProperties
  className?: string
}

export function SkeletonLoader({ count = 1, className = '', style }: Props) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={twMerge('mb-2.5 h-10 animate-pulse rounded-sm bg-slate-800', className)}
          style={style}
        />
      ))}
    </>
  )
}
