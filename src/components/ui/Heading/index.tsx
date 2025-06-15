import cn from 'clsx'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  text: ReactNode | string
  icon?: LucideIcon
  isH1?: boolean
  isPageHeading?: boolean
  className?: string
}

export function Heading({
  text,
  icon: Icon,
  isPageHeading = false,
  isH1 = false,
  className,
}: Props) {
  return (
    <div
      className={twMerge(
        'flex items-center opacity-90',
        isPageHeading ? 'gap-2.5 mb-6' : 'gap-1.5 mb-4',
        className
      )}
    >
      {Icon && <Icon className='text-primary' />}
      {isH1 || isPageHeading ? (
        <h1 className={cn('font-semibold', isPageHeading ? 'text-[2rem]' : 'text-lg')}>{text}</h1>
      ) : (
        <h2 className='font-semibold text-lg'>{text}</h2>
      )}
    </div>
  )
}
